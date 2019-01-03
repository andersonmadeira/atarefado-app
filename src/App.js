import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import TaskList from './TaskList';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#F8F8F8"
          barStyle="dark-content"
        />
        <TaskList></TaskList>
      </View>
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
