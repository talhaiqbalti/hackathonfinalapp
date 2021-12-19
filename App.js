import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Auth from "./screens/auth"
import Home from './screens/home'
import Manager from './screens/manager';
import User from './screens/user';
import Forget from './screens/forgetpass';
import Apply from './screens/Apply';
import Waiting from './screens/Waiting';
import Accepted from './screens/Accepted';
import Reject from './screens/Reject';
import Profilecard from './screens/Profilecard';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



export default function App() {
  const Stack = createNativeStackNavigator();

  return(
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false
      }}
      >
        
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Manager" component={Manager} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Forget" component={Forget} />
        <Stack.Screen name="Apply" component={Apply} />
        <Stack.Screen name="Waiting" component={Waiting} />
        <Stack.Screen name="Accept" component={Accepted} />
        <Stack.Screen name="Reject" component={Reject} />
        <Stack.Screen name="Profilecard" component={Profilecard} />
        
      </Stack.Navigator>


    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
