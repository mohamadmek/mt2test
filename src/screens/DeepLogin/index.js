import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../../store/Auth';
import Global from '../../utils/Global';
import AsyncStorage from '@react-native-community/async-storage';

const index = ({navigation, route}) => {
  const dispatch = useDispatch();

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${Global.apiURL}/login?username=${route.params.username}&password=${route.params.password}`,
        {
          headers: {
            'X-Parse-Application-Id': Global.appID,
            Authorization: 'application/json',
          },
        },
      );
      const result = await response.json();

      if (result.error) {
        alert('login failed');
      } else {
        dispatch(
          login({
            token: result.sessionToken,
            username: result.username,
            email: result.email,
            name: result.name,
          }),
        );
        storeData('token', result.sessionToken);
        storeData('username', result.username);
        storeData('password', route.params.password);
        navigation.navigate('UserDetails');
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
