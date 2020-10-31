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
import {changeIsDark} from '../../store/Application';
import {useSelector, useDispatch} from 'react-redux';
import SettingsRow from '../../components/SettingsRow';
import i18n from 'i18next';

const index = ({navigation}) => {
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

  return (
    <SafeAreaView backgroundColor={colors.card}>
      <Header title={i18n.t('setting')} arrow={false} />
      <ScrollView style={{backgroundColor: colors.background, padding: 15}}>
        <View>
          <Text
            style={{color: colors.text, fontWeight: '600', textAlign: 'left'}}>
            {i18n.t('theme_settings')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: 'lightgrey',
              paddingBottom: 10,
              marginTop: 10,
              paddingHorizontal: 10,
            }}>
            <View style={{justifyContent: 'center', marginTop: 5}}>
              <Text style={{color: colors.text, fontWeight: '500'}}>
                {i18n.t('dark_mode')}
              </Text>
            </View>
            <View>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>

          <SettingsRow
            navigateTo={() => navigateTo('ChangeTheme')}
            title={i18n.t('change_theme')}
            iconLeft={'facebook'}
            color={true}
            iconRight={'chevron-right'}
          />

          <SettingsRow
            navigateTo={() => navigateTo('ChangeLanguage')}
            title={i18n.t('change_language')}
            iconLeft={'globe-europe'}
            iconRight={'chevron-right'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
