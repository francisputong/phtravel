import { View, Dimensions, Keyboard, TouchableOpacity } from 'react-native';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Stack } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import Map from '../../components/Map/Map';
import styles from './home.style';
import Search from '../../components/Search/Search';
import useMap from '../../hooks/useMap';
import AppButton from '../../components/common/Button/Button';
import type { PlaceDetailsResult } from '../../api/googlePlace/types';
import type { PlaceMarker } from '../../types';
import Typography from '../../components/common/Typography/Typography';

const { height: windowHeight } = Dimensions.get('window');

type Props = {};

const home = ({}: Props) => {
    const [isBottomSheetCollapsed, setIsBottomSheetCollapsed] = useState(false);
    const [currentMarker, setCurrentMarker] = useState<PlaceMarker | null>(
        null
    );
    const [isTracking, setIsTracking] = useState(false);

    const bottomSheetRef = useRef<BottomSheet>(null);

    const mapRef = useRef<MapView | null>(null);

    const { handleAnimateToRegion } = useMap(mapRef);

    useEffect(() => {
        if (isBottomSheetCollapsed) {
            bottomSheetRef.current?.expand();
        }
    }, [isBottomSheetCollapsed]);

    const snapPoints = useMemo(() => [100, windowHeight - 100], []);

    const handleBottomSheetCollapse = () => {
        Keyboard.dismiss();
        setIsBottomSheetCollapsed(false);
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

    const handleBeginTrackSpend = () => {
        setIsTracking(true);
    };

    const handleHeaderBack = () => {
        setIsTracking(false);
        setCurrentMarker(null);
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
                            <TouchableOpacity onPress={handleHeaderBack}>
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
            {currentMarker && !isTracking && (
                <View style={styles.buttonsContainer}>
                    <AppButton
                        style={styles.startButton}
                        size='medium'
                        title='Track Spend'
                        onPress={handleBeginTrackSpend}
                    />
                </View>
            )}
            <BottomSheet
                keyboardBehavior='extend'
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
            >
                {!isBottomSheetCollapsed && currentMarker ? (
                    <View style={styles.trackingContainer}>
                        <TouchableOpacity
                            onPress={() =>
                                setIsBottomSheetCollapsed(
                                    (isCollapsed) => !isCollapsed
                                )
                            }
                        >
                            <FontAwesome
                                style={styles.searchIcon}
                                name='search'
                                size={24}
                                color='#888'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                setIsBottomSheetCollapsed(
                                    (isCollapsed) => !isCollapsed
                                )
                            }
                        >
                            <Typography variant='subheading'>
                                Browse Prices
                            </Typography>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                setIsBottomSheetCollapsed(
                                    (isCollapsed) => !isCollapsed
                                )
                            }
                        >
                            <FontAwesome
                                style={styles.searchIcon}
                                name='chevron-up'
                                size={24}
                                color='#888'
                            />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Search
                        isBottomSheetOpen={isBottomSheetCollapsed}
                        handleBottomSheetCollapse={handleBottomSheetCollapse}
                        handleFocus={setIsBottomSheetCollapsed}
                        onSelect={handleCloseSheetAndAnimate}
                    />
                )}
            </BottomSheet>
        </View>
    );
};

export default home;
