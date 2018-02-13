/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {Navigator} from "./Navigator";

const store = configureStore();


// Render the top level application, injecting the Redux store for use by all components
export default class App extends Component<{}> {
    render() {
        console.ignoredYellowBox = ['Remote debugger'];
        return (
            <Provider store = {store}>
                <Navigator/>
            </Provider>
        );
    }
}


