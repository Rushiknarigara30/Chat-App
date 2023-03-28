import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chat from '../screens/Dashboard/Chat';
import Profile from '../screens/Dashboard/Profile';
import {useNavigation, useRoute} from '@react-navigation/native';
const Tab = createBottomTabNavigator();
export default function Tabnavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <Image
                style={{height: 25, width: 25}}
                source={require('../img/chat.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <Image
                style={{height: 25, width: 25}}
                source={require('../img/profile.png')}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
