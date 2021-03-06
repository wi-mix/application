import {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {responsiveFontSize} from "react-native-responsive-dimensions";
import {AppText} from "./wimix_text";
/*
    Author: Harley Vanselow
    Project: Wi-Mix
    Course: CMPUT 492
 */
export class Recipe_Card extends Component<{}> {

    render() {
        return <View style={styles.recipe_card}>
            <View style = {styles.recipe_info_view}>
                <AppText style = {styles.recipe_info}>
                    {this.props.data.name}
                </AppText>
            </View>

        </View>
    }
}

const styles = StyleSheet.create({
    recipe_info_view:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    },
    recipe_card: {
        backgroundColor: 'white',
        marginTop: 5,
        flex: 1,
        height:110,
        flexDirection:'row',

    },
    recipe_info:{
        fontSize:responsiveFontSize(5),
        margin:5,
        flex:1,
    },

});