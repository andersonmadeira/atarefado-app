import React, { Component } from 'react';
import { TouchableHighlight, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from './CheckBox';
import TaskService from './TaskService';
import RemoveButton from './RemoveButton';
import * as Animatable from 'react-native-animatable';

export default class TaskListItem extends Component {
  constructor(props) {
    super(props);

    this._onCheckBoxPressed = this._onCheckBoxPressed.bind(this);
    this._onRemovePressed = this._onRemovePressed.bind(this);

    this.state = {
      task: this.props.task
    }
  }

  _onCheckBoxPressed() {
    let task = this.state.task;

    TaskService.update(task, () => {
      task.completed = !task.completed;
    });

    this.setState({
      task: task
    });
  }

  _onRemovePressed() {
    this.animateRemoval();
  }

  animateRemoval() {
    this.animatedView.fadeOut(250).then((endState) => {
      if (endState.finished)
        this.props.handleTaskDeletion(this.state.task);
    });
  }

  handleAnimatedViewRef = ref => this.animatedView = ref;

  render() {
    let task = this.state.task;
    let color = task.completed ? '#C5C8C9' : '#000';
    let textDecorationLine = task.completed ? 'line-through' : 'none';

    return (
      <Animatable.View ref={this.handleAnimatedViewRef} animation="fadeIn" style={styles.container}>
        <CheckBox task={task} color={color} onCheckBoxPressed={this._onCheckBoxPressed} style={styles.checkBox}></CheckBox>
        <Text style={[styles.text, { color: color, textDecorationLine: textDecorationLine }]}>{task.title}</Text>
        <View style={styles.rightButtons}>
          <RemoveButton onRemovePressed={this._onRemovePressed} />
        </View>
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: "#F8F8F8",
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  checkBox: {
  },
  text: {
    flex: 1,
    fontSize: 18,
    paddingRight: 5,
  },
  rightButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})