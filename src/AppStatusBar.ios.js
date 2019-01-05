import React, { Component } from 'react';
import { StatusBar } from 'react-native';

export default class AppStatusBar extends Component {
    render() {
        return (
            <StatusBar
                backgroundColor="#F8F8F8"
                barStyle="dark-content"
                translucent={false}
            />
        );
    }
}