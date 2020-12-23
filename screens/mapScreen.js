import React, {Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { ActivityIndicator, Colors } from 'react-native-paper';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class Map extends Component {
    state = {
        location: {
            coords : {
                latitude: 0,
                longitude: 0
            }
        }
    }
    componentDidMount() {
        Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
    } 
    locationChanged = (location) => {
    region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.05,
    },
        this.setState({location, region})
    }
    
    render() {
        return (
            <MapView
            style={styles.map}
            showsUserLocation={true}
            region={this.state.region}
            />
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
