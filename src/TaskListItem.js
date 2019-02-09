import React, { Component } from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import CheckBox from './CheckBox';
import TaskService from './TaskService';
import * as Animatable from 'react-native-animatable';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TaskListItem extends Component {
  constructor(props) {
    super(props);

    this._onCheckBoxPressed = this._onCheckBoxPressed.bind(this);
    this._onRemovePressed = this._onRemovePressed.bind(this);
    this._onPress = this._onPress.bind(this);
    this._onLongPress = this._onLongPress.bind(this);
    this._onOptionSelect = this._onOptionSelect.bind(this);

    this.state = {
      task: this.props.task,
      contextMenuOpened: false,
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
    this.props.handleTaskDeletion(this.state.task);
  }

  _onPress() {
    this.props.onPress();
  }

  _onLongPress() {
    this.props.onLongPress();
    this.setState({ contextMenuOpened: true });
  }

  _onOptionSelect(option) {
    if (option === 1) {
      alert('Edit task: ' + this.state.task.title);
    } else if (option = 2) {
      alert('Delete item: ' + this.state.task.title);
    }
  }

  render() {
    let task = this.state.task;
    let color = task.completed ? '#C5C8C9' : '#000';
    let textDecorationLine = task.completed ? 'line-through' : 'none';

    return (
      <Animatable.View ref={this.handleAnimatedViewRef} style={styles.container}>
        <CheckBox task={task} color={color} onCheckBoxPressed={this._onCheckBoxPressed} style={styles.checkBox}></CheckBox>
        <TouchableHighlight underlayColor="#ffffff00" style={styles.touchable} onPress={this._onPress} onLongPress={this._onLongPress}>
          <Text style={[styles.text, { color: color, textDecorationLine: textDecorationLine }]}>{task.title}</Text>
        </TouchableHighlight>
        <Menu
          onSelect={value => this._onOptionSelect(value)}>
          <MenuOptions style={styles.menuOptions}>
            <MenuOption value={1} style={styles.menuOption}>
              <Icon
                style={styles.menuOptionIcon}
                name={'edit'}
                backgroundColor='rgba(0,0,0,0)'
                underlayColor='rgba(0,0,0,0)'
                color={'#C5C8C9'}
                size={20}
                activeOpacity={1}
                borderRadius={5}
              />
              <Text>Edit</Text>
            </MenuOption>
            <MenuOption value={2} style={styles.menuOption}>
              <Icon
                style={styles.menuOptionIcon}
                name={'delete'}
                backgroundColor='rgba(0,0,0,0)'
                underlayColor='rgba(0,0,0,0)'
                color={'#FF5555'}
                size={20}
                activeOpacity={1}
                borderRadius={5}
              />
              <Text style={{color: '#FF5555'}}>Delete</Text>
            </MenuOption>
          </MenuOptions>
          <MenuTrigger>
            <Icon
              style={styles.triggerIcon}
              name={'more-horiz'}
              backgroundColor='rgba(0,0,0,0)'
              underlayColor='rgba(0,0,0,0)'
              color={'#C5C8C9'}
              size={20}
              activeOpacity={1}
              borderRadius={5}
            />
          </MenuTrigger>
        </Menu>
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
  touchable: {
    flex: 1,
    paddingRight: 5,
  },
  text: {
    fontSize: 18,
  },
  rightButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  menuOptions: {
    backgroundColor: "#F8F8F8",
  },
  menuOption: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10
  },
  menuOptionIcon: {
    paddingLeft: 5,
    paddingRight: 10
  },
  triggerIcon: {
    marginRight: 5,
  }
})
