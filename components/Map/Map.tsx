import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { PH_COORDINATES } from '../../constants';
import { MapLocation } from '../../types';
import { GOOGLE_PLACE_API_URL } from '@env';

type Props = {
    mapRef: React.MutableRefObject<MapView | null>;
    handleAnimateToRegion: (location: MapLocation) => void;
};

const Map = ({ mapRef, handleAnimateToRegion }: Props) => {
    // const renderMarkers = () => {
    //     return phProvinces.provinces.map((province, index) => (
    //         <Marker
    //             onPress={() => handleAnimateToRegion(province)}
    //             key={index}
    //             coordinate={province.coordinate}
    //             title={province.name}
    //         />
    //     ));
    // };

    return (
        <MapView
            ref={mapRef}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            initialRegion={PH_COORDINATES}
            style={{ width: '100%', height: '100%' }}
        >
            {/* {renderMarkers()} */}
        </MapView>
    );
};

export default Map;
