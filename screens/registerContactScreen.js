import React,{ Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import {Avatar,  ImageBackground} from 'react-native-paper'
import { TouchableHighlight } from 'react-native-gesture-handler'
import TextInput from '../components/TextInput';
import Button from '../components/button';
import Background from '../components/background';
import { block } from 'react-native-reanimated';
import { theme } from '../core/theme'


const registerContactScreen = () =>{
   return(
    <Background> 
    <View style={styles.container}>
    <Image source={require('../images/user.jpg')} style={styles.image} />    
        <Text style={styles.text}
        > Contacto Nuevo</Text>
        <TextInput
        label="Nombre"/>
        <TextInput
        padding='0' label="Apellido"/>
        <TextInput label="Apodo"/>
        <TextInput label="Numero de Celular"/>
        <TextInput label="Correo"/>
        <TouchableHighlight>
        <Button
        mode="contained">
        Guardar Contacto
        </Button>
        </TouchableHighlight>
    </View>
    </Background>
);
}

export default registerContactScreen;

const styles= StyleSheet.create({
    container: {
        width: '100%',
        padding: 0,
    },
    image: {
        width: 110,
        height: 110,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    text: {
        fontSize: 20,
        textAlign:'center',
        backgroundColor: theme.colors.surface,
        fontFamily: 'Monospace-Monaco',
    },      
});
