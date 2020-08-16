import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
// import {connect} from 'react-redux';
import DashboardComponent from '../components/DashboardComponent';
import OrderComponent from '../components/OrderComponent';
import HistoryComponent from '../components/HistoryComponent';
import PaymentComponent from '../components/PaymentComponent';
import SupportComponent from '../components/SupportComponent';
import AboutComponent from '../components/AboutComponent';
import {colors} from '../constants/index';
import {AuthContext} from '../../context';

const DrawerContentList = ({props}) => {
  const navigation = useNavigation();
  const {signOut} = React.useContext(AuthContext);
  const logOut = () => {
    signOut();
  };
  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.drawerContent}>
        <View>
          <View style={styles.profile}>
            <Image
              source={require('../assets/images/peter.png')}
              style={{height: 70, width: 70, resizeMode: 'contain'}}
            />
            <View style={{paddingLeft: 10}}>
              <Text style={styles.name}>Peter</Text>
              <Text style={styles.edit}>Edit profile</Text>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DashboardComponent nav={navigation.navigate} />
            <OrderComponent nav={navigation.navigate} />
            <HistoryComponent nav={navigation.navigate} />
            <PaymentComponent nav={navigation.navigate} />
            <SupportComponent nav={navigation.navigate} />
            <AboutComponent nav={navigation.navigate} />
          </Drawer.Section>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
            marginTop: 40,
          }}
          onPress={() => logOut()}>
          <Image
            source={require('../assets/images/logout.png')}
            style={{height: 20, width: 20}}
          />
          <Text
            style={{
              fontFamily: 'AirbnbCerealMedium',
              fontSize: 16,
              color: '#E56C44',
              paddingHorizontal: 30,
            }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  name: {
    fontFamily: 'AirbnbCerealBlack',
    fontSize: 20,
    paddingVertical: 3,
  },
  edit: {
    fontFamily: 'AirbnbCerealLight',
    fontSize: 12,
    paddingVertical: 3,
  },
  drawerContent: {
    flex: 1,
    marginTop: 20,
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
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    flex: 1,
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
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#c4c4c4',
    paddingVertical: 13,
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
