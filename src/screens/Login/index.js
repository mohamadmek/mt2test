import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Global from '../../utils/Global';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation, useTheme} from '@react-navigation/native';
import store from '../../App';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../../store/Auth';
import i18n from 'i18next';
import Header from '../../components/Header';

export default function Login() {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [username, setUsername] = useState('test');
  const [password, setPassword] = useState('test');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {height, width} = Dimensions.get('window');

  const styles = StyleSheet.create({
    inputContainer: {
      alignItems: 'center',
    },
    inputs: {
      borderWidth: 1,
      borderColor: '#ccc',
      height: 40,
      width: Dimensions.get('window').width - 40,
      marginVertical: 10,
      paddingLeft: 10,
      backgroundColor: '#fff',
    },
    loginButton: {
      alignItems: 'center',
      backgroundColor: colors.card,
      height: 50,
      width: Dimensions.get('window').width - 40,
      justifyContent: 'center',
    },
    buttonLoginText: {
      color: colors.text,
      fontWeight: 'bold',
      fontSize: 15,
    },
    signupContainer: {
      alignItems: 'flex-start',
      paddingLeft: 20,
    },
    signuptext: {
      fontWeight: 'bold',
      fontSize: 15,
      marginRight: 20,
      marginTop: 15,
      color: colors.text,
    },
  });

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  const handleLogin = async () => {
    if (username.trim() == '' || password.trim() == '') {
      alert('All fields are required');
    } else {
      setLoading(true);
      try {
        const response = await fetch(
          `${Global.apiURL}/login?username=${username}&password=${password}`,
          {
            headers: {
              'X-Parse-Application-Id': Global.appID,
              Authorization: 'application/json',
            },
          },
        );
        const result = await response.json();

        if (result.error) {
          setLoading(false);
          alert(result.error);
        } else {
          dispatch(
            login({
              token: result.sessionToken,
              username: result.username,
              email: result.email,
              name: result.name,
            }),
          );
          storeData('token', result.sessionToken);
          storeData('username', result.username);
          storeData('password', password);
        }
        setLoading(false);
      } catch (err) {
        console.log('error', err);
      }
    }
  };
  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.card, flex: 0}} />
      <Header title={i18n.t('login')} arrow={false} />
      <ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            autoCapitalize="none"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.inputs}
          />
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.inputs}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableWithoutFeedback onPress={() => handleLogin()}>
            <View style={styles.loginButton}>
              <Text style={styles.buttonLoginText}>{i18n.t('login')}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Signup')}>
          <View style={styles.signupContainer}>
            <Text style={styles.signuptext}>{i18n.t('sign_up')}</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      {loading ? (
        <View
          style={{
            width: width,
            height: height,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            position: 'absolute',
            zIndex: 100,
            elevation: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{textAlign: 'center', color: colors.text, marginBottom: 20}}>
            It may take up to 1 min Max to login because everything is on heroku
            and I'm using parse Just for the first time
          </Text>
          <ActivityIndicator size="large" color={colors.card} />
        </View>
      ) : null}
      {/* // </SafeAreaView> */}
    </>
  );
}
