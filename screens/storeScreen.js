//Importaciones de react
import React, { Component, useState } from 'react';
import { 
  View,
  TouchableOpacity,
  Text,
  StyleSheet, 
  ScrollView, 
 
} from 'react-native';


//Importaciones Locales
import { theme } from '../core/theme'

//Importaciones de Componentes
import TextInput from '../components/TextInput'
import Header from '../components/header'
import Button from '../components/button'
import Logo from '../components/logo'
import Background from '../components/background'

//Importaciones de Helpers
import { textValidator } from '../helpers/textValidator'
import { equalPasswordValidator } from '../helpers/equalPasswordValidator'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'

//Importacion de Firebase

import firebase from '../database/firebase'

const storeScreen = ({ navigation }) => {

  const[name, setName] = useState({value: '', error: ''})
  const[lastname, setLastName] = useState({value: '', error: ''})
  const[nickname, setNickName] = useState({value: '', error: ''})
  const[email, setEmail] = useState({value: '', error: ''})
  const[password, setPassword] = useState({value: '', error: ''})
  const[equalPassword, setEqualPassword] = useState({value: '', error: ''})

  const storeNewUser = () => {
    try {
      //SAVE IN USERS
      firebase.firebase.auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(cred => {
        //SAVE IN DATABASE
        firebase.db.collection('users').doc(cred.user.uid).set({
          name: name.value,
          lastname: lastname.value,
          nickname: nickname.value
        })
        
        //REDIRECCIONAR
        navigation.navigate('ViewContacts')
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          setEmail({...email, error: "Credenciales incorrectas"})
          setPassword({...password, error: "Credenciales incorrectas"})
        }
        if (error.code === 'auth/email-already-in-use') {
          setEmail({...email, error: "Este correo se encuentra registrado"})
        }
      }); 
    } catch (error) {
      console.log(error);
    }
  }


  const onStorePressed = () => {
    
    const nameError = textValidator(name.value, 'nombre')
    const lastnameError = textValidator(lastname.value, 'apellido')
    const nicknameError = textValidator(nickname.value, 'apodo')
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const equalPasswordError = equalPasswordValidator(equalPassword.value, password.value)
  
    if (
      nameError || lastnameError ||
      nicknameError || emailError || 
      passwordError || equalPasswordError
    ) {
      setName({ ...name, error: nameError })
      setLastName({ ...lastname, error: lastnameError })
      setNickName({ ...nickname, error: nicknameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setEqualPassword({ ...equalPassword, error:equalPasswordError })
      return;
    }
    

    storeNewUser();
  }


  return (
    
    <Background>
      <ScrollView  style={styles.scrollView}> 
        <Logo></Logo>
        <Header>
          Crear una cuenta
        </Header>
        <TextInput
          label="Nombre"
          returnKeyType="done"
          value={name.value}
          onChangeText={
            (text) => setName({
              value: text,
              error: ''
            })
          }
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="Apellido"
          returnKeyType="done"
          value={lastname.value}
          onChangeText={
            (text) => setLastName({
              value: text,
              error: ''
            })
          }
          error={!!lastname.error}
          errorText={lastname.error}
        />
        <TextInput
          label="Apodo"
          returnKeyType="done"
          value={nickname.value}
          onChangeText={
            (text) => setNickName({
              value: text,
              error: ''
            })
          }
          error={!!nickname.error}
          errorText={nickname.error}
        />
        <TextInput
          label="Correo electronico"
          returnKeyType="done"
          value={email.value}
          onChangeText={
            (text) => setEmail({
              value: text,
              error: ''
            })
          }
          error={!!email.error}
          errorText={email.error}
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Contraseña"
          returnKeyType="done"
          value={password.value}
          onChangeText={
            (text) => setPassword({
              value: text,
              error: ''
            })
          }
          error={!!password.error}
          errorText={password.error}
          secureTextEntry/>

        <TextInput
          label="Confirmar Contraseña"
          returnKeyType="done"
          value={equalPassword.value}
          onChangeText={
            (text) => setEqualPassword({
              value: text,
              error: ''
            })
          }
          error={!!equalPassword.error}
          errorText={equalPassword.error}
          secureTextEntry/>

        <Button 
          mode="contained"
          onPress={ onStorePressed }>
          Crear cuenta
        </Button>
        <View style={styles.row}>
          <Text>¿Tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.link}>Iniciar Sesion</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
    </Background>
    
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  scrollView: {
    marginHorizontal: 0,
  },
});
export default storeScreen;