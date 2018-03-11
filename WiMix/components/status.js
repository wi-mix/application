import {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import Canister from "./canister";
import {loadIngredients, saveConfig, updateCanisters} from "../actions";
import {connect} from "react-redux";
import {AppText, WiMixButtonText, WiMixText} from "./wimix_text";
/*
    Author: Harley Vanselow
    Project: Wi-Mix
    Course: CMPUT 492
 */
// This is dependent on the hardware this app is intended to interface with
const num_canisters = 3;

export class Status extends Component<{}> {
    componentWillMount() {
        this.props.loadStatus();
        this.props.loadIngredients();
    }
    render() {
        const {navigate} = this.props.navigation;
        let ButtonText = this.props.canisterConfigComplete?"Choose A Recipe!":
            this.props.configSaving?"Saving...":"Save Config!";
        let ButtonAction = this.props.canisterConfigComplete?()=>{
            navigate('RecipeSelection')
        }:()=>{
             if(this.props.canisterStatus.every(status=>status.configured)){
                 this.props.saveConfig(this.props.canisterStatus);
             }
        };
        // Render a canister view for each canister
        const canisters = (() => {
            var render = [];
            for (i = 0; i < num_canisters; i++) {
                render.push(<Canister index={i} key={i}/>)
            }
            return (this.props.isCanisterStatusLoading || this.props.isIngredientsLoading)?<AppText>Loading...</AppText>:render;
        })();
        // Render the canisters and a button to navigate to recipe selection
        return (<View style={styles.container}>
            <View style={styles.canisters_view}>
                {canisters}
            </View>
            <TouchableOpacity
                style={styles.select_recipe_button}
                onPress={ButtonAction}>
                <WiMixButtonText>
                    {ButtonText}
                </WiMixButtonText>
            </TouchableOpacity>
        </View>)
    }
}


// Link component prop to make them able to dispatch action creators
const mapDispatchToProps = (dispatch) => {
    return {
        loadStatus: () => dispatch(updateCanisters()),
        loadIngredients:()=>dispatch(loadIngredients()),
        saveConfig:(status)=>dispatch(saveConfig(status))
    };
};

// Link component props to Redux state variables
const mapStateToProps = (state) => {
    return {
        isCanisterStatusLoading: state.canisterStatusReducer.canisterLoading,
        isIngredientsLoading: state.ingredientReducer.ingredientsLoading,
        canisterStatus: state.canisterStatusReducer.status,
        canisterConfigComplete:state.canisterStatusReducer.configComplete,
        ingredients:state.ingredientReducer.ingredients,
        configSaving:state.canisterStatusReducer.configSaving
    };
};
// Invoke links between component and Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Status);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'grey'
    },
    canisters_view: {
        flex: 7
    },
    select_recipe_button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginBottom: 5,
    },

});

