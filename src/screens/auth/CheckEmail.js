import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import {colors, baseUrl} from '../../constants/index';
import {AuthContext} from '../../../context';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CheckEmail = (props) => {
  const {signIn} = React.useContext(AuthContext);
  const [buttonStatus, setButtonStatus] = React.useState(false);
  const [showIndicator, setShowIndicator] = React.useState(false);
  const [userEmail, setEmail] = React.useState(null);
  const [userPassword, setPassword] = React.useState(null);
  const [pwdStatus, setPwdStatus] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [msg, setMsg] = React.useState(null);

  const authUser = async () => {
    if (!userEmail || !userPassword) return;
    setShowIndicator(true);
    setButtonStatus(true);
    var userData = {
      email: userEmail,
      password: userPassword,
      // uri: 'http://Tomide-Inc.lms.com',
    };

    // Email.    portal-learner@gmail.com

    // Pword 7u67Sd!hR5@u

    try {
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      const result = await axios.post(`${baseUrl}auth/learner/login`, userData);
      console.log(result.data);
      await AsyncStorage.setItem('@user_token', result.data.access_token);
      await AsyncStorage.setItem(
        '@user_name',
        `${result.data.user.first_name} ${result.data.user.last_name}`,
      );
      await AsyncStorage.setItem('@user_email', result.data.user.email);
      await AsyncStorage.setItem('@user_id', result.data.user.id);
      await AsyncStorage.setItem(
        '@user_phone',
        `${result.data.user.phone_number}`,
      );
      await AsyncStorage.setItem(
        '@user_verified',
        `${result.data.user.verified}`,
      );
      await AsyncStorage.setItem('@user_role', result.data.user.role);
      signIn();
      setShowIndicator(false);
      setButtonStatus(false);
    } catch (error) {
      console.log(error.response.data);
      setErrorMsg(true);
      setMsg(error.response.data.errors[0].title);
      setShowIndicator(false);
      setButtonStatus(false);
    }
  };

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.bgColor, flex: 1}}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              padding: 30,
              flex: 1,
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../assets/images/swift.png')}
                style={{height: 70}}
              />
              <Text
                style={[
                  styles.bigLogin,
                  {marginTop: 10, paddingHorizontal: 50, textAlign: 'center'},
                ]}>
                Check your Email
              </Text>
              <Text
                style={[
                  styles.bigLogin,
                  {
                    fontSize: 18,
                    color: '#02034A',
                    opacity: 0.5,
                    fontFamily: 'AirbnbCerealLight',
                    textAlign: 'center',
                  },
                ]}>
                We have sent you a reset password link on your registered email
                address.
              </Text>
            </View>

            <View style={styles.btmContainer}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => props.navigation.push('ResetPassword')}>
                <Text style={styles.smallLogin}>Reset Password</Text>
                {showIndicator && (
                  <ActivityIndicator
                    size="small"
                    color="#ffffff"
                    style={{paddingHorizontal: 5, marginTop: -3}}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bigLogin: {
    color: '#02034A',
    fontFamily: 'AirbnbCerealBold',
    fontSize: 42,
    marginVertical: 5,
  },
  smallLogin: {
    color: colors.textColor,
    fontSize: 18,
    fontFamily: 'AirbnbCerealBold',
  },
  buttonContainer: {
    backgroundColor: '#80C050',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '90%',
    marginVertical: 20,
    flexDirection: 'row',
    borderRadius: 6,
  },
  forgotPwd: {
    fontFamily: 'AirbnbCerealBook',
    color: '#000000',
    // marginTop: 30
  },
  createAct: {
    fontFamily: 'AirbnbCerealBook',
    color: '#02034A',
    paddingHorizontal: 3,
  },
  txtInput: {
    fontFamily: 'AirbnbCerealBook',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F6',
    marginVertical: 25,
    flex: 1,
  },
  btmContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconBox: {
    backgroundColor: '#D1BDCE',
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 40,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  inputRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
});

export default CheckEmail;
