import { LegacyRef, MutableRefObject, useRef } from 'react';
import { Dimensions, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import phProvinces from '../../philippines-provinces.json';

function Map() {
    const mapRef = useRef<MapView | null>(null);

    const philippinesRegion = {
        latitude: 12.8797,
        longitude: 121.774,
        latitudeDelta: 14.5,
        longitudeDelta: 14.5,
    };

    const animateToRegion = (coordinates: {
        latitude: number;
        longitude: number;
    }) => {
        const newRegion = {
            latitude: coordinates.latitude, // New latitude
            longitude: coordinates.longitude, // New longitude
            latitudeDelta: 0.0922, // New latitude delta
            longitudeDelta: 0.0421, // New longitude delta
        };

        if (mapRef.current) {
            mapRef.current.animateToRegion(newRegion, 1000); // Animate to new region in 1 second
        }
    };
    const renderMarkers = () => {
        return phProvinces.provinces.map((province, index) => (
            <Marker
                onPress={() => animateToRegion(province.coordinate)}
                key={index}
                coordinate={province.coordinate}
                title={province.name}
            />
        ));
    };

    return (
        <MapView
            ref={mapRef}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            initialRegion={philippinesRegion}
            style={{ width: '100%', height: '100%' }}
        >
            {renderMarkers()}
        </MapView>
    );

    // return (
    //     <ReactNativeZoomableView
    //         maxZoom={4}
    //         minZoom={1}
    //         // zoomStep={0.5}
    //         initialZoom={1}
    //         // bindToBorders={true}
    //     >
    //         <View
    //             style={{
    //                 width: windowWidth,
    //                 aspectRatio,
    //                 flex: 1,
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //             }}
    //         >
    //             <Svg
    //                 height='70%'
    //                 width='70%'
    //                 viewBox={`0 0 ${originalWidth} ${originalHeight}`}
    //                 {...props}
    //             >
    //                 {phMapConfig.map((data) => {
    //                     return (
    //                         <Path
    //                             key={data.id}
    //                             stroke='white'
    //                             fill='black'
    //                             d={data.path}
    //                         />
    //                     );
    //                 })}
    //             </Svg>
    //         </View>
    //     </ReactNativeZoomableView>
    // );
}

export default Map;
