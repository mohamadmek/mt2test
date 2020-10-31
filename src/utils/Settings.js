import ReactNative, {I18nManager} from 'react-native';
import i18n from 'i18next';
import RNRestart from 'react-native-restart';

/**
 * Basic Setting Variables Define
 */
export const BaseSetting = {
  name: 'Test',
  displayName: 'Test',
  appVersion: '1.0.0',
  defaultLanguage: 'en',
  languageSupport: ['en', 'ar'],
  resourcesLanguage: {
    en: {
      translation: require('../lang/en.json'),
    },
    ar: {
      translation: require('../lang/ar.json'),
    },
  },
};

export const languageFromCode = (code) => {
  switch (code) {
    case 'en':
      return 'English';
    case 'ar':
      return 'Arabic';

    default:
      return 'Unknown';
  }
};

export const isLanguageRTL = (code) => {
  switch (code) {
    case 'ar':
      return true;
    default:
      return false;
  }
};

export const reloadLocale = (oldLanguage, newLanguage) => {
  const oldStyle = isLanguageRTL(oldLanguage);
  const newStyle = isLanguageRTL(newLanguage);
  if (oldStyle != newStyle) {
    i18n.changeLanguage(newLanguage);
    I18nManager.forceRTL(newStyle);
    RNRestart.Restart();
  }
};
