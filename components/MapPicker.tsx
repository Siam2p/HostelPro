"use client"; // Indicates this component runs on the client-side (browser), needed for React hooks and Leaflet

// Importing React and the useState hook to manage component state
import React, { useState, useEffect } from 'react';

// Importing Leaflet components from 'react-leaflet' library wrapper
// MapContainer: The main wrapper for the map
// TileLayer: Displays the map tiles (images of the map)
// Marker: A pin on the map
// useMap: Hook to access the map instance
// useMapEvents: Hook to listen to map events like click
// LayersControl: Control to switch between different map layers (e.g., Satellite vs Street)
import { MapContainer, TileLayer, Marker, useMapEvents, LayersControl, useMap } from 'react-leaflet';

// Importing Leaflet's default CSS to style the map correctly
import 'leaflet/dist/leaflet.css';

// Importing the core Leaflet library 'L' for accessing Leaflet types and utilities
import L from 'leaflet';

// ----------------------------------------------------------------------
// Fix for default marker icon missing in React Leaflet
// React Leaflet sometimes has issues loading default icons, so we define one manually using L.icon
const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',       // URL for the marker image
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png', // URL for high-res screens
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',   // URL for the shadow image
    iconSize: [25, 41],     // Size of the icon in pixels
    iconAnchor: [12, 41]    // Point of the icon which will correspond to marker's location (tip of the pin)
});
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// TypeScript Interface for the Props (Properties) passed to the MapPicker component
interface MapPickerProps {
    // Function prop to send the selected Latitude (lat) and Longitude (lng) back to the parent component
    onLocationSelect?: (lat: number, lng: number) => void;

    // Optional prop for the initial location if editing an existing location
    initialLocation?: { lat: number, lng: number };

    // Optional prop to make the map view-only
    readOnly?: boolean;
}
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// Internal Component: MapInvalidator
// This component handles the resizing of the map when it's rendered inside a modal or hidden container.
// It forces the map to recalculate its size effectively.
function MapInvalidator() {
    const map = useMap();

    useEffect(() => {
        // Invalidate size immediately
        map.invalidateSize();

        // And/or after a short timeout to account for modal animations
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 300); // 300ms matches typical CSS transition times

        return () => clearTimeout(timer);
    }, [map]);

    return null;
}

// ----------------------------------------------------------------------
// Internal Component: LocationMarker
// This component handles the click event on the map and places the marker.
// It is separate because it needs access to the map instance via `useMapEvents` hook, which must be inside `MapContainer`.
function LocationMarker({ onSelect, initialPos, readOnly }: { onSelect?: (lat: number, lng: number) => void, initialPos?: L.LatLng | null, readOnly?: boolean }) {
    // State to hold the current position of the marker. 
    // initialized with initialPos if provided, otherwise null (no marker initially)
    const [position, setPosition] = useState<L.LatLng | null>(initialPos || null);

    // React Leaflet hook to attach event listeners to the map
    useMapEvents({
        // 'click' event handler: triggers when user clicks anywhere on the map
        click(e) {
            if (readOnly) return;
            setPosition(e.latlng); // Update local state to show the marker at clicked position
            if (onSelect) onSelect(e.latlng.lat, e.latlng.lng); // Call the parent function to return the selected coordinates
        },
    });

    // If position is null (user hasn't clicked yet), render nothing.
    // If position exists, render a Marker at that position using our custom icon.
    return position === null ? null : (
        <Marker position={position} icon={icon}></Marker>
    );
}
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// Main Exported Component: MapPicker
// This is the component used by other parts of the application.
export default function MapPicker({ onLocationSelect, initialLocation, readOnly }: MapPickerProps) {
    // Determine the default center of the map.
    // If an initialLocation is provided, use that.
    // Otherwise, default to Dhaka coordinates [23.8103, 90.4125].
    const defaultCenter: [number, number] = initialLocation
        ? [initialLocation.lat, initialLocation.lng]
        : [23.8103, 90.4125]; // Dhaka

    // Convert the simplified initialLocation object into a Leaflet LatLng object if it exists.
    // This is passed to the LocationMarker component.
    const initialLatLng = initialLocation ? new L.LatLng(initialLocation.lat, initialLocation.lng) : null;

    return (
        // MapContainer initializes the map.
        // center: where the map starts looking
        // zoom: initial zoom level (13 is street/neighborhood level)
        // style: CSS styles for the map container
        <MapContainer
            center={defaultCenter}
            zoom={13}
            style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
        >
            <MapInvalidator />

            {/* LayersControl allows the user to switch between different map styles (Satellite vs Street) */}
            <LayersControl position="topright">

                {/* BaseLayer 1: Satellite View (Google Maps) */}
                {/* 'checked' means this is the default layer */}
                <LayersControl.BaseLayer checked name="Satellite (Google)">
                    <TileLayer
                        attribution='&copy; Google Maps' // Attribution text
                        url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" // Google Hybrid Tiles URL
                    />
                </LayersControl.BaseLayer>

                {/* BaseLayer 2: Standard Street View (OpenStreetMap) */}
                <LayersControl.BaseLayer name="Street (OpenStreetMap)">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMap Tiles URL
                    />
                </LayersControl.BaseLayer>

            </LayersControl>

            {/* Render our internal LocationMarker component to handle clicks and show the pin */}
            {/* We pass the initialLatLng so the marker appears if editing */}
            <LocationMarker onSelect={onLocationSelect} initialPos={initialLatLng} readOnly={readOnly} />
        </MapContainer>
    );
}
// ----------------------------------------------------------------------
