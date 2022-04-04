import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function FlexExample() {
  return (
    <View style={styles.body}>
      <View style={styles.header_2}></View>
      <View style={styles.header_3}></View>
      <View style={styles.header_1}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ff0',
    //justifyContent: 'space-around',
    //justifyContent: 'space-between',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  header_1: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  header_2: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  header_3: {
    width: 100,
    height: 100,
    backgroundColor: '#00ff00',
  },
});
