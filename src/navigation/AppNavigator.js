import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/LoginScreens/Login';
import SignUp from '../screens/LoginScreens/SignUp';
import Tabnavigator from '../navigation/Tabnavigator';
import Splash from '../screens/LoginScreens/Splash';
import Newchats from '../screens/Dashboard/Newchats';
import Allusers from '../screens/Dashboard/Allusers';
import EditProfile from '../screens/Dashboard/EditProfile';

const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tabnavigator"
          component={Tabnavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Newchats"
          component={Newchats}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Allusers"
          component={Allusers}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
