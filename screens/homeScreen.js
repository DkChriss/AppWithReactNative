import React, { Component } from 'react';
import { 
    StyleSheet
} from 'react-native';

//Componentes
import BackgroundLogin from '../components/backgroundLogin';
import Button from '../components/button';
import Logo from '../components/logo';
import Header from '../components/header';

//Styles
import { theme } from '../core/theme'

const HomeScreen = ({ navigation }) => {
    return (
        <BackgroundLogin>
            <Logo />
            <Header>ScannerFriends</Header>
            <Button mode="contained" onPress={() => navigation.navigate('Login')}>
                Iniciar Sesion
            </Button>
            <Button mode="outlined" onPress={() => navigation.navigate('Register')}>
                Registrarse
            </Button>
        </BackgroundLogin>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});