//Importaciones de React
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet} from 'react-native';
import { Appbar } from 'react-native-paper'

//DATABASE
import firebase from './database/firebase'

//Importaciones de navegacion
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Importaciones locales
import Login from './screens/Main/Auth/loginScreen'
import ForgotPassword from './screens/Main/Auth/forgotPasswordScreen'
import Update from './screens/Main/updateScreen'
import Register from './screens/Main/storeScreen'

import Home  from './screens/homeScreen'
import StoreContact from './screens/Contacts/storeContactScreen'
import UpdateContact from './screens/Contacts/updateContactScreen'
import ViewContacts from './screens/Contacts/viewContactsScreen'
import MapContact from './screens/Contacts/mapContact'

//STYLES
import { theme } from './core/theme';

const Stack = createStackNavigator();

const HeaderNav = ({ scene, previous, navigation }) => {
  
  let options = scene.descriptor.options;
  let title = options.headerTitle !== undefined ? options.headerTitle : "";
  let hasAction = options.hasAction;

  if (hasAction) {
    let action_1 = options.action_1
    return (
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            options.logOut && options.logOut !== undefined
            ? firebase.firebase.auth()
              .signOut()
              .then(() => navigation.navigate('Home')) 
            : navigation.pop();
          }}
        />
        <Appbar.Content title={title} subtitle={title} /> 
        <Appbar.Action icon={action_1.icon}  onPress={() => {navigation.navigate(action_1.route)}}/>
      </Appbar.Header>
    );
  }


  return (
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => {
          options.logOut && options.logOut !== undefined
          ? firebase.firebase.auth()
            .signOut()
            .then(() => navigation.navigate('Home')) 
          : navigation.pop();
        }}
      />
      <Appbar.Content title={title} subtitle={title} /> 
    </Appbar.Header>
  );
};


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home" 
        headerMode="screen"
        screenOptions={{
          header: ({ scene, previous, navigation }) => (
            <HeaderNav scene={scene} previous={previous} navigation={navigation} />
          ),
        }}
      >
          <Stack.Screen 
            name="Home"
            component={Home} 
            options={{
              headerShown: false,
            }}/>

          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ headerTitle: 'Iniciar Sesión' }}/>
            
          <Stack.Screen
            name= "Register"
            component={Register}
            options={{ headerTitle: 'Nueva cuenta'}}/>   
          
          <Stack.Screen
            name= "Update"
            component={Update}
            options= {{
              back: true,
              headerTitle: 'Datos personales'
            }}/>   


          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options = {{
              headerTitle: 'Recuperación'
            }}
          />

          <Stack.Screen 
            name="ViewContacts"
            component={ViewContacts} 
            options={{
              headerTitle: 'Contactos',
              logOut: true,
              hasAction: true,
              action_1: {
                icon: 'plus',
                route: 'StoreContact'
              }
            }}
          />
          <Stack.Screen 
            name="StoreContact"
            component={StoreContact} 
            options= {{
              back: true,
              headerTitle: 'Nuevo contacto'
            }}
          />
          <Stack.Screen
            name="UpdateContact"
            component={UpdateContact}
            options = {{
              headerTitle: 'Editar contacto'
            }}
          />  
          <Stack.Screen
            name="MapContact"
            component={MapContact}
            options={{
              headerTitle: 'Dirección'
            }}
          />
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
