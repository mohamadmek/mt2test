import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '@react-navigation/native';
const SettingsRow = ({title, iconRight, iconLeft, navigateTo, color}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity onPress={() => navigateTo()}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: 'lightgrey',
          marginTop: 15,
          paddingBottom: 15,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          {color ? (
            <View
              style={{height: 20, width: 20, backgroundColor: colors.card}}
            />
          ) : null}

          <Text style={{color: colors.text, fontWeight: '600'}}>
            {color ? null : <Icon size={19} name={iconLeft} />}

            {'   '}
            {title}
          </Text>
        </View>
        <View>
          <Icon style={{color: colors.text}} name={iconRight} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SettingsRow;

const styles = StyleSheet.create({});
