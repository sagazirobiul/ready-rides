import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {
    const mapStyles = {        
        height: "100vh",
        width: "100%",
        borderRadius: "0.8rem",
        marginBottom: '1rem'
    };
      
    const defaultCenter = {
    lat: 41.3851, lng: 2.1734
    }
    return(
        <LoadScript
        googleMapsApiKey='AIzaSyAgNKCC5w8A6JmAPiYuhQWtMg_c8b3PLaM'>
            <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
            />
        </LoadScript>
    )
}
export default MapContainer;