import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';


import { theme } from '../core/theme'
import Header from '../components/header'
import Button from '../components/button'
import Logo from '../components/logo'
import Background from '../components/background'

const viewContactsScreen = ({ navigation }) => {
  return (
    <Background>
        <Logo></Logo>

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
});
export default viewContactsScreen;