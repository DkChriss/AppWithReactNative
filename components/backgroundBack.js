import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '../core/theme'


const backgroundBack = ({ children }) => (
  <ImageBackground
    style={styles.background}
    source={require('../images/background.png')}
    
  >
    <ScrollView style={styles.scrollView}>
      <View  
      behavior="padding">
        {children}
      </View>
    </ScrollView>
  </ImageBackground>
);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.surface,
    },
    scrollView: {
        marginHorizontal: 0,
    },  
})

export default backgroundBack;
