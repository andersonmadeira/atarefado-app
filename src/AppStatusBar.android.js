import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';

export default class AppStatusBar extends Component {
    render() {
        let statusBarProps = { };

        if ( Platform.Version >= 23 ) {
            statusBarProps.backgroundColor = "#F8F8F8";
        } else {
            statusBarProps.backgroundColor = '#999';
        }

        return (
            <StatusBar
                barStyle="dark-content"
                translucent={false}
                {...statusBarProps}
            />
        );
    }
}