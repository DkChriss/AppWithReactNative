import React, { Component } from 'react';
import { 
  StyleSheet,
  View
} from 'react-native';

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

const viewContactsScreen = ({navigation}) => {

  const [contacts, setContacts] = useState([])

  useEffect(() => {
      
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
      setContacts(contacts);
    })

  }, [])

  const destroy = async (id) => {
    let user = firebase.firebase.auth().currentUser;
    let dbRef = firebase.db.collection(user.email).doc(id)
    await dbRef.delete();
  }
  
  return (
    <View>
        <Logo></Logo>
        <Header>
            Contactos
        </Header>
        <Button 
          mode="contained"
          onPress={() => navigation.navigate('Update')}>
            Actualizar Datos
        </Button>
        {
          contacts.map(contact => {
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
                        navigation.navigate('StoreContact', {
                          userId: contact.id
                        })
                      }} />
                      <IconButton {...props} icon="pencil" color={Colors.red800} onPress={() => {
                        destroy(contact.id)
                      }} />
                    </Card.Actions>
                  }
                />
              </Card>
            )
          })
        }
        <Button 
          mode="contained"
          onPress={() => navigation.navigate('StoreContact')}>
            Registrar Nuevo Contacto
        </Button>
    </View>
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
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});

export default viewContactsScreen;