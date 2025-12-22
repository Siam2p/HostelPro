"use client";

import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '1rem'
};

interface MapViewerProps {
    lat: number;
    lng: number;
    name: string;
}

export default function MapViewer({ lat, lng, name }: MapViewerProps) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD4fQbqgfndoWT-hLG0XMkIcdSg0OaJARA"
    });

    const center = { lat, lng };

    if (!isLoaded) {
        return <div className="h-[300px] w-full bg-gray-100 animate-pulse flex items-center justify-center rounded-2xl">Loading Maps...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
            }}
        >
            <Marker
                position={center}
                title={name}
            />
        </GoogleMap>
    );
}
