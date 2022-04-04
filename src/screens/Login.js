import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TextInput, Alert} from 'react-native';
import CustomButton from '../utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyle from '../utils/GlobalStyle';

export default function Login({navigation}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          navigation.navigate('Home');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    if (name.length == 0 || password.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else if (!isNaN(name) || !isNaN(password)) {
      Alert.alert('Warning!', 'Name or Password can not contain only numbers!');
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } else {
      try {
        var user = {
          Name: name,
          Password: password,
        };
        await AsyncStorage.setItem('UserData', JSON.stringify(user));
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const offlineLogin = () => {
    navigation.navigate('OffHome');
  };

  const Flex_example = () => {
    navigation.navigate('FlexExample');
  };

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>ORIJANTI APP</Text>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2019/06/13/13/06/monster-4271569_1280.png',
        }}
      />
      <Text style={[GlobalStyle.CustomFont, styles.text]}>Welcome WELCOME</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name: "
        onChangeText={value => setName(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password: "
        onChangeText={value => setPassword(value)}
        secureTextEntry
      />
      <CustomButton title="Login" color="#1eb900" onPressFunction={setData} />
      <CustomButton
        title="OfflineLogin"
        color="#1eb900"
        onPressFunction={offlineLogin}
      />

      <CustomButton
        title="Flex"
        color="#1eb900"
        onPressFunction={Flex_example}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0080ff',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
    margin: 30,
  },
  input: {
    height: 30,
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
});
