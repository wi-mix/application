import {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import React from "react";

export class Recipe_Card extends Component<{}> {

    render() {
        return <View style={styles.recipe_card}>
            <View style = {styles.recipe_info_view}>
                <Text style = {styles.recipe_info}>
                    <Text style = {{fontWeight:'bold'}}>
                    {this.props.data.name}{'\n'}
                    </Text>
                {this.props.data.description}
                </Text>
            </View>

        </View>
    }
}

const styles = StyleSheet.create({
    recipe_info_view:{
        flex:1,
        flexDirection:'row'
    },
    recipe_card: {
        backgroundColor: 'white',
        marginTop: 5,
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

});