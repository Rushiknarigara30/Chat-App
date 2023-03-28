import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const ChatHeader = ({name}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'gray'}
        translucent={false}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../img/back.png')}
          style={{
            height: 30,
            width: 30,
            marginHorizontal: 10,
          }}
        />
      </TouchableOpacity>
      <View style={{flex: 1, marginLeft: 10}}>
        <Text
          numberOfLines={1}
          style={{
            color: 'white',
            fontSize: 16,
            textTransform: 'capitalize',
          }}>
          {name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: 'orange',
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

//make this component available to the app
export default ChatHeader;
