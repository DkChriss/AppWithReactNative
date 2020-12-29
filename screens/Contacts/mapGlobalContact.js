import React, {Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { ActivityIndicator, Colors } from 'react-native-paper'
import AnimatedSplash from 'react-native-animated-splash-screen';
//DB 
import firebase from '../../database/firebase'
//CONST
const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
const GOOGLE_MAPS_APIKEY = 'AIzaSyBhhNqCp2WyczFOJ7OebEHVn76QBW3xrMI'


export default class MapGlobal extends Component {

    state = {
        location: {
            coords : {
                latitude: 0,
                longitude: 0
            }
        },
        contacts: []
    }
    user  = firebase.firebase.auth().currentUser

    async componentDidMount() {

        const {status} = await Permissions.getAsync(Permissions.LOCATION)
        if (status !== 'granted') {
            alert('Active la localizacion')
            return
        }

        Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged)
        this.getContacts();
    }

    locationChanged = (location) => {
        region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.05,
        },
        this.setState({
            ...this.state, 
            region
        })
    }

    getContacts = async () => {
        firebase.db.collection(this.user.email).onSnapshot(querySnapshot => {
            let contacts = [];
                querySnapshot.docs.forEach(value => {
                const {name,lastname,alias,location} = value.data();
                contacts.push({
                id: value.id,
                name,
                lastname,
                alias,
                location
                });
            })
            this.setState({  
                ...this.state,
                contacts: contacts
            });
        })
    }

    render() {
        return(
            <View>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    region={this.state.region}
                >
                {
                    this.state.contacts.map(contact => {
                        return(
                            <Marker
                                key={contact.id}
                                coordinate={contact.location}
                                title={contact.name + '' + contact.lastname}
                                description={contact.alias}
                            /> 
                        )
                    })
                }
                </MapView>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});