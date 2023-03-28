import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData} from '../../utils/Asyncstorage';
import ChatHeader from '../header/ChatHeader';
import database from '@react-native-firebase/database';
import {useRoute} from '@react-navigation/native';

import moment from 'moment';
export default function Newchats() {
  const {params} = useRoute();
  const reciverUser = params.reciverUser;

  const [msg, setMsg] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [allChat, setAllChat] = useState([]);

  useEffect(() => {
    const onChildAdd = database()
      .ref('/messages/' + reciverUser?.roomId)
      .on('child_added', snapshot => {
        console.log('A new node has been added', snapshot.val());
        setAllChat(allChat => [snapshot.val(), ...allChat]);
      });
    return () =>
      database()
        .ref('/messages' + reciverUser?.roomId)
        .off('child_added', onChildAdd);
  }, [reciverUser.roomId]);

  const msgValid = txt => txt && txt.replace(/\s/g, '').length;

  const sendMsg = async () => {
    const user = await getData('loginData');
    if (msg == '' || msgValid(msg) == 0) {
      Alert.alert('Something Wrong...');
      return false;
    }
    let msgData = {
      roomId: reciverUser.roomId,
      message: msg,
      from: user?.id,
      to: reciverUser.id,
      sendTime: moment().format(),
      msgType: 'text',
    };

    const newReference = database()
      .ref('/messages/' + reciverUser.roomId)
      .push();

    msgData.id = newReference.key;
    newReference.set(msgData).then(() => {
      let chatlistupdate = {
        lastMsg: msg,
        sendTime: msgData.sendTime,
      };
      database()
        .ref('/chatlist/' + reciverUser.id + '/' + user.id)
        .update(chatlistupdate)
        .then(() => console.log('Data Updated'));

      database()
        .ref('/chatlist/' + user.id + '/' + reciverUser.id)
        .update(chatlistupdate)
        .then(() => console.log('Data Updated'));

      setMsg('');
      setDisabled(false);
    });
  };

  return (
    <View style={styles.container}>
      <ChatHeader name={reciverUser.name} />
      <FlatList
        style={{flex: 1, marginBottom: 70}}
        data={allChat}
        showsVerticalScrollIndicator={false}
        inverted
        keyExtractor={(item, index) => {
          index;
        }}
        renderItem={({item}) => {
          return (
            <View style={styles.itemContainer}>
              <Text
                style={{
                  paddingLeft: 5,
                  color: '#000',
                  fontSize: 13,
                }}>
                {item.message}
              </Text>
              <Text
                style={{
                  paddingLeft: 5,
                  color: '#595959',
                  fontSize: 11,
                }}>
                {moment(item.send_time).format('LLL')}
              </Text>
            </View>
          );
        }}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="type a message"
          placeholderTextColor={'black'}
          multiline={true}
          value={msg}
          onChangeText={val => setMsg(val)}
        />

        <TouchableOpacity disabled={disabled} onPress={sendMsg}>
          <Image
            source={require('../../img/send.png')}
            style={{height: 28, width: 28, marginTop: 2}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: 'orange',
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    minWidth: 80,
    maxWidth: '80%',
    paddingHorizontal:10,
    marginVertical: 5,
    paddingTop: 5,
    borderRadius: 8,
    flexDirection: 'column',
  },
  inputView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'orange',
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    justifyContent: 'space-evenly',
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: 'white',
    paddingHorizontal: 15,
    color: 'black',
  },
});
