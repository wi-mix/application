import {Component} from "react";
import React from "react";
import {StyleSheet, Text, View} from "react-native";

export class Ingredient extends Component<{}> {
    render(){
        return <Text style={{fontSize:20}}>{this.props.name}: {this.props.amount}mL</Text>
    }
}

