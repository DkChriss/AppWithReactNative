import React, { Component,  useState } from 'react';
import { 
    Text,
} from 'react-native';

//Componentes
import TextInput from '../../../components/TextInput'
import Header from '../../../components/header'
import Button from '../../../components/button'
import Logo from '../../../components/logo'
import Background from '../../../components/background'
import firebase from '../../../database/firebase'

//Helpers
import { emailValidator } from '../../../helpers/emailValidator';


const forgotPasswordScreen = ({ navigation }) => {
  const[email, setEmail] = useState({value: '', error: ''});


  const onSendPressed = () => {
    const emailError = emailValidator(email.value)

    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    } else {
      var auth = firebase.firebase.auth();
      var emailAddress = email.value;
      
      auth.sendPasswordResetEmail(emailAddress).then(function() {
        console.log("funciona");
      }).catch(function(error) {
          setEmail({ ...email, error: "Ingrese un correo existente" })
      });
    }
  }
  return (
    <Background>
        <Logo></Logo>
        <Header>
            Recupera tu cuenta
        </Header>
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