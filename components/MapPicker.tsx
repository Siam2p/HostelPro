"use client";

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon missing in React Leaflet
const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

interface MapPickerProps {
    onLocationSelect: (lat: number, lng: number) => void;
    initialLocation?: { lat: number, lng: number };
}

function LocationMarker({ onSelect, initialPos }: { onSelect: (lat: number, lng: number) => void, initialPos?: L.LatLng | null }) {
    const [position, setPosition] = useState<L.LatLng | null>(initialPos || null);

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onSelect(e.latlng.lat, e.latlng.lng);
        },
    });

    return position === null ? null : (
        <Marker position={position} icon={icon}></Marker>
    );
}

export default function MapPicker({ onLocationSelect, initialLocation }: MapPickerProps) {
    const defaultCenter: [number, number] = initialLocation
        ? [initialLocation.lat, initialLocation.lng]
        : [23.8103, 90.4125]; // Dhaka

    const initialLatLng = initialLocation ? new L.LatLng(initialLocation.lat, initialLocation.lng) : null;

    return (
        <MapContainer
            center={defaultCenter}
            zoom={13}
            style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker onSelect={onLocationSelect} initialPos={initialLatLng} />
        </MapContainer>
    );
}
