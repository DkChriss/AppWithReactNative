//importaciones de react
import React, { Component, useState } from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet 
} from 'react-native';

//componentes
import TextInput from '../components/TextInput'
import Background from '../components/background'
import Logo from '../components/logo'
import Button from '../components/button'
import Header from '../components/header'
import { theme } from '../core/theme'

//Helpers
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'

const loginScreen = ({ navigation }) => {

  const[email, setEmail] = useState({value: '', error: ''});

  const[password, setPassword] = useState({value: '', error: ''})

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    } else {
      //ESPACIO PARA EL INICIAR SESION
    }
  }

  return (
    <Background>
      <Logo></Logo>
      <Header>
        Bienvenido
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
      <TextInput
        label="Contraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
          >
            <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <Button 
          mode="contained" 
          onPress={ onLoginPressed }>
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