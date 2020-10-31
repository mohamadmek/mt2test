import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  SafeAreaView,
  PermissionsAndroid,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Global from '../../utils/Global';
import {useSelector, useDispatch} from 'react-redux';
import {setProducts, deleteProduct} from '../../store/Products';
import Product from '../../components/Product';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {useTheme} from '@react-navigation/native';
import i18n from 'i18next';
import Header from '../../components/Header';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

export default function Home({navigation}) {
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const {width, height} = Dimensions.get('window');
  const [lang, setLang] = useState('en');

  const language = async () => {
    const value = await AsyncStorage.getItem('language');
    setLang(value);
  };

  useEffect(() => {
    language();
  }, []);

  const options = {
    title: 'Select Photo',
    // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const cameraPicker = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'We need your permission',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      }
    }

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data};
        setImage(source.uri);
      }
    });
  };

  return (
    <SafeAreaView backgroundColor={colors.card}>
      <Header
        title={lang == null || lang == 'en' ? 'Home' : 'الصفحة الرئيسية'}
        arrow={false}
      />

      <ScrollView style={{backgroundColor: colors.background}}>
        {image != '' ? (
          <Image source={{uri: image}} style={{width: width, height: 300}} />
        ) : null}
        <TouchableOpacity onPress={() => cameraPicker()}>
          <View
            style={{
              backgroundColor: colors.card,
              width: 150,
              height: 49,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 15,
            }}>
            <Text style={{color: colors.text}}>
              {lang == null || lang == 'en' ? 'Choose an image' : 'اختر صورة'}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
