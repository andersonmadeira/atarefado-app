import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import TaskService from './TaskService';
import Task from './Task';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class InputBox extends Component {
  constructor(props) {
    super(props);

    this._onSubmitText = this._onSubmitText.bind(this);
    this._onChangeText = this._onChangeText.bind(this);
    this._onClearPressed = this._onClearPressed.bind(this);

    this.state = { inputText: '' };
  }

  _onSubmitText(event) {
    let label = event.nativeEvent.text.trim();

    if (label) {
      if (TaskService.save(new Task(label)) !== null) {
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
    this.props.onTasksFiltered(TaskService.findAll());
    this.setState({ inputText: '' });
  }

  _onChangeText(text) {
    text = text.trim();
    if (text) {
      this.props.onTasksFiltered(TaskService.findByLabel(text));
      this.setState({ inputText: text });
    } else {
      this.props.onTasksFiltered(TaskService.findAll());
      this.setState({ inputText: '' });
    }
  }

  _onClearPressed() {
    this._dismissInput();
  }

  _renderClearActionIcon(id) {
    return <Icon.Button
      key={id}
      style={styles.rightIcon}
      name={'clear'}
      backgroundColor='rgba(0,0,0,0)'
      underlayColor='rgba(0,0,0,0)'
      color={'#C5C8C9'}
      size={20}
      activeOpacity={1}
      borderRadius={5}
      onPress={this._onClearPressed}
    />;
  }

  render() {
    let actionIcons = [];

    if (this.state.inputText !== '') {
      actionIcons.push(this._renderClearActionIcon(actionIcons.length + 1));
    }

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          ref={input => this.textInput = input}
          onSubmitEditing={this._onSubmitText}
          onChangeText={this._onChangeText}
          placeholder='Type to search or add a new task'
        />
        <View style={styles.rightActionIcons}>
          {actionIcons}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 18,
    height: 40,
    margin: 0,
    padding: 0,
    paddingTop: -5,
    paddingLeft: 10,
  },
  rightActionIcons: {
    flexDirection: 'row',
  },
  rightIcon: {
    marginRight: -10,
    paddingLeft: 5
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    backgroundColor: '#fff',
  }
});
