import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Alert, TextInput, Button} from 'react-native';
import CustomButton from '../utils/CustomButton';
import GlobalStyle from '../utils/GlobalStyle';

export default function Home({navigation, route}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setName(user.Name);
          setPassword(user.Password);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    if (name.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        var user = {
          Name: name,
        };
        await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
        Alert.alert('Success!', 'Your data has been updated.');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={[styles.text]}>Welcome {name} !</Text>
      <Button
        title="Show/Hide password"
        onPress={() => setShouldShow(!shouldShow)}
      />
      {/*Here we will return the view when state is true 
        and will return false if state is false*/}
      {shouldShow ? (
        <Text style={styles.text}>
          Your password is:
          <Button
            title="***"
            onPress={() =>
              setShouldShow(!shouldShow) +
              Alert.alert(
                'Warning!',
                'Please don`t share your password with anyone!',
              )
            }>
            {shouldShow ? <Text style={styles.text}>{password}</Text> : null}
          </Button>
        </Text>
      ) : (
        <Text style={styles.text}>Your password is: {password}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={value => setName(value)}
      />
      <CustomButton
        title="Update"
        color="#ff7f00"
        onPressFunction={updateData}
      />
      <CustomButton
        title="Remove"
        color="#f40100"
        onPressFunction={removeData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 130,
    marginBottom: 10,
  },
});
