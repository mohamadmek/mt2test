import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import i18n from 'i18next';

const Header = ({title, arrow, save, onSave}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      backgroundColor: colors.card,
      paddingBottom: 15,
      paddingTop: 5,
      flexDirection: 'row',
      paddingHorizontal: 15,
      // justifyContent: 'center',
      // backgroundColor: 'red',
    },
    title: {
      color: colors.text,
      fontWeight: 'bold',
      fontSize: 17,
      alignSelf: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={{width: '10%'}}>
        {arrow == false ? null : (
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={22}
            color={colors.text}
          />
        )}
      </View>
      <View style={{alignSelf: 'center', width: '80%'}}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {save ? (
        <TouchableOpacity onPress={() => onSave()}>
          <View>
            <Text style={{fontSize: 17, color: colors.text, fontWeight: '500'}}>
              {i18n.t('save')}
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;
