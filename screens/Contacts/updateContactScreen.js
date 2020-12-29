import React,{ 
    Component, 
    useState, 
    useEffect,
    useRef
} from 'react';
import { 
    StyleSheet, 
    View, 
    Image,
    Text 
} from 'react-native';

import TextInput from '../../components/TextInput';
import Button from '../../components/button';
import Background from '../../components/background';
import { theme } from '../../core/theme'
import AnimatedSplash from 'react-native-animated-splash-screen';

import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import RBSheet from "react-native-raw-bottom-sheet";

import { Avatar, ListItem, Icon } from "react-native-elements"
import { ActivityIndicator, Colors, Switch } from 'react-native-paper';

//DB
import firebase from '../../database/firebase'

//helpers
import { emailValidator } from '../../helpers/emailValidator';
import { textValidator } from '../../helpers/textValidatorOne';
import { lastNameValidator } from '../../helpers/lastNameValidator';
import { nickNameValidator } from "../../helpers/nickNameValidator";
import { numberValidator } from "../../helpers/numberValidator";


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
    
    //Profile Picture
    const refRBSheet = useRef();
    const defaultImage = require('../../images/add-person.png');
    const defaultImageUri = Image.resolveAssetSource(defaultImage).uri;
    const [selectedImage, setSelectedImage] = useState({ localUri: defaultImageUri});
    const [sizePicture] = useState({value: 200})

    const update = async () => {
        try {
            setLoading(true)  
            let user = firebase.firebase.auth().currentUser
            let contactId = props.route.params.userId
            let dbRef = firebase.db.collection(user.email).doc(contactId);

            let geoPoint = {};

            if(isSwitchOn) {
                geoPoint = {
                    latitude: location.latitude,
                    longitude: location.longitude
                }
                await dbRef.update({
                    name: name.value,
                    lastname: lastname.value,
                    alias: alias.value,
                    number: number.value,
                    email: email.value,
                    location: geoPoint
                })
            } else {
                await dbRef.update({
                    name: name.value,
                    lastname: lastname.value,
                    alias: alias.value,
                    number: number.value,
                    email: email.value
                })
            }

            const imageUri = selectedImage.localUri;
            let namePicture = props.route.params.userId;
            if(imageUri != defaultImageUri) {
                uploadImage(imageUri)
                    .then(resolve => {
                        //CREATE REFERENCES
                        let ref = firebase.firebase.storage()
                            .ref()
                            .child(`Contacts/${user.email}/${namePicture}`)
                        //UPLOAD FILE
                        ref.put(resolve)
                        .then(resolve =>{
                            updateProfilePicture(props.route.params.userId)
                        }).catch(error =>{
                            console.log(error);
                        });
                    })
                    .catch(error =>{
                        console.log(error);
                    });
            }
            props.navigation.navigate('ViewContacts')
        } catch (e) {
            console.log(e);
            setLoading(false)
        }
    }
    const updateProfilePicture = async (id) => {
        let user = firebase.firebase.auth().currentUser
        let dbRef = firebase.db.collection(user.email).doc(id)
        firebase.firebase
            .storage()
            .ref(`Contacts/${user.email}/${dbRef.id}`)
            .getDownloadURL()
            .then(resolve =>{
                let url = resolve
                dbRef.update({
                    profilePicture: url
                })
            })
            .catch(error =>{
                console.log(error);
            }).finally(() => {
                setLoading(false)
                props.navigation.navigate('ViewContacts')
            })
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

        update();

    }

    const getContact = async (id) => {
        urlImage();
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

        let locationCurrent = await Location.getCurrentPositionAsync({});
        setLocation({
            latitude: locationCurrent.coords.latitude,
            longitude: locationCurrent.coords.longitude
        })
        setLoading(false)
    }
    useEffect(() => {
        if (
            props && props.route && 
            props.route.params && props.route.params.userId ) {
            getContact(props.route.params.userId)
        } 
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
    function urlImage () {
        let user = firebase.firebase.auth().currentUser;
        let url = "";
        firebase.firebase
            .storage()
            .ref(`Contacts/${user.email}/${props.route.params.userId}`)
            .getDownloadURL()
            .then(resolve =>{
                url = resolve;
                setSelectedImage({ localUri: url})
                sizePicture.value = 200; 
            })
            .catch(error =>{
                setSelectedImage({ localUri: defaultImageUri})
                sizePicture.value = 150; 
            })
    }

    function deleteImageFirebase() {
        let id = props.route.params.userId
        let user = firebase.firebase.auth().currentUser;
        firebase.firebase
            .storage()
            .ref(`Contacts/${user.email}/${id}`)
            .delete() 
            .then(function() {
                console.log("eliminado")
                let dbRef = firebase.db.collection(user.email).doc(id)
                dbRef.update({
                    profilePicture: ''
                })
            })
            .catch(function(error) {})
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
            alert("Permiso denegado!");
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

    return(
            <Background>
                <View style={styles.container}>
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
                     style= {{marginLeft: 150, flex: 1, marginTop: -20}}
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
