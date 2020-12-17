import React, { Component } from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet 
} from 'react-native';

import TextInput from '../components/TextInput'
import Background from '../components/background'
import Logo from '../components/logo'
import Button from '../components/button'
import Header from '../components/header'
import { theme } from '../core/theme'

const loginScreen = ({ navigation }) => {
  return (
    <Background>
      <Logo></Logo>
      <Header>
        Bienvenido
      </Header>
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
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
          >
            <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained">
          Iniciar Sesion
        </Button>
        <View style={styles.row}>
          <Text>¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.replace('Registro')}>
            <Text style={styles.link}>Registrarse</Text>
          </TouchableOpacity>
      </View>
    </Background>
  );
}

export default loginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
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