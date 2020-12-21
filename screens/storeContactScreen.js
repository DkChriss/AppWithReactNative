import React,{ Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import {Avatar,  ImageBackground} from 'react-native-paper'
import { TouchableHighlight } from 'react-native-gesture-handler'
import TextInput from '../components/TextInput';
import Button from '../components/button';
import Background from '../components/background';
import { block } from 'react-native-reanimated';
import { theme } from '../core/theme'
import { useState } from 'react';

//helpers
import { emailValidator } from '../helpers/emailValidator';
import { textValidator } from '../helpers/textValidatorOne';
import { lastNameValidator } from '../helpers/lastNameValidator';
import { nickNameValidator } from "../helpers/nickNameValidator";
import { numberValidator } from "../helpers/numberValidator";


const storeContactScreen = () =>{
    
        const[email, setEmail] = useState({value: '', error: ''});
        const[text, setText] = useState({value: '', error: '' });
        const[apellido, setApellido]= useState({value: '', error: ''});
        const[alias, setAlias]= useState({value: '', error: ''});
        const[number, setNumber]= useState({value: '', error: ''});

        const  validateFields = () => {
            const emailError = emailValidator(email.value)
           const textError = textValidator(text.value)
           const apellidoError = lastNameValidator(apellido.value)
           const aliasError = nickNameValidator(alias.value)
           const numberError = numberValidator(number.value)
            if (emailError || textError || apellidoError || aliasError || numberError) {
                setText({...text, error: textError})
              setEmail({ ...email, error: emailError })
              setApellido({ ...apellido, error: apellidoError })
              setAlias({ ...alias, error: aliasError })
              setNumber({ ...number, error: numberError })
              return
            } else {
              //
            }
          }
        
   return(
    <Background> 
    <View style={styles.container}>
    <Image source={require('../images/user.jpg')} style={styles.image} />    
        <Text style={styles.text}
        > Contacto Nuevo</Text>
        <TextInput
        label="Nombre"
        returnKeyType="next"
        value={text.value}
        onChangeText={(text) => setText({value: text, error: ''})}
        error={!!text.error}
        errorText={text.error}
        autoCapitalize="none"
        autoCompleteType="text"
        textContentType="textAddress"
        keyboardType="text-address"/>
        <TextInput
        padding='0' 
        label="Apellido"
        returnKeyType="next"
        value={apellido.value}
        onChangeText={(apellido) => setApellido({value: apellido, error: ''})}
        error={!!apellido.error}
        errorText={apellido.error}
        autoCapitalize="none"
        autoCompleteType="text"
        textContentType="textAddress"
        keyboardType="text-address"/>
        <TextInput 
        label="Apodo"
        returnKeyType="next"
        value={alias.value}
        onChangeText={(alias) => setAlias({value: alias, error: ''})}
        error={!!alias.error}
        errorText={alias.error}
        autoCapitalize="none"
        autoCompleteType="text"
        textContentType="textAddress"
        keyboardType="text-address"/>
        <TextInput
        label="Numero de Celular"
        value={number.value}
        onChangeText={(number) => setNumber({value: number, error: ''})}
        error={!!number.error}
        errorText={number.error}
        autoCapitalize="none"
        autoCompleteType="number"
        textContentType="numberAddress"
        keyboardType="number-address"/>
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
        keyboardType="email-address"/>
        <TouchableHighlight>
        <Button
        mode="contained"
        onPress={ validateFields }>
        Guardar Contacto
        </Button>
        </TouchableHighlight>
    </View>
    </Background>
);
}

export default storeContactScreen;

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
