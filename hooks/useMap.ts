import MapView from 'react-native-maps';
import type { MapLocation } from '../types';

const useMap = (mapRef: React.MutableRefObject<MapView | null>) => {
    const handleAnimateToRegion = (location: MapLocation) => {
        const newRegion = {
            latitude: location.coordinate.latitude, // New latitude
            longitude: location.coordinate.longitude, // New longitude
            latitudeDelta: 0.0922, // New latitude delta
            longitudeDelta: 0.0421, // New longitude delta
        };

        if (mapRef.current) {
            mapRef.current.animateToRegion(newRegion, 1000); // Animate to new region in 1 second
        }
    };

    return { handleAnimateToRegion };
};

export default useMap;
