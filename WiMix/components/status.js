import {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import Canister from "./canister";
import {updateCanisters} from "../actions";
import {connect} from "react-redux";

const num_canisters = 3;

export class Status extends Component<{}> {
    static navigationOptions ={
        title:"Canister Status"
    };
    componentDidMount(){
        this.props.loadStatus();
    }
    render() {
        const {navigate} = this.props.navigation;
        const canisters = (() => {
            var render = [];
            for (i = 0; i < num_canisters; i++) {
                render.push(<Canister index={i} key={i}/>)
            }
            return render;
        })();
        return (<View style={styles.container}>
            {canisters}
            <TouchableOpacity
                style={styles.start_recipe_button}
                onPress={()=>navigate('Recipes')}>
                <Text style={styles.start_recipe_text}>
                    Choose A Recipe!
                </Text>
            </TouchableOpacity>
        </View>)
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        loadStatus: () => dispatch(updateCanisters())
    };
};
const mapStateToProps = (state) =>{
    return {
        isLoading:state.canisterStatusReducer.loading
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Status);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'grey'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    start_recipe_button: {
        height: 60,
        backgroundColor: 'white',
        marginBottom: 5,
    },
    start_recipe_text: {
        textAlign: 'center',
        fontSize: 40,
    }
});
