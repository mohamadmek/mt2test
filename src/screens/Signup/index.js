import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {login} from '../../store/Auth';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation, useTheme} from '@react-navigation/native';
import i18n from 'i18next';
import Header from '../../components/Header';

export default function Signup({navigation}) {
  const {colors} = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {height, width} = Dimensions.get('window');
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {}, []);

  const signup = async () => {
    if (
      username.trim() == '' ||
      email.trim() == '' ||
      password.trim() == '' ||
      repassword.trim() == '' ||
      name.trim() == ''
    ) {
      alert('All fields are required');
    } else if (password != repassword) {
      alert('Passwords does not match');
    } else {
      setLoading(true);
      try {
        const response = await fetch(`${Global.apiURL}/users`, {
          method: 'POST',
          headers: {
            'X-Parse-Application-Id': Global.appID,
            Authorization: 'application/json',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            name: name,
            email: email,
            password: password,
          }),
        });
        const result = await response.json();
        if (result.error) {
          setLoading(false);
          alert(result.error);
        } else {
          dispatch(
            login({
              username: username,
              token: result.sessionToken,
              name: name,
              email: email,
            }),
          );
          storeData('token', result.sessionToken);
          storeData('username', username);
          storeData('password', password);
          setUsername('');
          setEmail('');
          setPassword('');
          setRepassword('');
          setName('');
          setLoading(false);
          navigation.navigate('Home');
        }
      } catch (err) {
        console.log('error', err);
      }
    }
  };

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

  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.card, flex: 0}} />
      <Header title={i18n.t('sign_up')} arrow={false} />
      {/* <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}> */}
      <ScrollView style={{height: Dimensions.get('window').height}}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.inputs}
          />
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.inputs}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.inputs}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.inputs}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Repassword"
            secureTextEntry
            value={repassword}
            onChangeText={(text) => setRepassword(text)}
            style={styles.inputs}
            autoCapitalize="none"
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableWithoutFeedback onPress={() => signup()}>
            <View style={styles.loginButton}>
              <Text style={styles.buttonLoginText}>{i18n.t('sign_up')}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
          <View style={styles.signupContainer}>
            <Text style={styles.signuptext}>{i18n.t('login')}</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
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
            It may take up to 1 min Max to Signup because everything is on
            heroku and I'm using parse Just for the first time
          </Text>
          <ActivityIndicator size="large" color={colors.card} />
        </View>
      ) : null}
    </>
  );
}
