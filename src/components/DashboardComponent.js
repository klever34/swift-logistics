import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {connect} from 'react-redux';
import {colors} from '../constants/index';

const DashboardComponent = (props) => {
  return (
    <DrawerItem
      icon={({color, size}) => (
        <Image source={require('../assets/images/dash.png')} style={{height: 20, width: 20}} />
      )}
      label={({focused, color}) => (
        <Text
          style={{
            color: '#fff',
            fontFamily: 'AirbnbCerealBold',
            fontSize: 16,
          }}>
          Dashboard
        </Text>
      )}
      onPress={() => {
        props.nav('Dashboard');
      }}
      style={styles.activeMode}
    />
  );
};

const styles = StyleSheet.create({
  activeMode: {
    borderWidth: 0,
    padding: 5,
    borderColor: '#fff',
    elevation: 1,
    backgroundColor: '#80C050',
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
