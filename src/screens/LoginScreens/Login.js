import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {storeData} from '../../utils/Asyncstorage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    await auth().signInWithEmailAndPassword(email,password)
    database()
      .ref('users/')
      .orderByChild('emailId')
      .equalTo(email)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() == null) {
          Alert.alert('Invalid email and password');
          return false;
        }
        let userData = Object.values(snapshot.val())[0];
        storeData('loginData', userData);
        if (userData?.password != password) {
          Alert.alert('Invalid email and password');
          return false;
        }
        console.log('user data :', userData);
        navigation.navigate('Tabnavigator');
        console.log('Login Sucessfully');
      });
  };

  return (
    <View style={styles.contianer}>
      <View style={styles.loginView}>
        <Text style={styles.headerText}>Login</Text>
        <Text style={styles.mainText}>Please Sign in to continue</Text>
      </View>
      <View style={{marginTop: 60}}>
        <Image
          source={require('../../img/email.png')}
          style={[styles.imgStyle, {top: 8}]}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="EMAIL"
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
        />
      </View>
      <View style={{marginTop: 10}}>
        <Image
          source={require('../../img/password.png')}
          style={[styles.imgStyle, {position: 'absolute', left: 0}]}
        />
        <TextInput
          style={[styles.inputStyle]}
          placeholder="PASSWORD"
          secureTextEntry={true}
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
        />
      </View>
      <View style={styles.loginBtn}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignSelf: 'center'}}
          onPress={() => {
            submit();
          }}>
          <Text style={{color: '#fff', marginRight: 30, fontSize: 20}}>
            Login
          </Text>
          <Image
            source={require('../../img/arrow.png')}
            style={{height: 30, width: 30, marginTop: 2}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.btnView}>
        <Text style={styles.btnText}>Don't have an account ?</Text>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={[styles.btnText, {color: 'orange'}]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contianer: {
    margin: 30,
  },
  loginView: {
    marginTop: 120,
  },
  headerText: {
    fontSize: 38,
    color: '#000',
    fontWeight: '700',
  },
  mainText: {
    fontSize: 17,
    marginTop: 10,
  },
  imgStyle: {
    height: 30,
    width: 30,
    position: 'absolute',
    left: 0,
    top: 5,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingLeft: 40,
  },
  loginBtn: {
    backgroundColor: 'orange',
    marginTop: 30,
    borderRadius: 30,
    paddingHorizontal: 23,
    paddingVertical: 12,
    marginLeft: 160,
  },
  btnView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 185,
  },
  btnText: {
    fontSize: 16,
    color: '#000',
  },
  btnStyle: {
    paddingLeft: 5,
  },
});
