import {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import Canister from "./canister";
import {updateCanisters} from "../actions";
import {connect} from "react-redux";
import {WiMixButtonText, WiMixText} from "./wimix_text";
/*
    Author: Harley Vanselow
    Project: Wi-Mix
    Course: CMPUT 492
 */
// This is dependent on the hardware this app is intended to interface with
const num_canisters = 3;

export class Status extends Component<{}> {
    // Title of this screen
    static navigationOptions = {
        title: "Canister Status"
    };

    constructor(props) {
        super(props);
        this.props.loadStatus();
    }

    render() {
        const {navigate} = this.props.navigation;
        // Render a canister view for each canister
        const canisters = (() => {
            var render = [];
            for (i = 0; i < num_canisters; i++) {
                render.push(<Canister index={i} key={i}/>)
            }
            return render;
        })();
        // Render the canisters and a button to navigate to recipe selection
        return (<View style={styles.container}>
            <View style={styles.canisters_view}>
                {canisters}
            </View>
            <TouchableOpacity
                style={styles.select_recipe_button}
                onPress={() => navigate('RecipeSelection')}>
                <WiMixButtonText>
                    Choose A Recipe!
                </WiMixButtonText>
            </TouchableOpacity>
        </View>)
    }
}


// Link component prop to make them able to dispatch action creators
const mapDispatchToProps = (dispatch) => {
    return {
        loadStatus: () => dispatch(updateCanisters())
    };
};

// Link component props to Redux state variables
const mapStateToProps = (state) => {
    return {
        isLoading: state.canisterStatusReducer.canisterLoading
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
    canisters_view:{
        flex:7
    },
    select_recipe_button: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'white',
        marginBottom: 5,
    },

});

