//Importaciones de react
import React, { Component, useState, useEffect, useRef  } from 'react';
import { 
  View,
  StyleSheet, 
  ScrollView,
  Image
} from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';

//Importaciones Locales
import { theme } from '../../core/theme'

//Importaciones de Componentes
import TextInput from '../../components/TextInput'
import Header from '../../components/header'
import Button from '../../components/button'
import Background from '../../components/background'
import AnimatedSplash from 'react-native-animated-splash-screen';

import { Avatar, ListItem, Icon } from "react-native-elements"
import * as ImagePicker from 'expo-image-picker'
import RBSheet from "react-native-raw-bottom-sheet";

//Importaciones de Helpers
import { textValidator } from '../../helpers/textValidator'

//Importacion de Firebase

import firebase from '../../database/firebase'

const storeScreen = (props) => {

    const[name, setName] = useState({value: '', error: ''})
    const[lastname, setLastName] = useState({value: '', error: ''})
    const[nickname, setNickName] = useState({value: '', error: ''})
    const[email, setEmail] = useState({value: '', error: ''})
    const[password, setPassword] = useState({value: '', error: ''})
    const[equalPassword, setEqualPassword] = useState({value: '', error: ''})

    //LOADING SCREEN
    const [selectedImage, setSelectedImage] = useState('');
    const [loading, setLoading] = useState(true)

    const refRBSheet = useRef();

    const [sizePicture] = useState({value: 200})
    const defaultImage = require('../../images/add-person.png');
    const defaultImageUri = Image.resolveAssetSource(defaultImage).uri;
    const user = firebase.firebase.auth().currentUser;

    const updateUser= async () => {
        try {
            setLoading(true);
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
                
            const imageUri = selectedImage.localUri;
            let namePicture = user.uid;
            if(imageUri !== defaultImageUri) {
                uploadImage(imageUri)
                    .then(resolve => {
                        let ref = firebase.firebase
                            .storage()
                            .ref()
                            .child(`images/${namePicture}`)
                        ref.put(resolve).then(resolve =>{
                        }).catch(error =>{
                            console.log(error);
                        }).finally(() =>{
                            setLoading(false)
                            props.navigation.navigate('ViewContacts')
                        })
                    })
                    .catch(error =>{
                        console.log(error);
                    });
            }
            else{
                setLoading(false)
                props.navigation.navigate('ViewContacts')
            }
        } catch (e) {
            console.log(e);
        }
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
        urlImage();
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

    function urlImage () {
        let url = "";
        firebase.firebase
            .storage()
            .ref(`images/${user.uid}`)
            .getDownloadURL()
            .then(resolve =>{
                url = resolve;
                setSelectedImage({ localUri: url})
                sizePicture.value = 200; 
            })
            .catch(error =>{
                setSelectedImage({ localUri: defaultImageUri})
                sizePicture.value = 200; 
            })
    }

    function deleteImageFirebase() {
        firebase.firebase
            .storage()
            .ref(`images/${user.uid}`)
            .delete() 
            .then(function() {
                console.log("eliminado")
            })
            .catch(function(error) {})
    }
    
    useEffect(() => {
        getData();
    }, [])

    if(loading) {
        return (
            <AnimatedSplash
      translucent={true}
      isLoaded={loading}
      logoImage = { require ( "../../images/logotipo.png" ) } 
      backgroundColor = { "#E7E6F3" } 
      logoHeight = { 170 } 
      logoWidth = { 170 } 
    >
    </AnimatedSplash>
        )
    }

    const uploadImage = (uri) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onerror = reject;
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4){
                    resolve(xhr.response);
                }
            };

            xhr.open("GET", uri);
            xhr.responseType = "blob";
            xhr.send();
        });
    };

    const openImagePickerAsync = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
            alert("Permiso denegado!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }

        sizePicture.value = 200;
        setSelectedImage({ localUri: pickerResult.uri });
        refRBSheet.current.close();
    }
    
    const openCamareAsync = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchCameraAsync();
        if (pickerResult.cancelled === true) {
            return;
        }

        sizePicture.value = 200;
        setSelectedImage({ localUri: pickerResult.uri });
        refRBSheet.current.close();
    }

    const deletePicture = () => {
        setSelectedImage({ localUri: defaultImageUri});
        deleteImageFirebase();
        sizePicture.value = 150;
        refRBSheet.current.close();
    }


    return (
        <Background>
                <Avatar
                    size="large"
                    onPress={() => refRBSheet.current.open()}
                    rounded
                    source={{
                        uri: selectedImage.localUri     
                    }}
                    containerStyle={{
                        backgroundColor: 'grey',
                        alignSelf: 'center',
                        justifyContent: 'center'}}>
                    <Avatar.Accessory  
                            {...styles.Accessory}
                            size={20}
                            onPress={() => refRBSheet.current.open()}
                        />
                </Avatar>
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
            <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    height={sizePicture.value}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent"
                        },
                        draggableIcon: {
                            backgroundColor: "#000"
                        }
                    }}>
                    <View>
                        <ListItem onPress={openCamareAsync}>
                            <Icon 
                                name='camera'
                                type='ionicon'
                                />
                            <ListItem.Content>
                                <ListItem.Title>Tomar una Foto</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem onPress={openImagePickerAsync}>
                            <Icon 
                                name='image'
                                type='ionicon'
                                />
                            <ListItem.Content>
                                <ListItem.Title>Seleccionar una Foto</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem onPress={deletePicture}>
                            <Icon 
                                name='trash'
                                type='ionicon'
                            />
                            <ListItem.Content>
                                <ListItem.Title>Eliminar Foto</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    </View>
            </RBSheet>
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
  Accessory: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    borderColor: theme.colors.primary,
  }
});
export default storeScreen;