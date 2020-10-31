/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, StatusBar, SafeAreaView} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './navigation/Main';
import Global from './utils/Global';
import {configureStore} from '@reduxjs/toolkit';
import reducer from './store/reducer';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

const App = () => {
  const store = configureStore(
    {reducer},
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
