import React, { Component } from 'react';
import { Text, View, TouchableHighlight, FlatList, AlertAndroid } from 'react-native';
import Task from './Task';
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
    this._handleEdit = this._handleEdit.bind(this);
    this._handleDetails = this._handleDetails.bind(this);
  }

  _onTasksFiltered(tasks) {
    this.setState({
      dataList: tasks
    });
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

  _handleEdit(task) {
    alert('Editing ' + task.name);
  }

  _handleDetails(task) {
    alert('Details of ' + task.name);
  }

  render() {
    let taskList = (<View></View>);

    if (this.state.dataList.length) {
      taskList = (
        <FlatList
          data={this.state.dataList}
          renderItem={({ item }) => <TaskListItem task={item} handleRemove={this._handleRemove} handleEdit={this._handleEdit} handleDetails={this._handleDetails} />}
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
