import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import {storeData} from '../../utils/Asyncstorage';
import auth from '@react-native-firebase/auth';
export default function SignUp() {
  const navigation = useNavigation();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [about, setAbout] = useState('');

  const submit = async () => {
    if (fullname == '' || email == '' || password == '') {
      Alert.alert('Fill in all fields');
      return false;
    }
    let data = {
      id: uuid.v4(),
      name: fullname,
      emailId: email,
      password: password,
      about: about,
      img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    };
    await auth().createUserWithEmailAndPassword(email, password);
    storeData('loginData', data);
    database()
      .ref('/users/' + data.id)
      .set(data)
      .then(() => {
        console.log('Data set.');
        setFullname('');
        setEmail('');
        setPassword('');
        setAbout('');
        navigation.navigate('Tabnavigator');
      });
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Create Account</Text>
        </View>
        <View style={styles.nameView}>
          <Image source={require('../../img/user.png')} style={styles.Img} />
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={fullname}
            onChangeText={text => {
              setFullname(text);
            }}
          />
        </View>
        <View style={[styles.emailView, styles.DataView]}>
          <Image
            source={require('../../img/email.png')}
            style={[styles.Img, {marginTop: 5}]}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
          />
        </View>
        <View style={[styles.passView, styles.DataView]}>
          <Image
            source={require('../../img/password.png')}
            style={styles.Img}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
          />
        </View>
        <View style={[styles.confirmPassView, styles.DataView]}>
          <Image
            source={require('../../img/about.png')}
            style={[styles.Img, {marginTop: 4}]}
          />
          <TextInput
            placeholder="About"
            style={styles.input}
            value={about}
            onChangeText={text => {
              setAbout(text);
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
              SignUp
            </Text>
            <Image
              source={require('../../img/arrow.png')}
              style={{height: 30, width: 30, marginTop: 2}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btnView}>
          <Text style={styles.btnText}>Already have an account ?</Text>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={[styles.btnText, {color: 'orange'}]}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 30,
  },
  headerContainer: {
    marginTop: 100,
  },
  headerText: {
    fontSize: 30,
    color: '#000',
  },
  nameView: {
    marginTop: 70,
  },
  Img: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: 5,
  },
  input: {
    borderBottomWidth: 1,
    paddingHorizontal: 40,
  },
  DataView: {
    marginTop: 30,
  },
  loginBtn: {
    backgroundColor: 'orange',
    marginTop: 30,
    borderRadius: 30,
    paddingHorizontal: 23,
    paddingVertical: 12,
    marginLeft: 150,
  },
  btnView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 65,
  },
  btnText: {
    fontSize: 16,
    color: '#000',
  },
  btnStyle: {
    paddingLeft: 5,
  },
});
