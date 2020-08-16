import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {connect} from 'react-redux';
import {colors} from '../constants/index';

const AboutComponent = (props) => {
  return (
    <DrawerItem
      icon={({color, size}) => (
        <Image
          source={require('../assets/images/info.png')}
          style={{height: 20, width: 20}}
        />
      )}
      label={({focused, color}) => (
        <Text
          style={{
            color: colors.todoHeader,
            fontFamily: 'AirbnbCerealBold',
            fontSize: 16,
          }}>
          About
        </Text>
      )}
      onPress={() => {
        props.nav('Dashboard');
      }}
    />
  );
};

const styles = StyleSheet.create({
  tourMode: {
    borderWidth: 3,
    padding: 5,
    borderColor: 'transparent',
    elevation: 5,
    backgroundColor: colors.bgColor,
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 9,
    shadowRadius: 2,
  },
});

export default AboutComponent;

// const mapStateToProps = state => {
//   return {
//     counter: state.tourReducer.tourCounter,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {};
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(DiscussionComponent);
