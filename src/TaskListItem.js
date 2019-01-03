import React, { Component } from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import CheckBox from './CheckBox';
import TaskService from './TaskService';

export default class TaskListItem extends Component {
  constructor(props) {
    super(props);
    this._onCheckBoxPressed = this._onCheckBoxPressed.bind(this);
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

  render() {
    let task = this.state.task;
    let color = task.completed ? '#C5C8C9' : '#000';
    let textDecorationLine = task.completed ? 'line-through' : 'none';

    return (
      <TouchableHighlight underlayColor={'#eee'} style={{ paddingTop: 6, paddingBottom: 6, backgroundColor: "#F8F8F8", borderBottomWidth: 1, borderColor: '#eee' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox task={task} color={color} onCheckBoxPressed={this._onCheckBoxPressed}></CheckBox>
          <Text style={{ fontSize: 18, color: color, textDecorationLine: textDecorationLine }}>{task.title}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
