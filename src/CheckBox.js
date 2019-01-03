import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let iconType = this.props.task.completed ? 'check-box' : 'check-box-outline-blank';
    let color = this.props.color || '#000';

    return (
      <Icon.Button
        data={this.props.task}
        name={iconType}
        backgroundColor='rgba(0,0,0,0)'
        underlayColor='rgba(0,0,0,0)'
        color={color}
        size={20}
        iconStyle={{ marginLeft: -10, marginRight: 0 }}
        activeOpacity={1}
        borderRadius={5}
        onPress={this.props.onCheckBoxPressed}
      />
    );
  }
}
