import {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {Ingredient} from "./ingredient";

export class Recipe extends Component<{}> {
    render() {
        console.log(this.props.data);
        const ingredient_list = (() => {
            let render = [];
            this.props.data.ingredients.forEach((ingredient) => {
                render.push(<Ingredient key={ingredient.key} name={ingredient.name} amount={ingredient.amount}/>)
            });
            return render;
        })();
        return <View style={styles.recipe_card}>
            <View style = {styles.recipe_info_view}>
                <Text style = {styles.recipe_info}>
                    <Text style = {{fontWeight:'bold'}}>
                    {this.props.data.name}{'\n'}
                    </Text>
                {this.props.data.description}
                </Text>
            </View>
            <View style={styles.recipe_contents}>
                {ingredient_list}
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    recipe_info_view:{
        flex:3,
        flexDirection:'row'
    },
    recipe_card: {
        backgroundColor: 'white',
        margin: 10,
        flex: 1,
        height:110,
        flexDirection:'row'
    },
    recipe_info:{
        fontSize:20,
        margin:5,
        flex:1,
        flexWrap:'wrap'
    },
    recipe_contents:{
        flex:5,
        marginLeft:20,
        justifyContent:'center'
    }
});