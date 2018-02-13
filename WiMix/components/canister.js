import {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {updateCanisters} from "../actions";
import {connect} from "react-redux";

export class Canister extends Component<{}> {
    render() {
        // If data is still being retrieved from the base station, indicate loading
        if (this.props.isLoading) {
            return(
                <Text>Loading...</Text>
            )
        }
        let specific_container = this.props.info[this.props.index];

        // Render canister data, including visualization of volume, fluid name, and volume present
        let volume_style = {backgroundColor: 'green', flex: specific_container.amount / 1000};
        return (
            <View style={styles.canister_status_view}>
                <View style={{flex: .3, flexDirection: 'column-reverse'}}>
                    <View style={volume_style}/>
                </View>
                <Text
                    style={styles.canister_status_text}>
                    {specific_container.name}{'\n'}
                    {specific_container.amount}mL
                    remaining</Text>
            </View>
        )
    }
}
// Link component props to Redux state variables
function mapStateToProps(state) {
    return {
        info: state.canisterStatusReducer.status,
        isLoading: state.canisterStatusReducer.canisterLoading
    }
}
// Link component prop to make them able to dispatch action creators
function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch(updateCanisters())
    };
}

const styles = StyleSheet.create({

    canister_status_text: {
        fontSize: 30,
        flex: .6,
        paddingLeft: 10,
    },
    canister_status_view: {
        backgroundColor: 'white',
        margin: 10,
        flex: 1,
        flexDirection: 'row'
    }
});
// Invoke links between component and Redux store
export default connect(mapStateToProps,mapDispatchToProps)(Canister);
