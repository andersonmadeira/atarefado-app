import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default class InputBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TextInput style={styles.mainInput}
        placeholder='Type to search or add a new task'>
      </TextInput>
    );
  }
}

const styles = StyleSheet.create({
  mainInput: {
    height: 40,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    backgroundColor: '#fff',
  }
});
