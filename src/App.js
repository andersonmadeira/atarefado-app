import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import TaskList from './TaskList';
import AppStatusBar from './AppStatusBar';
import { MenuProvider } from 'react-native-popup-menu';

export default class App extends Component {
  render() {
    return (
      <MenuProvider>
        <View style={styles.container}>
          <AppStatusBar></AppStatusBar>
          <TaskList></TaskList>
        </View>
      </MenuProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#F8F8F8',
  },
});
