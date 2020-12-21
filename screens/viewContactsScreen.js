import React, { Component, useEffect, useState } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView
} from 'react-native';


import { theme } from '../core/theme'
import Header from '../components/header'
import Button from '../components/button'
import Logo from '../components/logo'
import Background from '../components/background'
import firebase from '../database/firebase'
import { ListItem, Avatar} from 'react-native-elements'
import { List } from 'react-native-paper';

const viewContactsScreen = ({ navigation }) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((querySnapshot) => {
      const users =[];

      querySnapshot.docs.forEach((doc) => {
          console.log(doc.data());
          const { email, name, lastname, nickname, password } = doc.data();
          users.push({
            id : doc.id,
            name,
            lastname,
            email,
            nickname,
            password
          })
      });

      setUsers(users);

    });
  }, []);
  return (
    <Background>
        <Logo></Logo>

        <Header>
            Registro de Contactos
        </Header>
        <ScrollView>
            {
              users.map(user => {
                return(
                  <ListItem key={user.id}>
                    <ListItem.Chevron/>
                    <ListItem.Content>
                        <ListItem.Title>{user.name}</ListItem.Title>
                        <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                        <ListItem.Subtitle>{user.nickname}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                )
              })
            }
            <Button 
                mode="contained"
                onPress={() => navigation.navigate('RegistroContacto')}>
                Registrar Nuevo Contacto
            </Button>
         </ScrollView>

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
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default viewContactsScreen;