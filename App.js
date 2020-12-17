//Importaciones de React
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { TextInput, Button, Text, Avatar } from 'react-native-paper';

//Importaciones de navegacion
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Importaciones locales
import Login from './screens/loginScreen';
import Home  from './screens/homeScreen';
import Registro from './screens/registroScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{
              headerShown: true,
              headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen 
          name="Home"
          component={Home} />
        <Stack.Screen 
          name="Login" 
          component={Login} />
        <Stack.Screen
          name= "Registro"
          component={Registro}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  title:{
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Fantasy-Copperplate',
    marginBottom: 20,
  },
  input: {
      marginBottom: 10,
      
  },
  avatar: {
    size: 50,
    alignContent: 'center'
  },
  
});
