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
import {changeIsDark, setTheme} from '../../store/Application';
import {useSelector, useDispatch} from 'react-redux';
import {ThemeSupport} from '../../utils/theme';
import ThemeComponent from '../../components/ThemeComponent';
import i18n from 'i18next';

const ChangeTheme = ({navigation}) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    dispatch(changeIsDark());
    setIsEnabled((previousState) => !previousState);
  };

  const navigateTo = (name) => {
    navigation.navigate(name);
  };
  const selectedTheme = useSelector(
    (state) => state.entities.application.theme,
  );
  const [checkTheme, setCheckedTheme] = useState(selectedTheme);

  const onSave = () => {
    dispatch(setTheme({theme: checkTheme}));
  };

  return (
    <SafeAreaView backgroundColor={colors.card}>
      <Header onSave={onSave} title={i18n.t('change_theme')} save={true} />
      <ScrollView style={{backgroundColor: colors.background, padding: 15}}>
        {ThemeSupport.map((theme, index) => (
          <ThemeComponent
            checkTheme={checkTheme}
            setCheckedTheme={setCheckedTheme}
            key={index}
            item={theme}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangeTheme;

const styles = StyleSheet.create({});
