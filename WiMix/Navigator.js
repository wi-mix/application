import {StackNavigator} from "react-navigation";
import Status from "./components/status";
import RecipeSelection from "./components/recipe_selection"
import React from "react";
import Recipe from "./components/recipe";
import {StyleSheet} from "react-native";
import {responsiveFontSize} from "react-native-responsive-dimensions";

// List all separate screens used within the app so they can be navigated to
export const AppNavigator = StackNavigator({
    Status: {
        screen: Status,
        navigationOptions: ({navigation}) => ({
            headerTitleStyle: styles.headerTitleStyle,
            title:'Canister Status'
        }),
    },
    RecipeSelection: {
        screen: RecipeSelection,
        navigationOptions: ({navigation}) => ({
            headerTitleStyle: styles.headerTitleStyle,
            title:'Recipe Selection'
        }),
    },
    Recipe: {
        screen: Recipe,
        navigationOptions: ({navigation}) => ({
            headerTitleStyle: styles.headerTitleStyle,
            title:'Recipe Details'
        }),
    },
}, {
    headerMode: 'screen'
});
const styles = StyleSheet.create({
    headerTitleStyle: {
        fontFamily: 'ProductSansBold',
        color: 'green',
        fontWeight: '200',
        fontSize: responsiveFontSize(3)
    },
});


export class Navigator extends React.Component {
    render() {
        return (
            <AppNavigator/>
        )
    }
}