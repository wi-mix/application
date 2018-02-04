/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import Status from "./components/status";
const store = configureStore();



export default class App extends Component<{}> {
    render() {
        return (
            <Provider store = {store}>
                <Status/>
            </Provider>
        );
    }
}


