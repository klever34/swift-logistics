import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
// import {connect} from 'react-redux';
import DashboardComponent from '../components/DashboardComponent';
import {colors} from '../constants/index';

const DrawerContentList = ({props}) => {
  const navigation = useNavigation();
  // console.log("props.counter")
  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: colors.primary, flex: 1}}>
      <View style={styles.drawerContent}>
        <View>
          <TouchableWithoutFeedback
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
            <Entypo
              name={'cross'}
              size={32}
              color={colors.textColor}
              style={{fontSize: 44, paddingHorizontal: 15}}
            />
          </TouchableWithoutFeedback>
          <Drawer.Section style={styles.drawerSection}>
            <DashboardComponent nav={navigation.navigate} />
          </Drawer.Section>
        </View>
      {/* <Text style={{color: colors.textColor,, textAlign: 'center', marginTop: 40}}>@EDCLearn 2020</Text> */}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginTop: 20,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    flex: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tourMode: {
    borderWidth: 3,
    padding: 30,
    borderRadius: 50,
    borderColor: 'transparent',
    elevation: 5,
    backgroundColor: colors.bgColor,
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 9,
    shadowRadius: 2,
    marginVertical: 10,
  },
});

export default DrawerContentList;
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
// )(DrawerContentList);
