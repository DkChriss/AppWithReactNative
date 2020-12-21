import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  FlatList,
  Image
} from 'react-native';


import { theme } from '../core/theme'
import Header from '../components/header'
import Button from '../components/button'
import Background from '../components/background'

const viewContactsScreen = ({ navigation }) => {
  return (
    <Background>
        <Image source={require('../images/contacts.png')} style={styles.image} /> 
        <Header>
            Registro de Contactos
            
        </Header>
        

        <View style={styles.container}>
          <FlatList
            data={[
              {key: 'Devin'},
              {key: 'Dan'},
              {key: 'Dominic'},
              {key: 'Jackson'},
              {key: 'James'},
              {key: 'Joel'},
              {key: 'John'},
              {key: 'Jillian'},
              {key: 'Jimmy'},
              {key: 'Julie'},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          />
        </View>
        <View>
          <Button 
            mode="contained"
            onPress={() => navigation.replace('RegistroContacto')}>
              Registrar Nuevo Contacto
          </Button>
        </View>

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
  image: {
    width: 145,
    height: 145,
    //marginBottom: 8,
    resizeMode: "contain",
}, 
  buttonAdd: {
    width: 30,
    borderRadius: '50%',
    backgroundColor: '#3175AC',
  }
});
export default viewContactsScreen;