import React from 'react';
// import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {StyleSheet, StatusBar, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from './context';

import Login from './src/screens/auth/Login';
import Register from './src/screens/auth/Register';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import CheckEmail from './src/screens/auth/CheckEmail';
import ResetPassword from './src/screens/auth/ResetPassword';
import Form from './src/screens/auth/Form';
import axios from "axios";
import WalkThrough from './src/screens/onboarding/Walkthrough';
import {connect} from 'react-redux';
// import { showTourModal, tourCount } from './src/actions/tour';
import DrawerComponent from './src/components/DrawerComponent';
import AnimatedSplash from 'react-native-animated-splash-screen';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{title: 'Sign In'}}
    />
    <AuthStack.Screen name="Register" component={Register} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <AuthStack.Screen name="CheckEmail" component={CheckEmail} />
    <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
    <AuthStack.Screen name="Form" component={Form} />
  </AuthStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({userToken}) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerComponent}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

const appTheme = [
  {
    dark: false,
    colors: {
      primary: '#0B85E4',
      secondary: '#0984E3',
      iconNotActive: '#979797',
      smallHeader: '#043F6C',
      accent: '#23577E',
      gray: '#828282',
      textColor: '#fff',
      closeBtn: '#C2454B',
      grey900: '#686C79',
      radioBtn: '#868993',
      todoHeader: '#000',
      editTodo: '#2BC63D',
      deleteTodo: '#D63031',
      txtInputBorderBtm: '#707070',
      green: '#27AE60',
      searchInputBorder: '#C4C4C4',
      bgColor: '#fff',
    },
  },
  {
    dark: false,
    colors: {
      primary: '#8E44AD',
      secondary: '#0984E3',
      iconNotActive: '#979797',
      smallHeader: '#043F6C',
      accent: '#23577E',
      gray: '#828282',
      textColor: '#fff',
      closeBtn: '#C2454B',
      grey900: '#686C79',
      radioBtn: '#868993',
      todoHeader: '#000',
      editTodo: '#2BC63D',
      deleteTodo: '#D63031',
      txtInputBorderBtm: '#707070',
      green: '#27AE60',
      searchInputBorder: '#C4C4C4',
      bgColor: '#fff',
    },
  },
];

const App = () => {
  const [userToken, setUserToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [userStatus, setUserStatus] = React.useState(null);
  const [splash, setSplash] = React.useState(false);
  const [chosenTheme, setChosenTheme] = React.useState(0);

  React.useEffect(() => {
    async function testWeb(){
      try {
        const response = await axios.get(
          `https://dragonflyapi.nationaluptake.com/api/auth/verifyAccount?email=alagbaladamilola@gmail.com`,
        );
        console.log("from App js");
        console.log(response.data);
        const res = await axios.post(
          `https://dragonflyapi.nationaluptake.com/api/auth/login`,{
            email: "alagbaladamilola@gmail.com",
            password: "password",
            
            rememberMe: true,
          },
        );
        console.log("from App js");
        console.log(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    testWeb()
  })
  React.useEffect(() => {
    async function checkUserStatus() {
      setIsLoading(true);
      try {
        const value = await AsyncStorage.getItem('@user_onboarded');
        if (value) {
          setUserStatus(value);
        } else {
          setUserStatus(null);
        }
      } catch (e) {}
    }

    async function getChosenTheme() {
      try {
        const value = await AsyncStorage.getItem('@color_theme');
        console.log(value);
        if (value === 'blue') {
          setChosenTheme(0);
        } else if (value === 'purple') {
          setChosenTheme(1);
        } else if (value === 'yellow') {
          setChosenTheme(2);
        } else if (value === 'green') {
          setChosenTheme(3);
        } else if (value === 'red') {
          setChosenTheme(4);
        } else {
          setChosenTheme(0);
        }
      } catch (e) {}
    }
    checkUserStatus();
    getChosenTheme();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setSplash(true);
    }, 3000);
  }, []);

  const authContext = React.useMemo(() => {
    return {
      signIn: async () => {
        try {
          const value = await AsyncStorage.getItem('@user_token');
          if (value !== null) {
            setUserToken(value);
          } else {
            setUserToken(null);
          }
        } catch (e) {}
      },
      signUp: async () => {
        try {
          const value = await AsyncStorage.getItem('@user_token');
          if (value !== null) {
            setUserToken(value);
          } else {
            setUserToken(null);
          }
        } catch (e) {}
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('@user_token');
          setUserToken(null);
        } catch (e) {}
      },
      onboarded: async () => {
        try {
          const value = await AsyncStorage.getItem('@user_onboarded');
          if (value) {
            setUserStatus(value);
          } else {
            setUserStatus(null);
          }
        } catch (e) {}
      },
      colourTheme: async () => {
        try {
          const value = await AsyncStorage.getItem('@color_theme');
          console.log(value);
          if (value === 'blue') {
            setChosenTheme(0);
          } else if (value === 'purple') {
            setChosenTheme(1);
          } else if (value === 'yellow') {
            setChosenTheme(2);
          } else if (value === 'green') {
            setChosenTheme(3);
          } else if (value === 'red') {
            setChosenTheme(4);
          } else {
            setChosenTheme(0);
          }
        } catch (e) {}
      },
    };
  }, []);

  React.useEffect(() => {
    async function getToken() {
      setIsLoading(true);
      try {
        const value = await AsyncStorage.getItem('@user_token');
        if (value !== null) {
          setIsLoading(false);
          setUserToken(value);
        } else {
          setIsLoading(false);
          setUserToken(null);
        }
      } catch (e) {}
    }
    getToken();
  }, []);

  if (userStatus === 'true') {
    if (Platform.OS === 'ios') {
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <AuthContext.Provider value={authContext}>
            <NavigationContainer>
              <RootStackScreen userToken={userToken} />
            </NavigationContainer>
          </AuthContext.Provider>
        </>
      );
    } else {
      return (
        <AnimatedSplash
          translucent={true}
          isLoaded={splash}
          logoImage={require('./src/assets/images/logo.png')}
          backgroundColor={'#64245C'}
          logoHeight={250}
          logoWidth={250}>
          <>
            <StatusBar barStyle="light-content" />

            <AuthContext.Provider value={authContext}>
              <NavigationContainer>
                <RootStackScreen userToken={userToken} />
              </NavigationContainer>
            </AuthContext.Provider>
          </>
        </AnimatedSplash>
      );
    }
  }
  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={splash}
      logoImage={require('./src/assets/images/logo.png')}
      backgroundColor={'#64245C'}
      logoHeight={250}
      logoWidth={250}>
      <AuthContext.Provider value={authContext}>
        <WalkThrough />
      </AuthContext.Provider>
    </AnimatedSplash>
  );
};

const styles = StyleSheet.create({
  tourMode: {
    borderWidth: 3,
    padding: 20,
    borderRadius: 50,
    borderColor: 'red',
  },
});

export default App;
// const mapStateToProps = state => {
//   // console.log( state.tourReducer.tourCounter)
//   return {
//     // counter: state.tourReducer.tourCounter,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     // setCount: val => dispatch(tourCount(val)),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(App);
