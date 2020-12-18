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

const viewContactsScreen = ({ navigation }) => {
  return (
    <Background>
        <Logo></Logo>
        <Header>
            Registro de Contactos
        </Header>
        
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
export default viewContactsScreen;