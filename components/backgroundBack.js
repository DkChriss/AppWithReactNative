import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme } from '../core/theme'


const backgroundBack = ({ children }) => (
  <ImageBackground
    style={styles.background}
    source={require('../images/background.png')}
    
  >
    <KeyboardAvoidingView 
    style={styles.container} 
    behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.surface,
        
    },
    container: {
        flex: 1,
        padding: 25,
        width: '100%',
        maxWidth: 1450,
        alignSelf: 'center',
    },
})

export default backgroundBack;
