import React, { Component } from 'react';
import { 
    StyleSheet
} from 'react-native';

import Background from '../components/background';
import Button from '../components/button';
import Logo from '../components/logo';
import Header from '../components/header';
import { theme } from '../core/theme'

const HomeScreen = ({ navigation }) => {
    return (
        <Background>
            <Logo />
            <Header>ScannerFriends</Header>
            <Button mode="contained" onPress={() => navigation.navigate('Login')}>
                Iniciar Sesion
            </Button>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('registroScreen')}
            >
            Registrarse
            </Button>
        </Background>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});