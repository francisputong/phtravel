import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { PH_COORDINATES } from '../../constants';
import { PlaceMarker } from '../../types';

type Props = {
    mapRef: React.MutableRefObject<MapView | null>;
    currentMarker: PlaceMarker | null;
    handleAnimateToRegion: (location: {
        latitude: number;
        longitude: number;
    }) => void;
};

const Map = ({ mapRef, currentMarker, handleAnimateToRegion }: Props) => {
    // const renderCurrentMarker = () => {
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
            mapPadding={{ top: 0, left: 0, right: 0, bottom: 130 }}
            style={{ width: '100%', height: '100%' }}
        >
            {currentMarker && (
                <Marker
                    onPress={() =>
                        handleAnimateToRegion(currentMarker.coordinate)
                    }
                    coordinate={currentMarker.coordinate}
                    title={currentMarker.name}
                />
            )}
            {/* {renderCurrentMarker()} */}
        </MapView>
    );
};

export default Map;
