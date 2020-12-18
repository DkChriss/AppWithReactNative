//Importaciones de React
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

//Importaciones de navegacion
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Importaciones locales
import Login from './screens/loginScreen';
import Home  from './screens/homeScreen';
import Register from './screens/storeScreen'
import RegistroContacto from './screens/registerContactScreen';
import ViewContacts from './screens/viewContactsScreen';

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
            name= "Register"
            component={Register}/>
          
          <Stack.Screen 
            name="RegistroContacto"
            component={RegistroContacto} />

          <Stack.Screen 
            name="ViewContacts"
            component={ViewContacts} />
         
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
});
