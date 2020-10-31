import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import Header from '../../components/Header';
import {useTheme} from '@react-navigation/native';
import {changeIsDark, setStoreLanguage} from '../../store/Application';
import {useSelector, useDispatch} from 'react-redux';
import {ThemeSupport} from '../../utils/theme';
import LanguageComponent from '../../components/LanguageComponent';
import {BaseSetting, reloadLocale} from '../../utils/Settings';
import i18n from 'i18next';
import AsyncStorage from '@react-native-community/async-storage';

const ChangeLanguage = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  console.log(route);

  // const [languageSelected, setLanguageSelected] = useState(i18n.language);
  const toggleSwitch = () => {
    dispatch(changeIsDark());
    setIsEnabled((previousState) => !previousState);
  };

  const navigateTo = (name) => {
    navigation.navigate(name);
  };
  const selectedLanguage = useSelector(
    (state) => state.entities.application.storeLanguage,
  );
  const [checkedLanguage, setCheckedLanguage] = useState(i18n.language);

  const _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  };

  const onSave = () => {
    const oldLanguage = i18n.language;
    dispatch(setStoreLanguage({language: checkedLanguage}));
    i18n.changeLanguage(checkedLanguage);
    _storeData('language', checkedLanguage);
    setTimeout(() => {
      reloadLocale(oldLanguage, checkedLanguage);
      // navigation.navigate('Home');
      // navigation.navigate('Settings');
    }, 500);
  };

  return (
    <SafeAreaView backgroundColor={colors.card}>
      <Header onSave={onSave} title={i18n.t('change_language')} save={true} />
      <ScrollView style={{backgroundColor: colors.background, padding: 15}}>
        {BaseSetting.languageSupport.map((lang, index) => (
          <LanguageComponent
            checkedLanguage={checkedLanguage}
            setCheckedLanguage={setCheckedLanguage}
            key={index}
            item={lang}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangeLanguage;

const styles = StyleSheet.create({});
