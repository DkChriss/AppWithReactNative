import React,{ Component } from 'react';
import { StyleSheet, View, Image,Text } from 'react-native';
import TextInput from '../components/TextInput';
import Button from '../components/button';
import Background from '../components/background';
import { theme } from '../core/theme'
import { useState } from 'react';
import { useEffect } from 'react';

import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions';

import { ActivityIndicator, Colors, Switch } from 'react-native-paper';

//DB
import firebase from '../database/firebase'

//helpers
import { emailValidator } from '../helpers/emailValidator';
import { textValidator } from '../helpers/textValidatorOne';
import { lastNameValidator } from '../helpers/lastNameValidator';
import { nickNameValidator } from "../helpers/nickNameValidator";
import { numberValidator } from "../helpers/numberValidator";


const storeContactScreen = (props) =>{

    //INPUTS
    const[name, setName] = useState({value: '', error: '' })
    const[lastname, setLastName]= useState({value: '', error: ''})
    const[alias, setAlias]= useState({value: '', error: ''})
    const[number, setNumber]= useState({value: '', error: ''})
    const[email, setEmail] = useState({value: '', error: ''})
    const[location, setLocation] = useState({latitude: 0, longitude: 0})
    const[isSwitchOn, setIsSwitchOn] = useState(false)
    
    const[enableSwitch, SetEnableSwitch] = useState({disabled: false , text: 'Guardar Ubicacion'})

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn)
    };

    //LOADING SCREEN
    const [loading, setLoading] = useState(true)

    const store = () => {
        try {
            let user = firebase.firebase.auth().currentUser;
            let geoPoint = {};

            if(isSwitchOn) {
                geoPoint = {
                    latitude: location.latitude,
                    longitude: location.longitude
                }
            }
            firebase.db.collection(user.email).add({
                name: name.value,
                lastname: lastname.value,
                alias: alias.value,
                number: number.value,
                email: email.value,
                location: geoPoint
            });

            //REDIRECCIONAR
            props.navigation.navigate('ViewContacts')
        } catch (e) {
            console.log(e);
        }
    }

    const  validateFields = () => {

        let nameError = textValidator(name.value)
        let lastnameError = lastNameValidator(lastname.value)
        let aliasError = nickNameValidator(alias.value)
        let numberError = numberValidator(number.value)
        let emailError = emailValidator(email.value)
        
        if (
            nameError  || lastnameError || 
            aliasError || numberError   || 
            emailError
        ) {
            setName({...name, error: nameError})
            setLastName({ ...lastname, error: lastnameError })
            setAlias({ ...alias, error: aliasError })
            setNumber({ ...number, error: numberError })
            setEmail({ ...email, error: emailError })
            return
        }

        store()

    }

    useEffect(() => {
        (
            async () => {
                const { status } = await Permissions.askAsync(Permissions.LOCATION);
                if(status !== 'granted') {
                    SetEnableSwitch({disabled: true , text: 'GPS desactivado'})
                    return
                }
                SetEnableSwitch({disabled: false, text: 'Guardar posición'})
                let locationCurrent = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: locationCurrent.coords.latitude,
                    longitude: locationCurrent.coords.longitude
                })
            }
        )()
        setLoading(false)
    }, [])

    if(loading) {
        return (
            <ActivityIndicator animating={true} color={Colors.red800} />
        )
    }
        
    return(
            <Background>
                <View style={styles.container}>
                    <Image source={require('../images/user.jpg')} style={styles.image} />    
                    <TextInput
                        label="Nombre"
                        returnKeyType="done"
                        value={name.value}
                        onChangeText={
                            (text) => setName(
                                {
                                    value: text, 
                                    error: ''
                                }
                            )}
                        error={!!name.error}
                        errorText={name.error}
                        autoCapitalize="words"
                        autoCompleteType="name"
                    />
                    <TextInput
                        label="Apellido"
                        returnKeyType="done"
                        value={lastname.value}
                        onChangeText={
                            (text) => setLastName(
                                {
                                    value: text, 
                                    error: ''
                                }
                            )
                        }
                        error={!!lastname.error}
                        errorText={lastname.error}
                        autoCapitalize="words"
                    />
                    <TextInput 
                        label="Apodo"
                        returnKeyType="done"
                        value={alias.value}
                        onChangeText={(text) => setAlias(
                            {
                                value: text, 
                                error: ''
                            }
                        )}
                        error={!!alias.error}
                        errorText={alias.error}
                    />
                    <TextInput
                        label="Numero de Celular"
                        returnKeyType="done"
                        value={number.value}
                        onChangeText={(number) => setNumber(
                            {
                                value: number, 
                                error: ''
                            }
                        )}
                        error={!!number.error}
                        errorText={number.error}
                        autoCompleteType="tel"
                        textContentType="telephoneNumber"
                        keyboardType="number-pad"
                    />
                    <TextInput
                        label="Correo electronico"
                        returnKeyType="done"
                        value={email.value}
                        onChangeText={(text) => setEmail(
                            {
                                value: text, 
                                error: ''
                            }
                        )}
                        error={!!email.error}
                        errorText={email.error}
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />
                    <Text>
                        {enableSwitch.text}
                    </Text>
                    <Switch
                        value={isSwitchOn} 
                        onValueChange={onToggleSwitch} 
                        tintColor='#DEDEDE'
                        disabled={enableSwitch.disabled}
                    />
                    <Button
                        mode="contained"
                        onPress={ validateFields }
                    >
                        Guardar Contacto
                    </Button>
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
    }
});
