import React, { Component, useRef, useState, useEffect } from 'react';
import { 
  StyleSheet,
  View, 
  Image,
  TouchableOpacity,
  Text
} from 'react-native';

import { Card, Avatar, IconButton, Colors, ActivityIndicator } from 'react-native-paper';
import {Avatar as AvatarElement, Icon} from 'react-native-elements'; 

//DB
import firebase from '../database/firebase'

//Componentes
import { theme } from '../core/theme'
import BackgroundBack from '../components/backgroundBack'
import Header from '../components/header'

const defaultImage = require('../images/add-person.png');
const defaultImageUri = Image.resolveAssetSource(defaultImage).uri;
const refRBSheet = useRef();
export default class viewContactsScreen extends Component{

  state = {
    contacts: [],
    name: '',
    lastname: '',
    selectedImage: defaultImageUri
  }
  _isMounted = false;

  componentDidMount() {
    if (!this._isMounted) {
      let user = firebase.firebase.auth().currentUser;
      firebase.db.collection(user.email).onSnapshot(querySnapshot => {
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
        this.setState({contacts: contacts});
      })
    }
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  urlImage () {
    let url = "";
    firebase.firebase
        .storage()
        .ref(`images/${user.uid}`)
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
    let user = firebase.firebase.auth().currentUser;
    let dbRef = firebase.db.collection(user.email).doc(id)
    deleteImageFirebase(id);
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