import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {colors} from '../constants';

class CustomRadioButtons extends Component {
  state = {
    value: null,
  };

  componentDidMount() {
    const {options} = this.props;

    this.setState({
      value: options[0],
    });

    const {value} = this.state;
    this._handleOptionSelected(value);
  }

  _handleOptionSelected = (item, qItem) => {
    const {onOptionSelected} = this.props;
    this.props.onClick;
    this.setState({value: item});
    onOptionSelected(item, qItem);
  };

  render() {
    const {containerStyle, questionItem, options} = this.props;

    const {value} = this.state;

    return (
      <View style={[styles.container, containerStyle]}>
        {options.map(item => {
          const {key} = item;

          return (
            <TouchableOpacity
              onPress={() => this._handleOptionSelected(item, questionItem)}
              activeOpacity={0.8}
              style={[styles.radioButton]}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={[
                    styles.radioButtonHolder,
                    {height: 20, width: 20, borderColor: colors.primary},
                  ]}>
                  {value === item ? (
                    <View
                      style={[
                        styles.radioIcon,
                        {
                          height: 10,
                          width: 10,
                          backgroundColor: colors.primary,
                        },
                      ]}
                    />
                  ) : null}
                </View>
                <Text style={[styles.label, {color: colors.todoHeader}]}>
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // width: '100%',
    // justifyContent: 'space-between',
  },
  buttonContainer: {
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
  checkedButtonLabel: {
    color: colors.primary,
  },
  uncheckedButtonLabel: {
    color: colors.gray,
  },
  uncheckedButtonContainer: {
    backgroundColor: colors.textColor,
  },
  checkedButtonContainer: {
    backgroundColor: colors.todoHeader,
  },
  radioButton: {
    // flexDirection: 'row',
    margin: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  radioButtonHolder: {
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioIcon: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Regular'
  },
});

export default CustomRadioButtons;
