import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {connect} from 'react-redux';
import {colors} from '../constants/index';

const DashboardComponent = props => {
    return (
      <DrawerItem
        icon={({color, size}) => (
          <FontAwesome
            name={'group'}
            size={32}
            color={colors.todoHeader}
            style={{
              fontSize: 26,
              paddingHorizontal: 5,
              paddingVertical: 25,
            }}
          />
        )}
        label={({focused, color}) => (
          <Text
            style={{
              color: colors.todoHeader,
              fontFamily: 'AirbnbCerealBold',
              fontSize: 16,
            }}>
            Dashboard
          </Text>
        )}
        onPress={() => {props.nav('Dashboard')}}
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

export default DashboardComponent;

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
