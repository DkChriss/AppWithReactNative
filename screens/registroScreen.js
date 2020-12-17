import React, { Component } from 'react';
import { 
  View,
  StyleSheet 
} from 'react-native';

import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import Header from '../components/header'
import Button from '../components/button'

const registroScreen = ({ navigation }) => {
  return (
    <View style={styleRegister.fondo}>
      <View style={styleRegister.container}>
        <Header>
          Registrarse
        </Header>
        <TextInput
          label="Nombre"
          returnKeyType="done"
          value=""
          onChangeText=""
          error=""
          errorText=""
          secureTextEntry
        />
        <TextInput
          label="Apellido"
          returnKeyType="done"
          value=""
          onChangeText=""
          error=""
          errorText=""
          secureTextEntry
        />
        <TextInput
          label="Apodo"
          returnKeyType="done"
          value=""
          onChangeText=""
          error=""
          errorText=""
          secureTextEntry
        />
        <TextInput
          label="Correo electronico"
          returnKeyType="next"
          value=""
          onChangeText=""
          error=""
          errorText=""
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Contraseña"
          returnKeyType="done"
          value=""
          onChangeText=""
          error=""
          errorText=""
          secureTextEntry/>

        <TextInput
          label="Confirmar Contraseña"
          returnKeyType="done"
          value=""
          onChangeText=""
          error=""
          errorText=""
          secureTextEntry/>

        <Button mode="contained">
          Registrarse
        </Button>
      </View>
    </View>
  );
}
const styleRegister = StyleSheet.create({
  fondo: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.surface,
  },
  container: {
      flex: 1,
      padding: 20,
      width: '100%',
      maxWidth: 340,
      alignSelf: 'center',
      alignItems: 'center',
  },
  text: {
    flex: 2,
    width: '100%',
  }
});
export default registroScreen;