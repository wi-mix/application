import {Component} from "react";
import {updateCanisters} from "../actions";
import {connect} from "react-redux";
import React from "react";
import {Text, View} from "react-native";

export class RecipeSelection extends Component<{}> {
    static navigationOptions ={
        title:"Canister Status"
    };
    render(){
        return(
            <View>
                <Text>RECIPES!</Text>
            </View>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadStatus: () => dispatch(updateCanisters())
    };
};
const mapStateToProps = (state) =>{
    return {
        isLoading:state.canisterStatusReducer.loading
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(RecipeSelection);
