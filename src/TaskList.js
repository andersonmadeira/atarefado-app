import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import InputBox from './InputBox';
import TaskListItem from './TaskListItem';
import TaskService from './TaskService';

export default class TaskListContainer extends Component {
  constructor(props) {
    super(props);

    let dataList = TaskService.findAll();

    this.state = {
      dataList: dataList
    }

    this._onTasksFiltered = this._onTasksFiltered.bind(this);
    this._handleRemove = this._handleRemove.bind(this);
    this._onPress = this._onPress.bind(this);
    this._onLongPress = this._onLongPress.bind(this);
  }

  _onTasksFiltered(tasks) {
    this.setState({
      dataList: tasks
    });
  }

  _onPress() {
    alert('pressed');
  }

  _onLongPress() {
    alert('long pressed');
  }

  _handleRemove(task) {
    let dataList = this.state.dataList.concat([]);
    let index = dataList.map((t) => t.id).indexOf(task.id);
    dataList.splice(index, 1);
    TaskService.delete(task);
    this.setState({
      dataList: dataList
    });
  }

  render() {
    let taskList = (<View></View>);

    if (this.state.dataList.length) {
      taskList = (
        <FlatList
          data={this.state.dataList}
          renderItem={
            ({ item }) => <TaskListItem task={item} onPress={this._onPress} onLongPress={this._onLongPress} />}
          keyExtractor={(item, index) => item.id}
        />
      );
    }

    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <InputBox onTasksFiltered={this._onTasksFiltered} />
        {taskList}
      </View>
    )
  }
}
