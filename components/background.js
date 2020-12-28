import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { theme } from '../core/theme'


const background = ({ children }) => (
  <ImageBackground
   // resizeMode="repeat"
    style={styles.background}
    source={require('../images/background.png')}
  >
    <ScrollView>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
        </ScrollView>
  </ImageBackground>
)

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.surface,
    },
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        marginHorizontal: 0,
    },  
})

export default background
