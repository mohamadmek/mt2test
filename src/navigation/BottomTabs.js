import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/index';
import Settings from '../screens/Settings/index';
import Location from '../screens/Location/index';
import UserDetails from '../screens/UserDetails/index';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import Auth from './Auth';
import {useTheme} from '@react-navigation/native';
import i18n from 'i18next';
import AsyncStorage from '@react-native-community/async-storage';
import Login from '../screens/Login/index';

const BottomTabs = () => {
  const {colors} = useTheme();
  const Tab = createBottomTabNavigator();
  const userInfo = useSelector((state) => state.entities.auth);
  const storeLanguage = useSelector(
    (state) => state.entities.application.storeLanguage,
  );
  const [lang, setLang] = useState('');

  const language = async () => {
    const value = await AsyncStorage.getItem('language');
    setLang(value);
  };

  useEffect(() => {
    language();
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.text,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Home"
        options={{
          title:
            lang == null ? 'Home' : lang == 'en' ? 'Home' : 'الصفحة الرئيسية',
          tabBarIcon: ({focused}) => (
            <Icon
              color={focused ? colors.text : 'grey'}
              name="home"
              size={22}
            />
          ),
        }}
        component={Home}
      />

      {userInfo.token != '' ? (
        <Tab.Screen
          options={{
            title:
              lang == null ? 'Profile' : lang == 'en' ? 'Profile' : 'الحساب',
            tabBarIcon: ({focused}) => (
              <Icon
                color={focused ? colors.text : 'grey'}
                name="user"
                size={22}
              />
            ),
          }}
          name="UserDetails"
          component={UserDetails}
        />
      ) : (
        <Tab.Screen
          options={{
            title:
              lang == null ? 'Login' : lang == 'en' ? 'Login' : 'تسجيل دخول',
            tabBarIcon: ({focused}) => (
              <Icon
                color={focused ? colors.text : 'grey'}
                name="user"
                size={22}
              />
            ),
          }}
          name="Login"
          component={Login}
        />
      )}

      <Tab.Screen
        name="Location"
        options={{
          title:
            lang == null ? 'Location' : lang == 'en' ? 'Location' : 'موقعك',
          tabBarIcon: ({focused}) => (
            <Icon
              color={focused ? colors.text : 'grey'}
              name="search-location"
              size={22}
            />
          ),
        }}
        component={Location}
      />

      <Tab.Screen
        name="Settings"
        options={{
          title: lang == null ? 'Settings' : lang == 'en' ? 'Settings' : 'ضبط',
          tabBarIcon: ({focused}) => (
            <Icon color={focused ? colors.text : 'grey'} name="cog" size={22} />
          ),
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default BottomTabs;
