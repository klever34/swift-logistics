import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Dashboard from '../screens/drawer/dashboard/Dashboard';

// import {connect} from 'react-redux';



const DashboardStack = createStackNavigator();
const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator headerMode="none">
      <DashboardStack.Screen name="Dashoboard" component={Dashboard} />
    </DashboardStack.Navigator>
  );
};


const Drawer = createDrawerNavigator();
const DrawerScreen = props => (
  <Drawer.Navigator
    initialRouteName="Dashboard"
    drawerContent={() => <DrawerContentList/>}>
    <Drawer.Screen name="Dashboard" component={DashboardStackScreen} />
  </Drawer.Navigator>
);

export default DrawerScreen;

// const mapStateToProps = state => {
//     return {
//     //   counter: state.tourReducer.tourCounter
//     };
//   };
  
//   const mapDispatchToProps = dispatch => {
//     return {
//     };
//   };
  
//   export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
//   )(DrawerScreen);