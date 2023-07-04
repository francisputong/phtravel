import { View, Dimensions, Keyboard, TouchableOpacity } from 'react-native';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import Map from '../../components/Map/Map';
import styles from './home.style';
import Search from '../../components/Search/Search';
import useMap from '../../hooks/useMap';
import type { PlaceDetailsResult } from '../../api/googlePlace/types';
import type { PlaceMarker } from '../../types';
import AppButton from '../../components/common/Button/Button';

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
            // setIsSearchFocused(false);
        }
    }, []);

    const handleBottomSheetCollapse = () => {
        Keyboard.dismiss();
        setIsSearchFocused(false);
        bottomSheetRef.current?.collapse();
    };

    const handleCloseSheetAndAnimate = (data: PlaceDetailsResult) => {
        const { lat, lng } = data.geometry.location;

        handleAnimateToRegion({ latitude: lat, longitude: lng });
        setCurrentMarker({
            name: data.address_components[1].long_name,
            coordinate: { latitude: lat, longitude: lng },
        });

        handleBottomSheetCollapse();
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTransparent: currentMarker ? false : true,
                    headerTitle: currentMarker?.name || '',
                    headerStyle: {
                        backgroundColor: currentMarker
                            ? 'white'
                            : 'transparent',
                    },
                    headerTitleStyle: { color: 'black' },
                    headerLeft: () => {
                        return currentMarker ? (
                            <TouchableOpacity
                                onPress={() => setCurrentMarker(null)}
                            >
                                <Ionicons
                                    name='chevron-back-sharp'
                                    size={24}
                                    color='#888'
                                    style={{}}
                                />
                            </TouchableOpacity>
                        ) : null;
                    },
                }}
            />

            <Map
                mapRef={mapRef}
                currentMarker={currentMarker}
                // selectedPlaceDetails={}
                handleAnimateToRegion={handleAnimateToRegion}
            />
            {currentMarker && (
                <View style={styles.buttonsContainer}>
                    <AppButton
                        style={styles.startButton}
                        size='medium'
                        title='Track Spend'
                        onPress={() => console.log('d')}
                    />
                    <AppButton
                        style={styles.startButton}
                        size='medium'
                        color='secondary3'
                        title='Browse Prices'
                        onPress={() => console.log('d')}
                    />
                </View>
            )}
            <BottomSheet
                keyboardBehavior='extend'
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <Search
                    isBottomSheetOpen={isSearchFocused}
                    handleBottomSheetCollapse={handleBottomSheetCollapse}
                    handleFocus={setIsSearchFocused}
                    onSelect={handleCloseSheetAndAnimate}
                />
            </BottomSheet>
        </View>
    );
};

export default home;
