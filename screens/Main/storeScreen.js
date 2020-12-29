//Importaciones de react
import React, { Component, useState, useRef } from 'react';
import { 
  View,
  TouchableOpacity,
  Text,
  StyleSheet, 
  ScrollView, 
  Image
} from 'react-native';


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
import { equalPasswordValidator } from '../../helpers/equalPasswordValidator'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'

//Importacion de Firebase

import firebase from '../../database/firebase'

const storeScreen = ({ navigation }) => {

  const[name, setName] = useState({value: '', error: ''})
  const[lastname, setLastName] = useState({value: '', error: ''})
  const[nickname, setNickName] = useState({value: '', error: ''})
  const[email, setEmail] = useState({value: '', error: ''})
  const[password, setPassword] = useState({value: '', error: ''})
  const[equalPassword, setEqualPassword] = useState({value: '', error: ''})


  //Image
  const [sizePicture] = useState({value: 150})
  const defaultImage = require('../../images/add-person.png');
  const defaultImageUri = Image.resolveAssetSource(defaultImage).uri;
  const [selectedImage, setSelectedImage] = useState({ localUri: defaultImageUri});

  //Storage
  const refRBSheet = useRef();


  const storeNewUser = () => {
    try {
      //SAVE IN USERS
      firebase.firebase.auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(cred => {
        //SAVE IN DATABASE
        firebase.db.collection('users').doc(cred.user.uid).set({
          name: name.value,
          lastname: lastname.value,
          nickname: nickname.value
        })
        

        const imageUri = selectedImage.localUri;
        let namePicture = cred.user.uid;
        if(imageUri != defaultImageUri) {
            uploadImage(imageUri)
                .then(resolve => {
                    let ref = firebase.firebase
                        .storage()
                        .ref()
                        .child(`images/${namePicture}`);

                    ref.put(resolve).then(resolve =>{
                        console.log('imagen subida');
                    }).catch(error =>{
                        console.log(error);
                    });

                })
                .catch(error =>{
                    console.log(error);
                });
        }

        //REDIRECCIONAR
        navigation.navigate('ViewContacts')
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          setEmail({...email, error: "Credenciales incorrectas"})
          setPassword({...password, error: "Credenciales incorrectas"})
        }
        if (error.code === 'auth/email-already-in-use') {
          setEmail({...email, error: "Este correo se encuentra registrado"})
        }
      }); 
    } catch (error) {
      console.log(error);
    }
  }


  const onStorePressed = () => {
    
    const nameError = textValidator(name.value, 'nombre')
    const lastnameError = textValidator(lastname.value, 'apellido')
    const nicknameError = textValidator(nickname.value, 'apodo')
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const equalPasswordError = equalPasswordValidator(equalPassword.value, password.value)
  
    if (
      nameError || lastnameError ||
      nicknameError || emailError || 
      passwordError || equalPasswordError
    ) {
      setName({ ...name, error: nameError })
      setLastName({ ...lastname, error: lastnameError })
      setNickName({ ...nickname, error: nicknameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setEqualPassword({ ...equalPassword, error:equalPasswordError })
      return;
    }
    

    storeNewUser();
  }

  //Storage
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
          alert("Permission to access camera roll is required!");
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
      sizePicture.value = 150;
      refRBSheet.current.close();
  }

  const eliminarFoto = ()  => { 
      if(selectedImage.localUri != defaultImageUri && selectedImage.localUri != undefined){   
          sizePicture.value = 200;
          return(
              <ListItem onPress={deletePicture}>
                  <ListItem.Content>
                      <ListItem.Title>Eliminar Foto</ListItem.Title>
                  </ListItem.Content>
              </ListItem>
          )
      }
      return;
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
              errorText={lastname.error}
            />
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
              errorText={nickname.error}
            />
            <TextInput
              label="Correo electronico"
              value={email.value}
              onChangeText={
                (text) => setEmail({
                  value: text,
                  error: ''
                })
              }
              error={!!email.error}
              errorText={email.error}
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
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
              onPress={ onStorePressed }>
              Crear cuenta
            </Button>
            <View style={styles.row}>
              <Text>¿Tienes cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text style={styles.link}>Iniciar Sesion</Text>
              </TouchableOpacity>
            </View>
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
              {eliminarFoto()}
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
  scrollView: {
    marginHorizontal: 0,
  },
  Accessory: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    borderColor: theme.colors.primary,
  }
});
export default storeScreen;