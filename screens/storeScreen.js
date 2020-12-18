import React, { Component } from 'react';
import { 
  View,
  TouchableOpacity,
  Text,
  StyleSheet 
} from 'react-native';

import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import Header from '../components/header'
import Button from '../components/button'
import Logo from '../components/logo'
import Background from '../components/background'


const storeScreen = ({ navigation }) => {
  return (
    <Background>
        <Logo></Logo>
        <Header>
          Crear una cuenta
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
          Crear cuenta
        </Button>
        <View style={styles.row}>
          <Text>¿Tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.link}>Iniciar Sesion</Text>
          </TouchableOpacity>
        </View>
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
});
export default storeScreen;