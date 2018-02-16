import {Component} from "react";
import {makeRecipe} from "../actions";
import {connect} from "react-redux";
import React from "react";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {Ingredient} from "./ingredient";

export class Recipe extends Component<{}> {
    render() {
        if (this.props.recipe == null) {
            return <Text>Make a custom drink!</Text>
        }
        let ingredient_list = (() => {
            let render = [];
            this.props.recipe.ingredients.forEach((ingredient) => {
                render.push(<Ingredient key={ingredient.key} name={ingredient.name} amount={ingredient.amount}/>)
            });
            return render;
        })();
        return <View style={styles.container}>
            <View style={styles.recipe_info_view}>
                <Text style={styles.recipe_info}><Text style={{fontWeight:'bold'}}>{this.props.recipe.name}</Text>{'\n'}{this.props.recipe.description}</Text>
            </View>
            <View style={styles.recipe_contents}>
                {ingredient_list}
            </View>
            <TouchableOpacity
                style={styles.make_recipe_button}
                onPress={() => {
                    this.props.makeRecipe(this.props.recipe);
                    this.props.navigation.popToTop();
                }}>
                <Text style={styles.make_recipe_button_text}>Make it!</Text>
            </TouchableOpacity></View>

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        makeRecipe: (recipe) => dispatch(makeRecipe(recipe))
    };
};

const mapStateToProps = (state) => {
    return {
        recipe: state.recipeReducer.selected,
    };
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'grey'
    },
    recipe_info_view: {
        flex: 5,
        backgroundColor:'white',
        marginBottom:10
    },
    recipe_info: {
        fontSize:20
    },
    recipe_contents: {
        flex: 5,
        marginBottom:10,
        backgroundColor:'white'
    },
    make_recipe_button: {
        flex:1,
        backgroundColor: 'white',
        marginBottom: 5,
    },
    make_recipe_button_text: {
        textAlign: 'center',
        fontSize: 40,
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
