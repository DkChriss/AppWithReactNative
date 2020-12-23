import React, { Component } from 'react';
import { View,
    StyleSheet, 
    TouchableWithoutFeedback, 
    Animated } from 'react-native';
import {AntDesign, Entypo} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FabButton = ({route, ...props})=> {
    const navigation= useNavigation();
    
        return(
            <View style={[styles.container, props.style]}>
                <TouchableWithoutFeedback onPress={()=> navigation.navigate(route)}
                    style={{bottom: 80, right: 60, zIndex:1}}>
                    <Animated.View style={styles.button}>
                    <AntDesign name="plus" size={24} color="#FFF" />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );

    
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        position: 'absolute',
    },
    button:{
        position: 'absolute',
        backgroundColor: '#651AE6',
        width: 60,
        height: 60,
        borderRadius: 60 /2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 10,
        shadowOpacity: 0.3,
        zIndex: 0,
        elevation: 0,
    
    },
});
export default FabButton; 
