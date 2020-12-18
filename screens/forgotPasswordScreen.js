import React, { Component,  useState } from 'react';
import { 
    Text,
} from 'react-native';

import TextInput from '../components/TextInput'
import Header from '../components/header'
import Button from '../components/button'
import Logo from '../components/logo'
import Background from '../components/background'

//Helpers
import { emailValidator } from '../helpers/emailValidator';


const forgotPasswordScreen = ({ navigation }) => {
  const[email, setEmail] = useState({value: '', error: ''});


  const onSendPressed = () => {
    const emailError = emailValidator(email.value)

    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    } else {
      //ESPACIO PARA ENVIAR CONTRASEÑA A SU CORREO
    }
  }
  return (
    <Background>
        <Logo></Logo>
        <Header>
            Recupera tu cuenta
        </Header>
        <Text>
            Ingresa tu correo electrónico para buscar tu cuenta.
        </Text>
        <TextInput
            label="Correo electronico"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({value: text, error: ''})}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
        />
        <Button mode="contained"
          onPress={ onSendPressed }>
           Enviar
        </Button>
    </Background>
  );
}
export default forgotPasswordScreen;