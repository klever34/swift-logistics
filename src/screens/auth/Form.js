import React, {useRef} from 'react';
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
  FlatList,
} from 'react-native';
import {colors, baseUrl} from '../../constants/index';
import {AuthContext} from '../../../context';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RBSheet from 'react-native-raw-bottom-sheet';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const Form = (props) => {
  const refRBSheet = useRef();
  const refRBSheetTwo = useRef();
  const {signIn} = React.useContext(AuthContext);
  const [buttonStatus, setButtonStatus] = React.useState(false);
  const [showIndicator, setShowIndicator] = React.useState(false);
  const [userEmail, setEmail] = React.useState(null);
  const [userPassword, setPassword] = React.useState(null);
  const [pwdStatus, setPwdStatus] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [msg, setMsg] = React.useState(null);

  const data = [
    {
      id: 0,
      title: 'sample',
    },
    {
      id: 1,
      title: 'sample',
    },
    {
      id: 2,
      title: 'sample',
    },
    {
      id: 3,
      title: 'sample',
    },
    {
      id: 4,
      title: 'sample',
    },
    {
      id: 5,
      title: 'sample',
    },
  ];
  const authUser = async () => {
    if (!userEmail || !userPassword) return;
    setShowIndicator(true);
    setButtonStatus(true);
    var userData = {
      email: userEmail,
      password: userPassword,
    };

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

  const openModal = (text) => {};

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
              <Text style={[styles.bigLogin, {marginTop: 10}]}>
                Create your account
              </Text>
            </View>
            <View style={styles.inputRow}>
              <TextInput
                placeholderTextColor={'#8081A4'}
                placeholder="First Name"
                style={[styles.txtInput, {color: '#000', marginLeft: 0}]}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputRow}>
              <TextInput
                placeholderTextColor={'#8081A4'}
                placeholder="Last Name"
                style={[styles.txtInput, {color: '#000', marginLeft: 0}]}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputRow}>
              <TextInput
                placeholderTextColor={'#8081A4'}
                placeholder="Email"
                style={[styles.txtInput, {color: '#000', marginLeft: 0}]}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputRow}>
              <View style={styles.iconBox}>
                <Image source={require('../../assets/images/flag.png')} />
                <Text style={{color: '#fff', fontFamily: 'AirbnbCerealMedium'}}>
                  +234
                </Text>
                <AntDesign
                  onPress={() => setPwdStatus(!pwdStatus)}
                  name={'down'}
                  color={'#FFF'}
                  style={{
                    fontSize: 14,
                  }}
                />
              </View>
              <TextInput
                placeholderTextColor={'#8081A4'}
                placeholder="Phone number"
                style={[styles.txtInput, {color: '#000', marginLeft: 20}]}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
              />
            </View>
            <View
              style={[
                styles.txtInput,
                {flexDirection: 'row', alignItems: 'center', marginLeft: 0},
              ]}>
              <TextInput
                placeholderTextColor={'#8081A4'}
                placeholder="Password"
                style={[
                  {flex: 1, color: '#000', fontFamily: 'AirbnbCerealBook'},
                ]}
                secureTextEntry={pwdStatus}
                onChangeText={(text) => setPassword(text)}
              />
              <Image source={require('../../assets/images/eye_open.png')} />
            </View>
            <View
              style={[
                styles.txtInput,
                {flexDirection: 'row', alignItems: 'center', marginLeft: 0},
              ]}>
              <TextInput
                placeholderTextColor={'#8081A4'}
                placeholder="Default pick-up location"
                style={[
                  {flex: 1, color: '#000', fontFamily: 'AirbnbCerealBook'},
                ]}
                // onChangeText={(text) => openModal(text)}
                onFocus={() => refRBSheet.current.open()}
              />
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
              }}>
              <Text
                style={[styles.forgotPwd, {color: '#02034A', opacity: 0.5}]}>
                By clicking Sign up you agree to the following
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.createAct,
                    {color: '#80C050', opacity: 0.5, marginLeft: -4},
                  ]}
                  onPress={() => props.navigation.push('ForgotPassword')}>
                  Terms of Service
                </Text>
                <Text
                  style={[
                    styles.createAct,
                    {color: '#02034A', opacity: 0.5, marginLeft: -4},
                  ]}
                  onPress={() => props.navigation.push('ForgotPassword')}>
                  without reservation
                </Text>
              </View>
            </View>
            {errorMsg && (
              <Text style={[styles.forgotPwd, {color: 'red'}]}>{msg}</Text>
            )}
            <View style={styles.btmContainer}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => refRBSheetTwo.current.open()}>
                <Text style={styles.smallLogin}>Sign Up</Text>
                {showIndicator && (
                  <ActivityIndicator
                    size="small"
                    color="#ffffff"
                    style={{paddingHorizontal: 5, marginTop: -3}}
                  />
                )}
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{flexDirection: 'row', marginVertical: 0}}>
                  <Text style={styles.forgotPwd}>Already have an account?</Text>
                  <Text
                    style={[
                      styles.createAct,
                      {color: '#80C050', fontFamily: 'AirbnbCerealBold'},
                    ]}
                    onPress={() => props.navigation.push('Register')}>
                    Sign In?
                  </Text>
                </View>
              </View>
            </View>
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              height={500}
              customStyles={{
                wrapper: {
                  backgroundColor: 'transparent',
                  borderRadius: 10,
                  borderWidth: 1,
                },
                draggableIcon: {
                  backgroundColor: '#000',
                },
              }}>
              <View
                style={{
                  backgroundColor: '#80C050',
                  height: 70,
                  borderTopRightRadius: 24,
                  borderTopLeftRadius: 24,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // backgroundColor: '#fff',
                    width: '90%',
                    paddingHorizontal: 10,
                    borderRadius: 6,
                  }}>
                  <GooglePlacesAutocomplete
                    placeholder="Search"
                    onPress={(data, details = null) => {
                      console.log(data, details);
                    }}
                    query={{
                      key: 'AIzaSyC3ko1LbjiRt8klPzj3xZaJMQnnf42i0VQ',
                      language: 'en',
                    }}
                    autoFocus={false}
                    returnKeyType={'default'}
                    fetchDetails={true}
                    styles={{
                      textInputContainer: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                      },
                      textInput: {
                        marginLeft: 0,
                        marginRight: 0,
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16,
                        fontFamily: 'AirbnbCerealMedium',
                      },
                      predefinedPlacesDescription: {
                        color: '#1faadb',
                      },
                    }}
                  />
                </View>
              </View>
              <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 0.5,
                      backgroundColor: '#e5e5e5',
                      marginHorizontal: 8,
                    }}
                  />
                )}
                renderItem={(menuOpt) => (
                  <TouchableOpacity
                    onPress={() => {
                      null;
                    }}>
                    <Text
                      style={{
                        fontFamily: 'AirbnbCerealMedium',
                        fontSize: 18,
                        textAlign: 'center',
                        paddingVertical: 10,
                      }}>
                      {menuOpt.item.title}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </RBSheet>
            <RBSheet
              ref={refRBSheetTwo}
              closeOnDragDown={true}
              closeOnPressMask={false}
              height={300}
              customStyles={{
                wrapper: {
                  backgroundColor: 'transparent',
                  borderRadius: 10,
                  borderWidth: 1,
                },
                draggableIcon: {
                  backgroundColor: '#000',
                },
              }}>
              <View
                style={{
                  backgroundColor: '#64245C',
                  height: 70,
                  borderTopRightRadius: 24,
                  borderTopLeftRadius: 24,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'AirbnbCerealLight',
                    color: '#fff',
                    opacity: 0.7,
                    paddingTop: 20,
                  }}>
                  PASTE FROM SMS
                </Text>
              </View>
              <View>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTopRightRadius: 24,
                    borderTopLeftRadius: 24,
                    width: '90%',
                    paddingHorizontal: 10,
                    borderRadius: 6,
                  }}>
                  <View
                    style={{
                      height: 40,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 1,
                      marginLeft: 35,
                    }}>
                    <View
                      style={{
                        borderBottomColor: '#828282',
                        borderBottomWidth: 1,
                        alignItems: 'center',
                        marginHorizontal: 10,
                        justifyContent: 'center',
                        width: '20%',
                      }}>
                      <TextInput
                        placeholderTextColor={'#8081A4'}
                        style={[
                          {
                            flex: 1,
                            color: '#000',
                            fontFamily: 'AirbnbCerealBook',
                          },
                        ]}
                        // onChangeText={(text) => openModal(text)}
                      />
                    </View>
                    <View
                      style={{
                        borderBottomColor: '#828282',
                        borderBottomWidth: 1,
                        alignItems: 'center',
                        marginHorizontal: 10,
                        justifyContent: 'center',
                        width: '20%',
                      }}>
                      <TextInput
                        placeholderTextColor={'#8081A4'}
                        style={[
                          {
                            flex: 1,
                            color: '#000',
                            fontFamily: 'AirbnbCerealBook',
                          },
                        ]}
                        // onChangeText={(text) => openModal(text)}
                      />
                    </View>
                    <View
                      style={{
                        borderBottomColor: '#828282',
                        borderBottomWidth: 1,
                        alignItems: 'center',
                        marginHorizontal: 10,
                        justifyContent: 'center',
                        width: '20%',
                      }}>
                      <TextInput
                        placeholderTextColor={'#8081A4'}
                        style={[
                          {
                            flex: 1,
                            color: '#000',
                            fontFamily: 'AirbnbCerealBook',
                          },
                        ]}
                        // onChangeText={(text) => openModal(text)}
                      />
                    </View>
                    <View
                      style={{
                        borderBottomColor: '#828282',
                        borderBottomWidth: 1,
                        alignItems: 'center',
                        marginHorizontal: 10,
                        justifyContent: 'center',
                        width: '20%',
                      }}>
                      <TextInput
                        placeholderTextColor={'#8081A4'}
                        style={[
                          {
                            flex: 1,
                            color: '#000',
                            fontFamily: 'AirbnbCerealBook',
                          },
                        ]}
                        // onChangeText={(text) => openModal(text)}
                      />
                    </View>
                  </View>
                </View>
                <Text
                  style={[
                    styles.bigLogin,
                    {
                      fontSize: 16,
                      color: '#02034A',
                      opacity: 0.5,
                      fontFamily: 'AirbnbCerealLight',
                      marginHorizontal: 35,
                    },
                  ]}>
                  Please, enter 4-digit code we sent on your number as SMS
                </Text>
                <View style={{alignItems: 'center', marginBottom: 20}}>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => refRBSheetTwo.current.open()}>
                    <Text style={styles.smallLogin}>Next</Text>
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
            </RBSheet>
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
    fontSize: 24,
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
    marginVertical: 10,
    flex: 1,
  },
  btmContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconBox: {
    backgroundColor: '#64245C',
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: 90,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    flexDirection: 'row',
  },
  inputRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
});

export default Form;
