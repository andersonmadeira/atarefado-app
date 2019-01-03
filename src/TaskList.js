import React, { Component } from 'react';
import { Text, View, TouchableHighlight, FlatList } from 'react-native';
import Task from './Task';
import InputBox from './InputBox';
import TaskListItem from './TaskListItem';
import TaskService from './TaskService';

export default class TaskList extends Component {
  constructor(props) {
    super(props);

    let dataList = TaskService.findAll();

    this.state = {
      dataList: dataList
    }
  }

  render() {
    let taskList = (<View></View>);

    if (this.state.dataList.length) {
      taskList = (
        <FlatList
          data={this.state.dataList}
          renderItem={({ item }) => <TaskListItem task={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }

    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <InputBox data={Array.from(this.state.dataList)} />
        {taskList}
      </View>
    )
  }
}
