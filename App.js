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
import Login from './screens/loginScreen';
import Home  from './screens/homeScreen';
import Register from './screens/storeScreen'
import RegistroContacto from './screens/registerContactScreen';
import ViewContacts from './screens/viewContactsScreen';
import ForgotPassword from './screens/forgotPasswordScreen';
import { theme } from './core/theme';

const Stack = createStackNavigator();

const HeaderNav = ({ scene, previous, navigation }) => {
  
  let options = scene.descriptor.options;
  let title = options.headerTitle !== undefined ? options.headerTitle : "";

  

  return (
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => {
          options.logOut && options.logOut !== undefined
          ? options.back 
          : firebase.firebase.auth()
            .signOut()
            .then(() => navigation.navigate('Home'))
        }}
      />
      <Appbar.Content title={title} subtitle="" /> 
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
            options={{ headerTitle: '' }}/>
            
          <Stack.Screen
            name= "Register"
            component={Register}
            options={{ headerTitle: ''}}/>            
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
          />
          <Stack.Screen 
            name="ViewContacts"
            component={ViewContacts} 
            options={{
              logOut: true
            }}
          />
          <Stack.Screen 
            name="RegistroContacto"
            component={RegistroContacto} 
            options= {{
              back: true,
              headerTitle: "Nuevo Contacto"
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
