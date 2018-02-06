import {StackNavigator} from "react-navigation";
import Status from "./components/status";
import RecipeSelection from "./components/recipe"
import React from "react";

// List all separate screens used within the app so they can be navigated to
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