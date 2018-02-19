import {Component} from "react";
import {makeRecipe} from "../actions";
import {connect} from "react-redux";
import React from "react";
import {View, StyleSheet, TouchableOpacity, Text, TextInput} from "react-native";
import {Ingredient} from "./ingredient";
import {responsiveFontSize} from "react-native-responsive-dimensions";
/*
    Author: Harley Vanselow
    Project: Wi-Mix
    Course: CMPUT 492
 */
export class Recipe extends Component<{}> {
    render() {
        let editable = this.props.recipe == null;
        let ingredient_list = (() => {
            let render = [];
            if (!editable) {
                this.props.recipe.ingredients.forEach((ingredient) => {
                    let available_ingredient = this.props.available.filter(available_ingredient=>ingredient.key === available_ingredient.key)[0];
                    render.push(<Ingredient
                        key={ingredient.key}
                        name={ingredient.name}
                        amount_required={ingredient.amount}
                        total_amount={available_ingredient.amount}
                        editable={false}/>)
                });
            } else {
                this.props.available.forEach((ingredient)=>{
                    render.push(<Ingredient key = {ingredient.key} name = {ingredient.name} total_amount={ingredient.amount} editable={true}/>)
                });
            }
            return render;
        })();
        let recipe_name = editable?"Name it!":this.props.recipe.name;
        let recipe_description = editable?"Describe it!":this.props.recipe.description;
        let textColor = editable?'grey':'black';

        return <View style={styles.container}>
            <View style={styles.recipe_info_view}>
                <TextInput style={styles.recipe_name} editable={editable} placeholder={recipe_name} placeholderTextColor={textColor}/>
                <TextInput style={styles.recipe_description} editable={editable} multiline={true} placeholder={recipe_description} placeholderTextColor={textColor}/>
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
        available: state.canisterStatusReducer.status
    };
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'grey'
    },
    recipe_info_view: {
        flex: 2,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    recipe_name: {
        fontSize: responsiveFontSize(5),
        fontWeight: 'bold',
        color:'black',
        flex:1

    },
    recipe_description: {
        flex:1
    },
    recipe_contents: {
        flex: 5,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    make_recipe_button: {
        flex: 1,
        flexDirection:'row',
        backgroundColor: 'white',
        marginBottom: 5,
        alignItems:'center',
        justifyContent:'center'
    },
    make_recipe_button_text: {
        fontSize: responsiveFontSize(5),
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
