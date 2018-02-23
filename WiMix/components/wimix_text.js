import {Component} from "react";
import {StyleSheet, Text} from "react-native";
import React from "react";
import {responsiveFontSize} from "react-native-responsive-dimensions";

// Credit to https://gist.github.com/neilsarkar/c9b5fc7e67bbbe4c407eec17deb7311e
export class AppText extends Component {
    constructor(props) {
        super(props);
        // Put your default font styles here.
        this.style = [styles.default_text];
        if( props.style ) {
            if( Array.isArray(props.style) ) {
                this.style = this.style.concat(props.style)
            } else {
                this.style.push(props.style)
            }
        }
    }
    render() { return (
        <Text {...this.props} style={this.style}>
            {this.props.children}
        </Text>
    )}
}
export class WiMixButtonText extends Component {
    render() {
        return <Text style = {styles.button_text}>{this.props.children}</Text>
    }
}
const styles = StyleSheet.create({
   default_text:{
       fontFamily:'ProductSansRegular',
       color:'black'
   },
    button_text:{
        fontFamily:'ProductSansRegular',
        textAlign: 'center',
        fontSize: responsiveFontSize(5),
    }
});
