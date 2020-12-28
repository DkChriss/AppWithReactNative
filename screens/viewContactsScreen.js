import React, { Component } from 'react';
import { 
  StyleSheet,
  View
} from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper'
import { useState } from 'react';
import { useEffect } from 'react';
import { Card, Avatar, IconButton, Colors } from 'react-native-paper';

//DB
import firebase from '../database/firebase'
//Componentes
import { theme } from '../core/theme'
import Header from '../components/header'
import Button from '../components/button'
import Logo from '../components/logo'
import Background from '../components/background'
import BackgroundBack from '../components/backgroundBack'


export default class viewContactsScreen extends Component{

  state = {
    contacts: []
  }
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true
    if (this._isMounted) {
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

  destroyContact = async (id) => {
    let user = firebase.firebase.auth().currentUser;
    let dbRef = firebase.db.collection(user.email).doc(id)
    await dbRef.delete();
  }

  render () {
    return (
      <BackgroundBack> 
        <View style={styles.container}>
              <Button 
                mode="contained"
                onPress={() => navigation.navigate('Update')}>
                Actualizar Datos
              </Button>
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
                          this.props.navigation.navigate('StoreContact', {
                          userId: contact.id
                          })
                        }} />
                        <IconButton {...props} icon="delete" 
                        color={Colors.red800}
                        onPress={() => {this.destroyContact(contact.id)}} />
                        <IconButton {...props} icon="pencil" onPress={() => {
                          this.props.navigation.navigate('MapContact', {
                          userId: contact.id
                          })
                        }} />
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
  }
});