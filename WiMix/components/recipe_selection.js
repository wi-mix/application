import {Component} from "react";
import {connect} from "react-redux";
import React from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Recipe_Card} from "./recipe_card";
import FAB from 'react-native-fab';
import {getRecipes, selectRecipe} from "../actions";

export class RecipeSelection extends Component<{}> {
    static navigationOptions = {
        title: "Recipe Selection"
    };

    constructor(props) {
        super(props);
        this.props.loadRecipes();
    }

    // Placeholder recipes page
    render() {
        const {navigate} = this.props.navigation;
        // If data is still being retrieved from the base station, indicate loading
        if (this.props.isLoading) {
            return (
                <Text>Loading...</Text>
            )
        }
        console.log(this.props.canisterIsLoading);
        return (
            <View style={styles.container}>
                <View style={styles.server_recipe_list}>
                    <FlatList
                        data={this.props.recipes}
                        renderItem={({item}) =>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.props.selectRecipe({item});
                                    navigate('Recipe');
                                }}><Recipe_Card data={item}/></TouchableOpacity>
                        }
                    />
                </View>
                <FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={() => {navigate('Recipe')}} visible={true} />
            </View>
        )
    }
}

// Link component prop to make them able to dispatch action creators
const mapDispatchToProps = (dispatch) => {
    return {
        loadRecipes: () => dispatch(getRecipes()),
        selectRecipe:(recipe) => dispatch(selectRecipe(recipe))
    };
};

// Link component props to Redux state variables
const mapStateToProps = (state) => {
    return {
        recipes: state.recipeReducer.recipes,
        isLoading: state.recipeReducer.recipeLoading,
        canisterIsLoading: state.canisterStatusReducer.canisterLoading
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
        flex:2,
        marginTop:20

    },
    server_recipe_list: {
        flex: 3,
    }
});