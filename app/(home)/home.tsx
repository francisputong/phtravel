import { View, Dimensions } from 'react-native';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Stack } from 'expo-router';
import MapView from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import Map from '../../components/Map/Map';
import styles from './home.style';
import Search from '../../components/Search/Search';
import useMap from '../../hooks/useMap';
import type { PlaceDetailsResult } from '../../api/googlePlace/types';
import type { PlaceMarker } from '../../types';

const { height: windowHeight } = Dimensions.get('window');

type Props = {};

const home = ({}: Props) => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [currentMarker, setCurrentMarker] = useState<PlaceMarker | null>(
        null
    );
    const bottomSheetRef = useRef<BottomSheet>(null);

    const mapRef = useRef<MapView | null>(null);

    const { handleAnimateToRegion } = useMap(mapRef);

    useEffect(() => {
        if (isSearchFocused) {
            bottomSheetRef.current?.expand();
        }
    }, [isSearchFocused]);

    const snapPoints = useMemo(() => [100, windowHeight - 100], []);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === 1) {
            setIsSearchFocused(false);
        }
    }, []);

    const handleCloseSheetAndAnimate = (data: PlaceDetailsResult) => {
        const { lat, lng } = data.geometry.location;

        handleAnimateToRegion({ latitude: lat, longitude: lng });
        setCurrentMarker({
            name: data.address_components[1].long_name,
            coordinate: { latitude: lat, longitude: lng },
        });

        bottomSheetRef.current?.collapse();
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerTransparent: true,
                    headerTitle: '',
                }}
            />
            <Map
                mapRef={mapRef}
                currentMarker={currentMarker}
                // selectedPlaceDetails={}
                handleAnimateToRegion={handleAnimateToRegion}
            />
            <BottomSheet
                keyboardBehavior='extend'
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <Search
                    handleFocus={setIsSearchFocused}
                    onSelect={handleCloseSheetAndAnimate}
                />
            </BottomSheet>
        </View>
    );
};

export default home;
