import {Component} from "react";
import React from "react";
import {StyleSheet, View, PanResponder} from "react-native";
import {responsiveFontSize} from "react-native-responsive-dimensions";
import {AppText} from "./wimix_text";
import {connect} from "react-redux";
import {setCustomRecipeAmount} from "../actions";

/*
    Author: Harley Vanselow
    Project: Wi-Mix
    Course: CMPUT 492
 */
export class Ingredient extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {required: props.editable ? 0 : this.props.ingredient.amount}
    }

    componentWillMount() {
        // Controls how sensitive the touch controls on the customizable volume are
        const volume_control_sensitivity = 500;
        // Handle user touch input for adjusting custom recipe ingredient amounts
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => this.props.editable,
            onMoveShouldSetPanResponderCapture: () => this.props.editable,
            onPanResponderGrant: (evt) => {
                evt.persist();
                this.setState(prev => {
                    return {last_position: evt.nativeEvent.pageY};
                });
            },
            // Increase/decrease based on delta y from initial touch point
            onPanResponderMove: (evt, gestureState) => {
                let change = (this.state.last_position - gestureState.moveY) / volume_control_sensitivity * this.props.ingredient.amount;
                let new_required = this.state.required += change;
                if (new_required < 0) new_required = 0;
                if (new_required > this.props.ingredient.amount) new_required = this.props.ingredient.amount;
                this.props.updateAmount(new_required,this.props.ingredient);
                this.setState(prev => {
                    return {required: new_required, last_position: gestureState.moveY};
                });
            },
        })
    }
    // Render the visual representation of the ingredient container.
    // The red amount describes the amount of ingredient to be consumed out of the total amount available
    render() {
        let volume_style = {backgroundColor: 'red', flex: this.state.required / this.props.total_amount};
        return <View style={styles.canister_status_view}>
            <AppText
                style={styles.recipe_info_text}>
                {this.props.ingredient.name}{'\n'}
                {Math.round(this.state.required)}mL / {this.props.total_amount}mL remaining
                required</AppText>
            <View style={styles.volume_indicator_container}{...this._panResponder.panHandlers}>
                <View style={volume_style}/>
                <View position={'absolute'} style={styles.amount_required_view}><AppText
                    style={{color: 'white'}}>{Math.round(this.state.required)}mL</AppText></View>
            </View>
        </View>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAmount: (amount,ingredient) => dispatch(setCustomRecipeAmount(amount,ingredient))
    };
};

const mapStateToProps = (state) => {
    return {
        recipe: state.recipeReducer.selected
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Ingredient);

const styles = StyleSheet.create({
    amount_required_view: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        left: 0,
        right: 0
    },
    volume_indicator_container: {
        flex: .3,
        flexDirection: 'column-reverse',
        backgroundColor: 'black',
    },
    recipe_info_text: {
        fontSize: responsiveFontSize(2.5),
        flex: .6,
        paddingLeft: 10,
    },
    canister_status_view: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row'
    }
});
