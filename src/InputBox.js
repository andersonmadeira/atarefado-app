import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import TaskService from './TaskService';
import Task from './Task';

export default class InputBox extends Component {
  constructor(props) {
    super(props);

    this._onSubmitText = this._onSubmitText.bind(this);
    this._onChangeText = this._onChangeText.bind(this);
  }

  _onSubmitText(event) {
    let label = event.nativeEvent.text;

    if (label.trim()) {
      if ( TaskService.save(new Task(label)) !== null ) {
        this._dismissInput();
      } else {
        this._onChangeText(label);
      }
    } else {
      this._dismissInput();
    }
  }

  _dismissInput() {
    this.textInput.clear();
    this._onChangeText('');
  }

  _onChangeText(text) {
    this.props.onTasksFiltered(TaskService.findByLabel(text));
  }

  render() {
    return (
      <TextInput
        ref={input => this.textInput = input}
        style={styles.mainInput}
        onSubmitEditing={this._onSubmitText}
        onChangeText={this._onChangeText}
        placeholder='Type to search or add a new task'
      />
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
