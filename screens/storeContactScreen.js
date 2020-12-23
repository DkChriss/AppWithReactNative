import React,{ Component } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import TextInput from '../components/TextInput';
import Button from '../components/button';
import Background from '../components/background';
import { theme } from '../core/theme'
import { useState } from 'react';

import { ActivityIndicator, Colors } from 'react-native-paper';

//DB
import firebase from '../database/firebase'

//helpers
import { emailValidator } from '../helpers/emailValidator';
import { textValidator } from '../helpers/textValidatorOne';
import { lastNameValidator } from '../helpers/lastNameValidator';
import { nickNameValidator } from "../helpers/nickNameValidator";
import { numberValidator } from "../helpers/numberValidator";
import { useEffect } from 'react';


const storeContactScreen = (props) =>{

    //INPUTS
    const[name, setName] = useState({value: '', error: '' });
    const[lastname, setLastName]= useState({value: '', error: ''});
    const[alias, setAlias]= useState({value: '', error: ''});
    const[number, setNumber]= useState({value: '', error: ''});
    const[email, setEmail] = useState({value: '', error: ''});

    //LOADING SCREEN
    const [loading, setLoading] = useState(true)
    //method
    const [method, setMethod] = useState({value: 'store'})

    const store = () => {
        try {
            let user = firebase.firebase.auth().currentUser;
            
            firebase.db.collection(user.email).add({
                name: name.value,
                lastname: lastname.value,
                alias: alias.value,
                number: number.value,
                email: email.value
            });
            //REDIRECCIONAR
            props.navigation.navigate('ViewContacts')
        } catch (e) {
            console.log(e);
        }
    }

    const update = async () => {

        let user = firebase.firebase.auth().currentUser
        let contactId = props.route.params.userId
        let dbRef = firebase.db.collection(user.email).doc(contactId);

        await dbRef.set({
            name: name.value,
            lastname: lastname.value,
            alias: alias.value,
            number: number.value,
            email: email.value
        })

        props.navigation.navigate('ViewContacts')
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
        if (method.value === 'store') {
            store();
        }
        if (method.value === 'update') {
            update();
        }
    }

    const getContact = async (id) => {
        let user = firebase.firebase.auth().currentUser;
        let dbRef = firebase.db.collection(user.email).doc(id);
        let doc = await dbRef.get();
        let contact = doc.data();
    
        setName({
            value: contact.name,
            error: ''
        })
        setLastName({
            value: contact.lastname,
            error: ''
        })
        setAlias({
            value: contact.alias,
            error: ''
        })
        setNumber({
            value: contact.number,
            error: ''
        })
        setEmail({
            value: contact.email,
            error: ''
        })

        setLoading(false)
        setMethod({value: 'update'})
    }

    useEffect(() => {
        if (
            props && props.route && props.route.params && props.route.params.userId
        ) {
            getContact(props.route.params.userId);
        } else {
            setLoading(false)
        }
    }, [])

    if(loading) {
        return (
            <ActivityIndicator animating={true} color={Colors.red800} />
        )
    }
        
    return(

        <ScrollView  style={styles.scrollView}>
        <Background> 
        <View style={styles.container}>
        <Image source={require('../images/user.jpg')} style={styles.image} />    
            <TextInput
            label="Nombre"
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setName({value: text, error: ''})}
            error={!!name.error}
            errorText={name.error}

            />
            <TextInput
            label="Apellido"
            returnKeyType="next"
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
 
            />
            <TextInput 
            label="Apodo"
            returnKeyType="next"
            value={alias.value}
            onChangeText={(text) => setAlias({value: text, error: ''})}
            error={!!alias.error}
            errorText={alias.error}

            />
            <TextInput
                label="Numero de Celular"
                value={number.value}
                onChangeText={(number) => setNumber({value: number, error: ''})}
                error={!!number.error}
                errorText={number.error}
                autoCapitalize="none"
                keyboardType="numeric"
            />
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
            <Button
            mode="contained"
            onPress={ validateFields }>
            Guardar Contacto
            </Button>
        </View>
        </Background>

        </ScrollView>
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
    scrollView: {
        marginHorizontal: 0,
      },  
});
