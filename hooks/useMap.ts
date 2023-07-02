import MapView from 'react-native-maps';

const useMap = (mapRef: React.MutableRefObject<MapView | null>) => {
    const handleAnimateToRegion = (location: {
        latitude: number;
        longitude: number;
    }) => {
        const newRegion = {
            latitude: location.latitude, // New latitude
            longitude: location.longitude, // New longitude
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
