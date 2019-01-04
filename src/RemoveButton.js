import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class RemoveButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Icon.Button
        name={'clear'}
        backgroundColor='rgba(0,0,0,0)'
        underlayColor='rgba(0,0,0,0)'
        color={'#C5C8C9'}
        size={20}
        iconStyle={{ marginLeft: -10, marginRight: 0 }}
        activeOpacity={1}
        borderRadius={5}
        onPress={this.props.onRemovePressed}
      />
    );
  }
}
