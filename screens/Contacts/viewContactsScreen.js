import React, { Component} from 'react';
import { 
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  LogBox,
  Text,
  ImageBackground, 
} from 'react-native';
import { Card, Avatar, IconButton, ActivityIndicator, Colors } from 'react-native-paper'
import {Avatar as AvatarElement, Icon} from 'react-native-elements'
import ActionButton from 'react-native-circular-action-menu'
import { Platform } from 'react-native';
//DB
import firebase from '../../database/firebase'
//Componentes
import { theme } from '../../core/theme'
import Button from '../../components/button'
import AnimatedSplash from 'react-native-animated-splash-screen';
import BackgroundBack from '../../components/backgroundBack'
const defaultImage = require('../../images/add-person.png')
const defaultImageUri = Image.resolveAssetSource(defaultImage).uri

export default class viewContactsScreen extends Component{

  state = {
    name: '',
    lastname: '',
    selectedImage: defaultImageUri,
    contacts: [],
    loading: true,
  }
  _unsubscribe = ''
  _isMounted = false
  user  = firebase.firebase.auth().currentUser

  componentDidMount() {
    this.initialPage()
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.initialPage();
    })
  }
  initialPage() {
   LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    this.getData()
    this.urlImage()
    //ARRAY OBJECTS
    firebase.db.collection(this.user.email).orderBy('alias').onSnapshot(querySnapshot => {
      let contacts = [];
        querySnapshot.docs.forEach(value => {
        const {name,lastname,alias,profilePicture} = value.data();
        contacts.push({
          id: value.id,
          name,
          lastname,
          alias,
          profilePicture
        });
      })
      this.setState({  
        ...this.state,
        contacts: contacts
      });
    })
  }
  
  componentWillUnmount() {
    this._isMounted = false
    this._unsubscribe();
  }

  async getData(){
    let dbRef = firebase.db.collection('users').doc(this.user.uid);
    let doc = await dbRef.get();
    let userData = doc.data();
    this.setState({
      ...this.state,
      name: userData.name,
      lastname: userData.lastname
    });
  }

  urlImage () {
    let url = "";
    firebase.firebase
      .storage()
      .ref(`images/${this.user.uid}`)
      .getDownloadURL()
      .then(resolve =>{
          url = resolve
          this.setState({
            ...this.state,
            selectedImage: url
          })
      })
      .catch(error =>{
          console.log(error);
          this.setState({
            ...this.state,
            selectedImage: defaultImageUri
          })
      }).finally(() => {
        this.setState({...this.state,loading: false})
      })
  }

  destroyContact = async (id) => {
    let dbRef = firebase.db.collection(this.user.email).doc(id)
    await dbRef.delete();
  }

  render () {
    return (
      this.state.loading 
      ?  <AnimatedSplash
      translucent={true}
      isLoaded={this.state.loading}
      logoImage = { require ( "../../images/logotipo.png" ) } 
      backgroundColor = { "#E7E6F3" } 
      logoHeight = { 170 } 
      logoWidth = { 170 } 
              
    >
    </AnimatedSplash>
      : <BackgroundBack> 
        <View style={styles.container}>
              <View>
                <AvatarElement
                  size="large"
                  rounded
                  source={{
                      uri: this.state.selectedImage
                  }}
                  containerStyle={{
                      backgroundColor: 'grey'}}
                /> 
              </View>

                <View style={{
                    marginTop: -65,
                    paddingLeft: 100,
                    alignSelf: 'flex-start',
                  marginBottom: 29,}}
                    >
                      <Text style={styles.title}>{this.state.name + " " + this.state.lastname}</Text>
                      <TouchableOpacity  onPress={() => this.props.navigation.navigate('Update')}>
                        <Text style={styles.link}>Editar perfil</Text>
                      </TouchableOpacity>
                      <TouchableOpacity  onPress={() => this.props.navigation.navigate('MapGlobal',{userId: this.user.uid})}>
                        <Text style={styles.link}>Mapa Global</Text>
                      </TouchableOpacity>
                </View> 
              
          {
            this.state.contacts.map(contact => {     
              let device = Platform.OS
              if (device === 'android') {
                return (
                  <Card key={contact.id} style={styles.file}>
                    <Card.Title
                      title={contact.alias}
                      subtitle={contact.name+" "+contact.lastname}
                      left={
                        (props) => <AvatarElement {...props} source={{ uri: contact.profilePicture }} size="medium"
                          title={contact.name}
                          rounded
                          containerStyle={{
                              backgroundColor: 'grey'}}
                          /> 
                      }
                      right={
                        (props) =>  <Card.Actions>
                                <IconButton {...props} icon="pencil" onPress={() => {
                                  this.props.navigation.navigate('UpdateContact',{userId: contact.id})
                                }}/>
                                <IconButton {...props} icon="delete" color={Colors.red800} onPress={() => {
                                  this.destroyContact(contact.id)
                                }}/>
                                <Icon {...props} name='location' type='ionicon' onPress={() => {
                                  this.props.navigation.navigate('MapContact', {
                                    userId: contact.id
                                  })
                                }}/>
                        </Card.Actions>
                      }
                    />
                  </Card>
                )
              } 
              if (device === 'ios') {
                  return (
                    <Card key={contact.id} style={styles.file}>
                      <Card.Title
                        title={contact.alias}
                        subtitle={contact.name+" "+contact.lastname}
                        left={
                          (props) => <AvatarElement {...props} source={{ uri: contact.profilePicture }} size="medium"
                            title={contact.name}
                            rounded
                            containerStyle={{
                                backgroundColor: 'grey'}}
                            /> 
                        }
                        right={
                          (props) => 
                          <View style={styles.ActionButton}>
                            <ActionButton 
                              {...props}
                              buttonColor="rgba(231,76,60,1)" 
                              position="right" >
                              <ActionButton.Item buttonColor='#9b59b6' title="Editar Contacto" 
                              onPress={
                                () =>this.props.navigation.navigate(
                                  'UpdateContact', 
                                  {
                                    userId: contact.id
                                  }
                                )
                              }>
                                <Icon name="edit" style={styles.actionButtonIcon} />
                              </ActionButton.Item>
                              <ActionButton.Item buttonColor='#3498db' title="Eliminar Contacto" 
                                onPress={() => {this.destroyContact(contact.id)}}>
                                <Icon name="delete" style={styles.actionButtonIcon} />
                              </ActionButton.Item>
                              <ActionButton.Item 
                                buttonColor='#1abc9c' 
                                title="Ver ubicacion" 
                                onPress={() => {
                                  this.props.navigation.navigate('MapContact', {
                                    userId: contact.id
                                  })
                                }}>
                                <Icon name='location'type='ionicon' />
                              </ActionButton.Item>
                            </ActionButton>
                          </View>
                        }
                      />
                  </Card>
                )
              }

            })
          }
        </View> 
      </BackgroundBack>
    )
  }
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
  container: {
    flex: 1,
    paddingTop: 22,
    paddingLeft: 11,
    paddingRight: 11,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  title :{
    fontSize: 25,
  },
  file:{
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginBottom: 1,
  },
  ActionButton: {
    width: 20,
    marginRight: 10,
    backgroundColor: '#f2f2f2',
    zIndex: 100
  }
});