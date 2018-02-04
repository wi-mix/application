import {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {updateCanisters} from "../actions";
import {connect} from "react-redux";

export class Canister extends Component<{}> {
    render() {
        console.log("Loading:" +this.props.loading);
        console.log("Info:" +this.props.info);
        if (this.props.loading) {
            return(
                <Text>Loading...</Text>
            )
        }
        let specific_container = this.props.info[this.props.index];


        let volume_style = {backgroundColor: 'green', flex: specific_container.amount / 1000};
        return (
            <View style={styles.canister_status_view}>
                <View style={{flex: .3, flexDirection: 'column-reverse'}}>
                    <View style={volume_style}/>
                </View>
                <Text
                    style={styles.canister_status_text}>{specific_container.name}: {specific_container.amount}mL
                    remaining</Text>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        info: state.canisterStatusReducer.status,
        loading: state.canisterStatusReducer.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch(updateCanisters())
    };
}

const styles = StyleSheet.create({

    canister_status_text: {
        fontSize: 50,
        flex: .6,
        paddingLeft: 10
    },
    canister_status_view: {
        backgroundColor: 'white',
        margin: 10,
        flex: 1,
        flexDirection: 'row'
    }
});
export default connect(mapStateToProps,mapDispatchToProps)(Canister);
