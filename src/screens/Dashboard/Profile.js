import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {clearAsyncStorage, getData} from '../../utils/Asyncstorage';
import auth from '@react-native-firebase/auth';
export default function Profile() {
  const navigation = useNavigation();

  const [user, setUser] = useState('');
  useEffect(() => {
    getuserdata();
  }, []);

  const getuserdata = async () => {
    const userData = await getData('loginData');
    setUser(userData);
  };

  const logOutData = () => {
    Alert.alert('Logout', 'Are you sure to logout', [
      {text: 'Yes', onPress: () => logout()},
      {text: 'No'},
    ]);
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.replace('Login');
        clearAsyncStorage()
          .then(() => {})
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          style={{height: 80, width: 80, alignSelf: 'center'}}
          source={{uri: user.img}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 40,
          }}>
          <Text style={styles.profileTxt}>Name : {user.name} </Text>
          <Text style={styles.profileTxt}>About : {user.about} </Text>
        </View>
        <Text style={[styles.profileTxt, {marginTop: 8}]}>
          EmailAddress : {user.emailId}
        </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          {/* <TouchableOpacity
            style={{
              alignSelf: 'center',
              marginTop: 40,
              backgroundColor: 'orange',
              borderRadius: 5,
            }}
            onPress={() => {
              navigation.navigate('EditProfile');
            }}>
            <Text
              style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
                fontSize: 17,
                color: '#fff',
              }}>
              Edit Profile
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              marginTop: 100,
              backgroundColor: 'orange',
              borderRadius: 5,
            }}
            onPress={() => {
              logOutData();
            }}>
            <Text
              style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
                fontSize: 17,
                color: '#fff',
              }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 25,
    color: '#000',
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  profileContainer: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  profileTxt: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
});
