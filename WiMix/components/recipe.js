import {Component} from "react";
import {updateCanisters} from "../actions";
import {connect} from "react-redux";
import React from "react";
import {Text, View} from "react-native";

export class RecipeSelection extends Component<{}> {
    static navigationOptions ={
        title:"Canister Status"
    };
    // Placeholder recipes page
    render(){
        return(
            <View>
                <Text>RECIPES!</Text>
            </View>
        )
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
        isLoading:state.canisterStatusReducer.loading
    };
};
// Invoke links between component and Redux store
export default connect(mapStateToProps,mapDispatchToProps)(RecipeSelection);
