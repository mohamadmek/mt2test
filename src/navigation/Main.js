import React, {useState, useEffect} from 'react';
import {StyleSheet, Platform, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import BottomTabs from './BottomTabs';

import ChangeTheme from '../screens/ChangeTheme/index';
import ChangeLanguage from '../screens/ChangeLanguage/index';
import DeepLogin from '../screens/DeepLogin/index';
import SplashScreen from '../screens/SplashScreen/SplashScreen';

import Signup from '../screens/Signup/index';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../store/Auth';
import {useTheme} from '../utils/theme';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {BaseSetting, isLanguageRTL} from '../utils/Settings';

export default function Main() {
  const {theme, colors} = useTheme();
  const userInfo = useSelector((state) => state.entities.auth);
  const storeLanguage = useSelector(
    (state) => state.entities.application.storeLanguage,
  );

  const dispatch = useDispatch();

  const Stack = createStackNavigator();

  useEffect(() => {
    const language = async () => {
      const value = await AsyncStorage.getItem('language');

      i18n.use(initReactI18next).init({
        resources: BaseSetting.resourcesLanguage,
        lng: value != null ? value : storeLanguage,
        fallbackLng: BaseSetting.defaultLanguage,
      });
    };
    if (Platform.OS == 'android') {
      StatusBar.setBackgroundColor(colors.card, true);
    }
    // StatusBar.setBarStyle('dark-content', true);
    language();
  }, [storeLanguage, theme]);

  const deepLinking = {
    prefixes: ['https://demoApp.com', 'demoApp://'],
    config: {
      Home: 'Home',
      DeepLogin: {
        path: 'DeepLogin/:username/:password',
        params: {
          username: null,
          password: null,
        },
      },
      ChangeLanguage: {
        path: 'ChangeLanguage',
      },
    },
  };

  return (
    <NavigationContainer theme={theme} linking={deepLinking}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* {userInfo.token == '' && userInfo.isLogin == false ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        ) : ( */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="ChangeTheme" component={ChangeTheme} />
        <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="DeepLogin" component={DeepLogin} />
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

// useEffect(() => {
//   autoLogin();
// }, []);

// const autoLogin = async () => {
//   const usernameStorage = await AsyncStorage.getItem('username');
//   const passwordStorage = await AsyncStorage.getItem('password');
//   if (usernameStorage != '' && passwordStorage != '') {
//     try {
//       const response = await fetch(
//         `${Global.apiURL}/login?username=${usernameStorage}&password=${passwordStorage}`,
//         {
//           headers: {
//             'X-Parse-Application-Id': Global.appID,
//             Authorization: 'application/json',
//           },
//         },
//       );
//       const result = await response.json();

//       if (result.error) {
//         console.log(result.error);
//       } else {
//         dispatch(
//           login({
//             token: result.sessionToken,
//             username: result.username,
//             email: result.email,
//             name: result.name,
//           }),
//         );
//         storeData('token', result.sessionToken);
//         storeData('username', result.username);
//         storeData('password', password);
//       }
//     } catch (err) {
//       console.log('error', err);
//     }
//   }
// };
