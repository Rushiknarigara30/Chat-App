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
import {getData} from '../../utils/Asyncstorage';
export default function Chat() {
  const navigation = useNavigation();

  const [chatlist, setChatlist] = useState([]);

  useEffect(() => {
    getChatList();
  }, []);

  const getChatList = async () => {
    const userList = await getData('loginData');
    database()
      .ref('/chatlist/' + userList?.id)
      .on('value', snapshot => {
        // console.log('User data: ', Object.values(snapshot.val()));
        if (snapshot.val() != null) {
          setChatlist(Object.values(snapshot.val()));
        }
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'gray'}}>
      <View
        style={{
          marginTop: 10,
          marginLeft:30
        }}>
        <Text
          style={{
            fontSize: 20,
            color: '#000',
            fontWeight: '600',
            letterSpacing: 0.5,
          }}>
          Recent Chatlist
        </Text>
      </View>
      <FlatList
        data={chatlist}
        renderItem={({item}) => {
          return (
            <View style={styles.listContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Newchats', {reciverUser: item});
                }}>
                <Text style={styles.chatlist}>{item.name}</Text>
                <Text style={styles.chatlist}>{item.lastMsg}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={{position: 'absolute', bottom: 15, right: 30}}
        onPress={() => {
          navigation.navigate('Allusers');
        }}>
        <Image
          style={{height: 35, width: 35}}
          source={require('../../img/group.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: '90%',
    marginTop: 30,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 7,
  },
  chatlist: {
    fontSize: 16,
    paddingVertical: 5,
    borderRadius: 7,
    marginLeft: 20,
    color:'#000'
  },
});
