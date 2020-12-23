//Importaciones de react
import React, { Component, useState } from 'react';
import { 
  View,
  StyleSheet 
} from 'react-native';

import { ActivityIndicator, Colors } from 'react-native-paper';

//Importaciones Locales
import { theme } from '../core/theme'

//Importaciones de Componentes
import TextInput from '../components/TextInput'
import Header from '../components/header'
import Button from '../components/button'
import Logo from '../components/logo'
import Background from '../components/background'

//Importaciones de Helpers
import { textValidator } from '../helpers/textValidator'
import { useEffect } from 'react';

//Importacion de Firebase

import firebase from '../database/firebase'

const storeScreen = (props) => {

    const[name, setName] = useState({value: '', error: ''})
    const[lastname, setLastName] = useState({value: '', error: ''})
    const[nickname, setNickName] = useState({value: '', error: ''})
    const[email, setEmail] = useState({value: '', error: ''})
    const[password, setPassword] = useState({value: '', error: ''})
    const[equalPassword, setEqualPassword] = useState({value: '', error: ''})

    //LOADING SCREEN
    const [loading, setLoading] = useState(true)



    const updateUser= async () => {

        let user = firebase.firebase.auth().currentUser
        let dbRef = firebase.db.collection('users').doc(user.uid);


        await dbRef.set({
            name: name.value,
            lastname: lastname.value,
            nickname: nickname.value
        })
        
        if (password.length > 0) {
            user.updatePassword(newPassword).then(function() {
            }).catch(function(error) {
                console.log(error)
            });
        }

        props.navigation.navigate('ViewContacts')
    } 

    const onUpdatePressed = () => {
        
        const nameError = textValidator(name.value, 'nombre')
        const lastnameError = textValidator(lastname.value, 'apellido')
        const nicknameError = textValidator(nickname.value, 'apodo')
        const equalPasswordError = validateEqualPassword(equalPassword.value, password.value)
    
        if (
            nameError || lastnameError ||
            nicknameError || equalPasswordError
        ) {
            setName({ ...name, error: nameError })
            setLastName({ ...lastname, error: lastnameError })
            setNickName({ ...nickname, error: nicknameError })
            setEqualPassword({ ...equalPassword, error:equalPasswordError })
            return;
        }
        updateUser();
    }

    function validateEqualPassword(equalPassword, password){
        if (password !== equalPassword) {
            return "Las contraseñas no coinciden"
        }
        return "";
    }

    const getData = async () => {
        let user = firebase.firebase.auth().currentUser;
        let dbRef = firebase.db.collection('users').doc(user.uid);
        let doc = await dbRef.get();
        let userData = doc.data();

        setName({
            value: userData.name,
            error: ''
        })
        setLastName({
            value: userData.lastname,
            error: ''
        })
        setNickName({
            value: userData.nickname,
            error: ''
        })
        setEmail({
            value: user.email,
            error: ''
        })

        setLoading(false)
    }

    useEffect(() => {
        getData();
    }, [])

    if(loading) {
        return (
            <ActivityIndicator animating={true} color={Colors.red800} />
        )
    }

    return (
        <Background>
            <Logo></Logo>
            <Header>
            Actualizar Datos De Cuenta
            </Header>
            <TextInput
            label="Nombre"
            returnKeyType="done"
            value={name.value}
            onChangeText={
                (text) => setName({
                value: text,
                error: ''
                })
            }
            error={!!name.error}
            errorText={name.error}
            />
            <TextInput
                label="Apellido"
                returnKeyType="done"
                value={lastname.value}
                onChangeText={
                    (text) => setLastName({
                    value: text,
                    error: ''
                    })
                }
                error={!!lastname.error}
                errorText={lastname.error}/>
            
            <TextInput
                label="Apodo"
                returnKeyType="done"
                value={nickname.value}
                onChangeText={
                    (text) => setNickName({
                    value: text,
                    error: ''
                    })
                }
                error={!!nickname.error}
                errorText={nickname.error}/>

            <TextInput
                label="Correo electronico"
                editable={false}
                returnKeyType="next"
                value={email.value}
                onChangeText={
                    (text) => setEmail({
                    value: text,
                    error: ''
                    })
                }
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"/>

            <TextInput
                label="Contraseña"
                returnKeyType="done"
                value={password.value}
                onChangeText={
                    (text) => setPassword({
                    value: text,
                    error: ''
                    })
                }
                error={!!password.error}
                errorText={password.error}
                secureTextEntry/>

            <TextInput
                label="Confirmar Contraseña"
                returnKeyType="done"
                value={equalPassword.value}
                onChangeText={
                    (text) => setEqualPassword({
                    value: text,
                    error: ''
                    })
                }
                error={!!equalPassword.error}
                errorText={equalPassword.error}
                secureTextEntry/>

            <Button 
                mode="contained"
                onPress={ onUpdatePressed }>
                Actualizar Datos
            </Button>
            <View style={styles.row}/>
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