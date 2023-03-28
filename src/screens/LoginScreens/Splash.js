import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import { getData } from '../../utils/Asyncstorage';
import {useNavigation} from '@react-navigation/native';

export default function Splash() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(async () => {
      const userData = await getData("loginData");
      if (userData) {
        navigation.navigate('Tabnavigator');
      } else {
        navigation.navigate('Login');
      }
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Chat App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: 'red',
  },
});
