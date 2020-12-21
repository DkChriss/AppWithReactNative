import React from 'react'
import { 
    Image, 
    StyleSheet
} from 'react-native'

const Logo = ({url}) => (
    <Image source={require('../images/logo.png')} style={styles.image} />
)

const styles = StyleSheet.create({
    image: {
        width: 145,
        height: 145,
        //marginBottom: 8,
        resizeMode: "contain",
    },
})

export default Logo
