"use client";

import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '0.5rem'
};

// Dhaka, Bangladesh
const defaultCenter = {
    lat: 23.8103,
    lng: 90.4125
};

interface MapPickerProps {
    onLocationSelect: (lat: number, lng: number) => void;
}

export default function MapPicker({ onLocationSelect }: MapPickerProps) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD4fQbqgfndoWT-hLG0XMkIcdSg0OaJARA"
    });

    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);

    const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setMarkerPosition({ lat, lng });
            onLocationSelect(lat, lng);
        }
    }, [onLocationSelect]);

    if (!isLoaded) {
        return <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center rounded-lg">Loading Maps...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={12}
            onClick={onMapClick}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
            }}
        >
            {markerPosition && (
                <Marker position={markerPosition} />
            )}
        </GoogleMap>
    );
}
