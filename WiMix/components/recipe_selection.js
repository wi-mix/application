import {Component} from "react";
import {connect} from "react-redux";
import React from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Recipe_Card} from "./recipe_card";
import FAB from 'react-native-fab';
import {clearRecipe, getRecipes, selectRecipe} from "../actions";

/*
    Author: Harley Vanselow
    Project: Wi-Mix
    Course: CMPUT 492
 */
export class RecipeSelection extends Component<{}> {
    componentWillMount(){
        if (!this.props.recipes) {
            this.props.loadRecipes(this.props.available.map(ingredient => ingredient.zobristKey));
        }
    }

    // Placeholder recipes page
    render() {
        const {navigate} = this.props.navigation;
        // If data is still being retrieved from the base station, indicate loading
        if (this.props.isCanisterStatusLoading) {
            return (
                <Text>Loading...</Text>
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.server_recipe_list}>
                    {/*
                    Render list of recipes that can be made
                     */}
                    <FlatList
                        data={this.props.recipes.filter(recipe=>recipe.ingredients.every(ingredient=>{
                            return ingredient.amount <= this.props.available.find(available=>available.key === ingredient.key).amount;
                        }))}
                        renderItem={({item}) =>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.selectRecipe({item});
                                    navigate('Recipe');
                                }}><Recipe_Card data={item}/>
                            </TouchableOpacity>
                        }
                    />
                </View>
                {/*
                Custom recipe creation button
                 */}
                <FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={() => {
                    this.props.clearRecipeSelection();
                    navigate('Recipe')
                }} visible={true}/>
            </View>
        )
    }
}

// Link component prop to make them able to dispatch action creators
const mapDispatchToProps = (dispatch) => {
    return {
        clearRecipeSelection: () => dispatch(clearRecipe()),
        loadRecipes: (keys) => dispatch(getRecipes(keys)),
        selectRecipe: (recipe) => dispatch(selectRecipe(recipe))
    };
};

// Link component props to Redux state variables
const mapStateToProps = (state) => {
    return {
        recipes: state.recipeReducer.recipes,
        isCanisterStatusLoading: state.recipeReducer.recipeLoading,
        canisterIsLoading: state.canisterStatusReducer.canisterLoading,
        available: state.canisterStatusReducer.status
    };
};
// Invoke links between component and Redux store
export default connect(mapStateToProps, mapDispatchToProps)(RecipeSelection);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'grey',
    },
    custom_recipe: {
        backgroundColor: 'white',
        flex: 2,
        marginTop: 20

    },
    server_recipe_list: {
        flex: 3,
    }
});