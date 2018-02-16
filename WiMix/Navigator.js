import {StackNavigator} from "react-navigation";
import Status from "./components/status";
import RecipeSelection from "./components/recipe_selection"
import React from "react";
import Recipe from "./components/recipe";

// List all separate screens used within the app so they can be navigated to
export const AppNavigator = StackNavigator({
    Status: { screen: Status},
    RecipeSelection:{ screen: RecipeSelection},
    Recipe:{screen: Recipe}
});

export class Navigator extends React.Component{
    render(){
        return(
            <AppNavigator/>
        )
    }
}