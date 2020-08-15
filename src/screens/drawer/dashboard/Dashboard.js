import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RadioButton, Switch, Menu, Provider} from 'react-native-paper';

class Dashboard extends Component {
  state = {
    levelOne: true,
    levelTwo: false,
    levelThree: false,
    checked: 'first',
    isSwitchOn: false,
    setCategoryVisible: false,
    selectedCategoryText: 'Select Category',
    currentIndex: 0,
  };

  moveLevel() {
    let newIndex = this.state.currentIndex + 1;
    this.setState({currentIndex: newIndex});
  }
  render() {
    const onToggleSwitch = () =>
      this.setState({isSwitchOn: !this.state.isSwitchOn});
    const openCategoryMenu = () => this.setState({setCategoryVisible: true});
    const closeCategoryMenu = () => this.setState({setCategoryVisible: false});
    const setCategory = (text) => {
      this.setState({selectedCategoryText: text});
      closeCategoryMenu();
    };
    const markers = [
      {
        id: 0,
        latlng: {latitude: 6.515179, longitude: 3.387259},
        title: 'Sample A',
        description: 'an example marker',
      },
      {
        id: 1,
        latlng: {latitude: 6.51634, longitude: 3.385898},
        title: 'Sample B',
        description: 'an example marker',
      },
      {
        id: 2,
        latlng: {latitude: 6.3, longitude: 3.3},
        title: 'Sample C',
        description: 'an example marker',
      },
    ];
    const options = ['Instant', 'Schedule for later'];
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            backgroundColor: '#fff',
          }}>
          <View style={{}}>
            <Feather
              onPress={() => this.props.navigation.openDrawer()}
              name={'menu'}
              color={'#606470'}
              style={{
                fontSize: 30,
                //   flex: 1
              }}
            />
          </View>
          <View style={{}}>
            <Image
              source={require('../../../assets/images/swift.png')}
              style={{height: 50, width: 50, resizeMode: 'contain'}}
            />
          </View>
          <View style={{}}>
            <Feather
              name={'bell'}
              color={'#606470'}
              style={{
                fontSize: 30,
              }}
            />
          </View>
        </View>
        <View style={styles.mapBox}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            initialRegion={{
              latitude: 6.5244,
              longitude: 3.3792,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
                image={require('../../../assets/images/bike.png')}
              />
            ))}
          </MapView>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity style={styles.estimateBtn}>
            <Text style={{fontFamily: 'AirbnbCerealMedium', color: '#353B50'}}>
              Estimate
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detailsBtn}
            onPress={() => this.RBSheet.open()}>
            <Text style={{fontFamily: 'AirbnbCerealMedium', color: '#fff'}}>
              Enter details
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.card,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              paddingHorizontal: 10,
              borderRadius: 6,
              marginLeft: 20,
            },
          ]}>
          <GooglePlacesAutocomplete
            placeholder="Where to ?"
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
                backgroundColor: '#fff',
                borderTopWidth: 0,
                borderBottomWidth: 0,
                borderColor: '#fff',
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 50,
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
        <View
          style={[
            styles.card2,
            {
              //   marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: '#fff',
              width: '90%',
              paddingHorizontal: 10,
              borderRadius: 6,
              marginLeft: 20,
            },
          ]}>
          <GooglePlacesAutocomplete
            placeholder="Enter destination"
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
                backgroundColor: '#fff',
                borderTopWidth: 0,
                borderBottomWidth: 0,
                borderColor: '#fff',
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 50,
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
        <Provider>
          <RBSheet
            ref={(ref) => {
              this.RBSheet = ref;
            }}
            closeOnDragDown={true}
            closeOnPressMask={false}
            height={400}
            customStyles={{
              wrapper: {
                backgroundColor: 'transparent',
                borderRadius: 10,
                borderWidth: 1,
              },
              draggableIcon: {
                backgroundColor: '#fff',
              },
            }}>
            <View>
              {this.state.currentIndex === 0 && (
                <View>
                  <View
                    style={{
                      marginTop: 5,
                      alignItems: 'center',
                      paddingHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'AirbnbCerealMedium',
                        fontSize: 12,
                        color: '#353B50',
                        marginBottom: 10,
                      }}>
                      Dropoff details
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        backgroundColor: '#F9F9F9',
                        padding: 16,
                      }}>
                      <Entypo
                        onPress={() => this.props.navigation.openDrawer()}
                        name={'location-pin'}
                        color={'#606470'}
                        style={{
                          fontSize: 30,
                          opacity: 0.3,
                          // paddingHorizontal: 5
                        }}
                      />
                      <View>
                        <Text
                          style={{
                            fontFamily: 'AirbnbCerealMedium',
                            fontSize: 14,
                            color: '#353B50',
                            paddingHorizontal: 5,
                          }}>
                          Bdlive24.com
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'AirbnbCerealMedium',
                            fontSize: 12,
                            color: '#353B50',
                            opacity: 0.5,
                            paddingHorizontal: 5,
                          }}>
                          Hourse 57, road-8, Block-D, Gulshan
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: 'AirbnbCerealMedium',
                          fontSize: 14,
                          color: '#353B50',
                          paddingHorizontal: 5,
                        }}>
                        Edit
                      </Text>
                    </View>
                    <View style={styles.input}>
                      <TextInput
                        placeholder={'Recipient Name'}
                        style={{
                          fontFamily: 'AirbnbCerealMedium',
                          marginLeft: 5,
                        }}
                        placeholderTextColor={'#c4c4c4'}
                      />
                    </View>
                    <View
                      style={[
                        styles.input,
                        {flexDirection: 'row', alignItems: 'center'},
                      ]}>
                      <View style={styles.iconBox}>
                        <Image
                          source={require('../../../assets/images/flag.png')}
                        />
                        <Text
                          style={{
                            color: '#353B50',
                            fontFamily: 'AirbnbCerealMedium',
                          }}>
                          +234
                        </Text>
                        <AntDesign
                          onPress={() => setPwdStatus(!pwdStatus)}
                          name={'down'}
                          color={'#353B50'}
                          style={{
                            fontSize: 14,
                          }}
                        />
                      </View>
                      <TextInput
                        placeholder={'Phone Number'}
                        style={{fontFamily: 'AirbnbCerealMedium', flex: 1}}
                        placeholderTextColor={'#c4c4c4'}
                      />
                    </View>
                  </View>
                  <View style={{alignItems: 'center', marginBottom: 20}}>
                    <TouchableOpacity
                      style={styles.buttonContainer}
                      onPress={() => this.moveLevel()}>
                      <Text style={styles.smallLogin}>Continue</Text>
                      {/* {showIndicator && (
                  <ActivityIndicator
                    size="small"
                    color="#ffffff"
                    style={{paddingHorizontal: 5, marginTop: -3}}
                  />
                )} */}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {this.state.currentIndex === 1 && (
                <View>
                  <View
                    style={{
                      marginTop: 5,
                      //   alignItems: 'flex-start',
                      paddingHorizontal: 10,
                    }}>
                    <View style={{alignItems: 'center'}}>
                      <Text
                        style={{
                          fontFamily: 'AirbnbCerealMedium',
                          fontSize: 12,
                          color: '#353B50',
                          marginBottom: 10,
                        }}>
                        Category
                      </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Menu
                        visible={this.state.setCategoryVisible}
                        onDismiss={closeCategoryMenu}
                        anchor={
                          <TouchableOpacity
                            onPress={openCategoryMenu}
                            style={[
                              styles.input,
                              {
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingVertical: 15,
                                paddingHorizontal: 5,
                                width: '65%',
                              },
                            ]}>
                            <Text
                              style={{
                                fontFamily: 'AirbnbCerealLight',
                                fontSize: 14,
                                color: '#353B50',
                                paddingHorizontal: 5,
                              }}>
                              {this.state.selectedCategoryText}
                            </Text>
                            <AntDesign
                              onPress={() => null}
                              name={'caretdown'}
                              color={'#042C5C'}
                              style={{
                                fontSize: 12,
                                marginLeft: 70,
                              }}
                            />
                          </TouchableOpacity>
                        }>
                        <Menu.Item
                          onPress={() => {
                            setGender('Male');
                          }}
                          title="Male"
                        />
                        <Menu.Item
                          onPress={() => {
                            setGender('Female');
                          }}
                          title="Female"
                        />
                      </Menu>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontFamily: 'AirbnbCerealMedium',
                      fontSize: 12,
                      color: '#353B50',
                      marginVertical: 10,
                      textAlign: 'left',
                      marginLeft: 50,
                    }}>
                    Schedule Order
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 45,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton
                        value="first"
                        status={
                          this.state.checked === 'first'
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => this.setState({checked: 'first'})}
                      />
                      <Text
                        style={{
                          fontFamily: 'AirbnbCerealLight',
                          fontSize: 14,
                          color: '#353B50',
                          paddingHorizontal: 5,
                        }}>
                        Instant
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton
                        value="second"
                        status={
                          this.state.checked === 'second'
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => this.setState({checked: 'second'})}
                      />
                      <Text
                        style={{
                          fontFamily: 'AirbnbCerealLight',
                          fontSize: 14,
                          color: '#353B50',
                          paddingHorizontal: 5,
                        }}>
                        Schedule a transfer
                      </Text>
                    </View>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <View
                      style={[
                        styles.input,
                        {
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          //   paddingVertical: 15,
                          paddingHorizontal: 5,
                          width: '75%',
                        },
                      ]}>
                      <TextInput
                        placeholder={'Date and time'}
                        style={{
                          fontFamily: 'AirbnbCerealMedium',
                          marginLeft: 5,
                        }}
                        placeholderTextColor={'#c4c4c4'}
                      />
                      <MaterialCommunityIcons
                        name={'calendar'}
                        color={'#c4c4c4'}
                        style={{
                          fontSize: 30,
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginLeft: 50,
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'AirbnbCerealLight',
                        fontSize: 14,
                        color: '#353B50',
                      }}>
                      Is the item fragile?
                    </Text>
                    <Switch
                      value={this.state.isSwitchOn}
                      onValueChange={onToggleSwitch}
                      style={{marginRight: 40}}
                      color={'#64245C'}
                    />
                  </View>
                  <View style={{alignItems: 'center', marginBottom: 20}}>
                    <TouchableOpacity
                      style={[
                        styles.buttonContainer,
                        {backgroundColor: '#80C050'},
                      ]}
                      onPress={() => this.moveLevel()}>
                      <Text style={styles.smallLogin}>Proceed to pay</Text>
                      {/* {showIndicator && (
                  <ActivityIndicator
                    size="small"
                    color="#ffffff"
                    style={{paddingHorizontal: 5, marginTop: -3}}
                  />
                )} */}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {this.state.currentIndex === 2 && (
                <View>
                  <View
                    style={{
                      marginTop: 5,
                      //   alignItems: 'flex-start',
                      paddingHorizontal: 10,
                    }}>
                    <View style={{alignItems: 'center'}}>
                      <Text
                        style={{
                          fontFamily: 'AirbnbCerealMedium',
                          fontSize: 12,
                          color: '#353B50',
                          marginBottom: 10,
                        }}>
                        Payment
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginHorizontal: 30,
                      backgroundColor: '#F9F9F9',
                      padding: 10,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Image
                          source={require('../../../assets/images/bike_two.png')}
                          style={{height: 50, width: 50, resizeMode: 'contain'}}
                        />
                        <Text
                          style={{
                            fontFamily: 'AirbnbCerealBold',
                            fontSize: 12,
                            color: '#353B50',
                            marginBottom: 10,
                            paddingLeft: 15,
                            paddingTop: 5,
                          }}>
                          SWIFT
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: 'AirbnbCerealBold',
                          fontSize: 12,
                          color: '#80C050',
                          marginBottom: 10,
                        }}>
                        ₦495.00
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginHorizontal: 30,
                      padding: 10,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'AirbnbCerealMedium',
                          fontSize: 12,
                          color: '#353B50',
                          marginBottom: 10,
                          paddingLeft: 15,
                          paddingTop: 5,
                        }}>
                        Pay with card
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'AirbnbCerealLight',
                          fontSize: 12,
                          color: '#353B50',
                          marginBottom: 10,
                        }}>
                        + Add New
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View
                      style={{
                        marginHorizontal: 30,
                        padding: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Image
                            source={require('../../../assets/images/cc.png')}
                            style={{
                              height: 20,
                              width: 20,
                              resizeMode: 'contain',
                            }}
                          />
                          <Text
                            style={{
                              fontFamily: 'AirbnbCerealMedium',
                              fontSize: 12,
                              color: '#353B50',
                              paddingHorizontal: 5,
                            }}>
                            **** **** **** 2376
                          </Text>
                        </View>
                        <RadioButton
                          value="third"
                          status={
                            this.state.checked === 'third'
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => this.setState({checked: 'third'})}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'AirbnbCerealMedium',
                            fontSize: 12,
                            color: '#353B50',
                            paddingHorizontal: 5,
                          }}>
                          Cash on Pick-up
                        </Text>
                        <RadioButton
                          value="first"
                          status={
                            this.state.checked === 'first'
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => this.setState({checked: 'first'})}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'AirbnbCerealMedium',
                            fontSize: 12,
                            color: '#353B50',
                            paddingHorizontal: 5,
                          }}>
                          Cash on Delivery
                        </Text>
                        <RadioButton
                          value="second"
                          status={
                            this.state.checked === 'second'
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => this.setState({checked: 'second'})}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={{alignItems: 'center', marginBottom: 20}}>
                    <TouchableOpacity
                      style={[
                        styles.buttonContainer,
                        {backgroundColor: '#64245C'},
                      ]}
                      onPress={() => refRBSheetTwo.current.open()}>
                      <Text style={styles.smallLogin}>Proceed</Text>
                      {/* {showIndicator && (
                  <ActivityIndicator
                    size="small"
                    color="#ffffff"
                    style={{paddingHorizontal: 5, marginTop: -3}}
                  />
                )} */}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </RBSheet>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: '5%',
    flexDirection: 'row',
  },
  estimateBtn: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  detailsBtn: {
    backgroundColor: '#64245C',
    borderRadius: 8,
    padding: 20,
    width: '60%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapBox: {
    height: 700,
  },
  card: {
    position: 'absolute',
    bottom: '75%',
  },
  card2: {
    position: 'absolute',
    bottom: '68%',
  },
  buttonContainer: {
    backgroundColor: '#64245C',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '78%',
    marginVertical: 20,
    flexDirection: 'row',
    borderRadius: 8,
    paddingVertical: 20,
  },
  smallLogin: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'AirbnbCerealBold',
  },
  input: {
    borderColor: '#c4c4c4',
    borderWidth: 0.5,
    width: '80%',
    borderRadius: 4,
    marginVertical: 5,
  },
  iconBox: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: 90,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    flexDirection: 'row',
  },
});

export default Dashboard;
