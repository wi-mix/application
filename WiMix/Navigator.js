import {StackNavigator} from "react-navigation";
import Status from "./components/status";
import RecipeSelection from "./components/recipe"
import React from "react";

export const AppNavigator = StackNavigator({
    Status: { screen: Status},
    Recipes:{ screen: RecipeSelection}
});

export class Navigator extends React.Component{
    render(){
        return(
            <AppNavigator/>
        )
    }
}