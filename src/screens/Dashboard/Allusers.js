import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {getData, storeData} from '../../utils/Asyncstorage';
import uuid from 'react-native-uuid';

export default function Allusers() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getallUsres();
  }, []);

  const getallUsres = async () => {
    const userData = await getData('loginData');
    database()
      .ref('users/')
      .once('value')
      .then(snapshot => {
        console.log('all users data :', Object.values(snapshot.val()));
        setUsers(
          Object.values(snapshot.val()).filter(it => it.id != userData.id),
        );
        storeData('store', Object.values(snapshot.val()));
      });
  };

  const createChatList = async data => {
    const userData = await getData('loginData');
    console.log('userData', userData);

    let roomId = uuid.v4();
    let myData = {
      roomId,
      id: userData.id,
      name: userData.name,
      emailId: userData.emailId,
      lastMsg: '',
    };
    database()
      .ref('/chatlist/' + data.id + '/' + userData.id)
      .update(myData)
      .then(() => console.log('Data Updated'));

    delete data['password'];
    data.lastMsg = '';
    data.roomId = roomId;
    database()
      .ref('/chatlist/' + userData.id + '/' + data.id)
      .update(data)
      .then(() => console.log('Data Updated'));

    navigation.navigate('Newchats', {reciverUser: data});
  };
  return (
    <View style={{flex: 1, backgroundColor: 'gray'}}>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                createChatList(item);
              }}>
              <View style={styles.listContainer}>
                <Image
                  source={{uri: item.img}}
                  style={{height: 40, width: 40, marginTop: 18, marginLeft: 15}}
                />
                <View style={{marginTop: 3}}>
                  <Text style={[styles.listText]}>{item.name}</Text>
                  <Text style={[styles.listText]}>{item.about}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: '90%',
    height: 75,
    marginTop: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 7,
  },
  listText: {
    fontSize: 17,
    color: '#595959',
    paddingVertical: 3,
    borderRadius: 7,
    marginLeft: 20,
  },
});
