import {Component} from "react";
import {makeRecipe, saveRecipe, setCustomRecipeDescription, setCustomRecipeName} from "../actions";
import {connect} from "react-redux";
import React from "react";
import {View, StyleSheet, TouchableOpacity, Text, TextInput} from "react-native";
import Ingredient from "./ingredient";
import {responsiveFontSize} from "react-native-responsive-dimensions";
import {AppText, WiMixButtonText} from "./wimix_text";
/*
    Author: Harley Vanselow
    Project: Wi-Mix
    Course: CMPUT 492
 */
export class Recipe extends Component<{}> {
    constructor(props){
        super(props);
        this.state = {editable:Object.keys(this.props.recipe).length === 0};
    }
    render() {
        console.log("rendering recipe");
        let ingredient_list = (() => {
            let render = [];
            if (!this.state.editable) {
                let sorted_ingredients = this.props.recipe.ingredients.sort((i1, i2)=>{return i1.order - i2.order});
                sorted_ingredients.forEach((ingredient) => {
                    let available_ingredient = this.props.available.filter(available_ingredient=>ingredient.key === available_ingredient.key)[0];
                    render.push(<Ingredient
                        ingredient = {ingredient}
                        key = {ingredient.key}
                        total_amount={available_ingredient.amount}
                        editable={false}/>)
                });
            } else {
                this.props.available.forEach((ingredient)=>{
                    render.push(<Ingredient ingredient = {ingredient} total_amount={ingredient.amount} key={ingredient.key} editable={true}/>)
                });
            }
            return render;
        })();
        let recipe_name = this.state.editable?"Name it!":this.props.recipe.name;
        let recipe_description = this.state.editable?"Describe it!":this.props.recipe.description;
        let textColor = this.state.editable?'grey':'black';

        return <View style={styles.container}>
            <View style={styles.recipe_info_view}>
                <TextInput style={styles.recipe_name} editable={this.state.editable} placeholder={recipe_name} placeholderTextColor={textColor} onChangeText={(text)=>this.props.updateName(text)}/>
                <TextInput style={styles.recipe_description} editable={this.state.editable} multiline={true} placeholder={recipe_description} placeholderTextColor={textColor} onChangeText={(text)=>this.props.updateDescription(text)}/>
            </View>
            <View style={styles.recipe_contents}>
                {ingredient_list}
            </View>
            <TouchableOpacity
                style={styles.make_recipe_button}
                onPress={() => {
                    if(this.state.editable){
                        this.props.saveNewRecipe(this.props.recipe);
                    }
                    this.props.makeRecipe(this.props.recipe);
                    this.props.navigation.popToTop();
                }}>
                <WiMixButtonText>Make it!</WiMixButtonText>
            </TouchableOpacity></View>

    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        updateName: (name) => dispatch(setCustomRecipeName(name)),
        updateDescription: (desc) => dispatch(setCustomRecipeDescription(desc)),
        makeRecipe: (recipe) => dispatch(makeRecipe(recipe)),
        saveNewRecipe: (recipe)=> dispatch(saveRecipe(recipe))
    };
};

const mapStateToProps = (state) => {
    return {
        recipe: state.recipeReducer.selected,
        available: state.canisterStatusReducer.status
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Recipe);

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
        fontFamily:'ProductSansBold',
        color:'black',
        flex:1

    },
    recipe_description: {
        flex:1,
        fontFamily:'ProductSansRegular'
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
