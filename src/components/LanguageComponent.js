import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {languageFromCode} from '../utils/Settings';

const LanguageComponent = ({item, checkedLanguage, setCheckedLanguage}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity onPress={() => setCheckedLanguage(item)}>
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
          <Text style={{marginLeft: 10, fontSize: 16, color: colors.text}}>
            {languageFromCode(item)}
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          {checkedLanguage == item ? (
            <Icon style={{color: colors.text}} name="check" size={20} />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LanguageComponent;

const styles = StyleSheet.create({});
