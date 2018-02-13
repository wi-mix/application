import {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import Canister from "./canister";
import {updateCanisters} from "../actions";
import {connect} from "react-redux";
// This is dependent on the hardware this app is intended to interface with
const num_canisters = 3;

export class Status extends Component<{}> {
    // Title of this screen
    static navigationOptions ={
        title:"Canister Status"
    };
    constructor(props){
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
            {canisters}
            <TouchableOpacity
                style={styles.start_recipe_button}
                onPress={()=>navigate('Recipes')}>
                <Text style={styles.start_recipe_text}>
                    Choose A Recipe!
                </Text>
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
const mapStateToProps = (state) =>{
    return {
        isLoading:state.canisterStatusReducer.canisterLoading
    };
};
// Invoke links between component and Redux store
export default connect(mapStateToProps,mapDispatchToProps)(Status);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'grey'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    start_recipe_button: {
        height: 60,
        backgroundColor: 'white',
        marginBottom: 5,
    },
    start_recipe_text: {
        textAlign: 'center',
        fontSize: 40,
    }
});

