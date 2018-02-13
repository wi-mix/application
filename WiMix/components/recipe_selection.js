import {Component} from "react";
import {getRecipes, makeRecipe} from "../actions";
import {connect} from "react-redux";
import React from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Recipe} from "./recipe";

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
        // If data is still being retrieved from the base station, indicate loading
        if (this.props.isLoading) {
            return (
                <Text>Loading...</Text>
            )
        }
        console.log(this.props.canisterIsLoading);
        let navigation = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.server_recipe_list}>
                    <FlatList
                        data={this.props.recipes}
                        renderItem={({item}) => <Recipe data={item}/>
                        }
                    />
                </View>
                <View style={styles.custom_recipe}>
                    <Text style={{fontSize:40,alignItems:'center'}}>Make your own recipe! Coming soon</Text>
                </View>
                <TouchableOpacity
                    style={styles.start_recipe_button}
                    onPress={() => {
                        makeRecipe(this.props.recipes[0]);
                        navigation.goBack(navigation.state.key);
                    }}
                >
                    <Text style={styles.start_recipe_text}>
                        Start The Recipe!
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

// Link component prop to make them able to dispatch action creators
const mapDispatchToProps = (dispatch) => {
    return {
        loadRecipes: () => dispatch(getRecipes()),
        makeRecipe: (recipe) => dispatch(makeRecipe(recipe))
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
    },
    start_recipe_button: {
        height: 60,
        backgroundColor: 'green',
        marginBottom: 5,
    },
    start_recipe_text: {
        textAlign: 'center',
        fontSize: 40,
    }
});