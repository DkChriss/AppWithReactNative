import React, {Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { ActivityIndicator, Colors } from 'react-native-paper'

//DB 
import firebase from '../../database/firebase'
//CONST
const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
const GOOGLE_MAPS_APIKEY = 'AIzaSyBhhNqCp2WyczFOJ7OebEHVn76QBW3xrMI'

export default class Map extends Component {

    state = {
        location: {
            coords : {
                latitude: 0,
                longitude: 0
            }
        },
        origin: {
            latitude: 0,
            longitude: 0,
        },
        destination: {
            name: '',
            location: {
                latitude: 0,
                longitude: 0
            }
        }
    }

    async componentDidMount() {

        const {status} = await Permissions.getAsync(Permissions.LOCATION)
        if (status !== 'granted') {
            alert('Active la localizacion')
            return
        }

        Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged)

        if (
            this.props && this.props.route && 
            this.props.route.params && this.props.route.params.userId
        ) {
            let id = this.props.route.params.userId
            this.getLocation(id);
        }
    }
    
    getLocation = async (id) => {
        let user = firebase.firebase.auth().currentUser;
        let dbRef = firebase.db.collection(user.email).doc(id);
        let doc = await dbRef.get();
        let contact = doc.data();
        this.setState({
            ...this.state,
            destination: {
                name: contact.name + ' ' +contact.lastname,
                description: contact.alias,
                location: contact.location
            }
        })
        
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
            region,
            origin:{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }})
    }
    render() {
        const origin = this.state.origin
        const name = this.state.destination.name
        const description = this.state.destination.description
        const destination = this.state.destination.location
        if (destination.latitude === 0 || destination.longitude === 0) {
            return (
                <ActivityIndicator animating={true} color={Colors.red800} />
            )
        }
        return (
            <View>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    region={this.state.region}
                >
                    <Marker
                        coordinate={destination}
                        title={name}
                        description={description}
                    /> 
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                    />
                </MapView>
            </View>
            
        );
    }

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
