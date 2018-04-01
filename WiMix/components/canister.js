import {Component} from "react";
import {Picker, StyleSheet, Text, View} from "react-native";
import React from "react";
import {connect} from "react-redux";
import {AppText} from "./wimix_text";
import {updateCanisterSuccess} from "../actions";

/*
    Author: Harley Vanselow
    Project: Wi-Mix
    Course: CMPUT 492
 */
export class Canister extends Component<{}> {
    constructor(props) {
        super(props);
        let specific_container = this.props.canisterStatus[this.props.index];
        this.state = {editable: specific_container.name == null, specific_container: specific_container}
    }
    componentWillMount(){
        if(!this.state.editable){
            this.props.setCanisterStatus(this.props.canisterStatus.map(status=> {
                return Object.assign({}, status, {
                    'zobristKey': this.props.ingredients.find(ingredient => ingredient.key === status.key).zobristKey
                });
            }));
        }
    }

    render() {
        // Render canister data, including visualization of volume, fluid name, and volume present
        let volume_style = {backgroundColor: 'green', flex: this.state.specific_container.amount / 1000};
        let ingredient_choices = this.props.ingredients
            .map(ingredient => {
                return <Picker.Item label={ingredient.name} value={ingredient.name} key={ingredient.key}/>
            });
        return (
            // Display volume remaining
            <View style={styles.canister_status_view}>
                <View style={{flex: .3, flexDirection: 'column-reverse'}}>
                    <View style={volume_style}/>
                </View>
                <View style={styles.recipe_info_text}>
                    {/*
                        Displays all possible ingredients for base station setup
                     */}
                    <Picker
                        selectedValue = {this.state.specific_container.name}
                        enabled={this.state.editable}
                        onValueChange={(ingredientName) => {
                            let ingredient = this.props.ingredients.filter(ingredient=>ingredient.name === ingredientName)[0];
                            let updated_ingredient = Object.assign({}, ingredient, {
                                amount: this.state.specific_container.amount,
                                configured: true
                            });
                            this.setState({
                              specific_container:updated_ingredient
                            });
                            let new_status = this.props.canisterStatus.slice();
                            new_status[this.props.index] = updated_ingredient;
                            this.props.setCanisterStatus(new_status);
                        }
                        }>
                        {ingredient_choices}

                    </Picker>
                    <AppText>
                        {'\n'}
                        {this.state.specific_container.amount}mL
                        remaining
                    </AppText>
                </View>
            </View>
        )
    }
}

// Link component props to Redux state variables
function mapStateToProps(state) {
    return {
        canisterStatus: state.canisterStatusReducer.status,
        isCanisterStatusLoading: state.canisterStatusReducer.canisterLoading,
        ingredients: state.ingredientReducer.ingredients,
        isIngredientsLoading: state.ingredientReducer.ingredientsLoading
    }
}

// Link component prop to make them able to dispatch action creators
function mapDispatchToProps(dispatch) {
    return {
        setCanisterStatus:(status)=>dispatch(updateCanisterSuccess(status))
    };
}

const styles = StyleSheet.create({
    recipe_info_text: {
        // fontSize: responsiveFontSize(5),
        flex: .6,
        paddingLeft: 10,
    },
    canister_status_view: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        height: 150,
        flexDirection: 'row'
    }
});
// Invoke links between component and Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Canister);
