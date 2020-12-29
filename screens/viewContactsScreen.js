import React, { Component} from 'react';
import { 
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import { Card, Avatar, IconButton, Colors } from 'react-native-paper';
import {Avatar as AvatarElement, Icon} from 'react-native-elements'; 

//DB
import firebase from '../database/firebase'
//Componentes
import { theme } from '../core/theme'
import Button from '../components/button'
import BackgroundBack from '../components/backgroundBack'
const defaultImage = require('../images/add-person.png');
const defaultImageUri = Image.resolveAssetSource(defaultImage).uri;
export default class viewContactsScreen extends Component{

  state = {
    contacts: [],
    name: '',
    lastname: '',
    selectedImage: defaultImageUri
  }
  _isMounted = false;
  user  = firebase.firebase.auth().currentUser;
  componentDidMount() {
    if (!this._isMounted) {
      firebase.db.collection(this.user.email).onSnapshot(querySnapshot => {
        let contacts = [];
          querySnapshot.docs.forEach(value => {
          const {name,lastname,alias} = value.data();
          contacts.push({
            id: value.id,
            name,
            lastname,
            alias
          });
        })
        this.setState({  
          ...this.state,
          contacts: contacts
        });
      })
      this.getData();
      this.urlImage();
    }
  }
  
  componentWillUnmount() {
    console.log("se eliminio PERRA");
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.selectedImage);
    if (this.props.somethingChanged !== prevProps.somethingChanged) {
      // this.setState logic here
    }
 }

  async getData(){
    console.log("getdata");
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
    console.log("URL");
    let url = "";
    firebase.firebase
        .storage()
        .ref(`images/${this.user.uid}`)
        .getDownloadURL()
        .then(resolve =>{
            url = resolve;
            this.setState({
              ...this.state,
              selectedImage: url
            })
        })
        .catch(error =>{
            this.setState({
              ...this.state,
              selectedImage: defaultImageUri
            })
        })
  }
  destroyContact = async (id) => {
    let dbRef = firebase.db.collection(this.user.email).doc(id)
    await dbRef.delete();
  }

  render () {
    return (
      <BackgroundBack> 
        <View style={styles.container}>
              <View>
                <AvatarElement
                      size="large"
                      rounded
                      source={{
                          uri: this.state.selectedImage    
                      }}
                      containerStyle={{
                          backgroundColor: 'grey'}}/> 
              </View>

                <View style={{
                    marginTop: -65,
                    paddingLeft: 100,
                    alignSelf: 'flex-start',}}
                    >
                      <Text style={styles.title}>{this.state.name + " " + this.state.lastname}</Text>
                      <TouchableOpacity  onPress={() => this.props.navigation.navigate('Update')}>
                        <Text style={styles.link}>Editar perfil</Text>
                      </TouchableOpacity>
                </View> 
              
          {
            this.state.contacts.map(contact => {
              return (
                <Card key={contact.id}>
                  <Card.Title
                    title={contact.alias}
                    subtitle={contact.name+" "+contact.lastname}
                    left={(props) => <Avatar.Icon {...props} icon="folder" />}
                    right={
                      (props) => 
                      <Card.Actions>
                        <IconButton {...props} icon="pencil" onPress={() => {
                          this.props.navigation.navigate('UpdateContact', {
                          userId: contact.id
                          })
                        }} />
                        <IconButton {...props} icon="delete" 
                        color={Colors.red800}
                        onPress={() => {this.destroyContact(contact.id)}} />
                        <Icon {...props}
                            name='location'
                            type='ionicon'
                            onPress={() => {
                              navigation.navigate('MapContact', {
                              userId: contact.id
                              })
                            }} 
                        />
                      </Card.Actions>
                    }
                  />
                </Card>
              )
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
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  title :{
    fontSize: 25,
  }
});