import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ThemeComponent = ({item, setCheckedTheme, checkTheme}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity onPress={() => setCheckedTheme(item.theme)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: 'lightgrey',
          paddingBottom: 10,
          paddingTop: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: item.dark.colors.card,
              width: 20,
              height: 20,
            }}
          />
          <Text style={{marginLeft: 10, fontSize: 16, color: colors.text}}>
            {item.theme}
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          {checkTheme == item.theme ? (
            <Icon style={{color: colors.text}} name="check" size={20} />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ThemeComponent;

const styles = StyleSheet.create({});
