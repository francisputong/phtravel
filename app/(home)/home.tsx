import { View, Dimensions, Keyboard, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import Map from '../../components/Map/Map';
import styles from './home.style';
import Search from '../../components/Search/Search';
import useMap from '../../hooks/useMap';
import AppButton from '../../components/common/Button/Button';
import type { PlaceDetailsResult } from '../../api/googlePlace/types';
import type { PlaceMarker } from '../../types';
import BrowsePrices from '../../components/BrowsePrices/BrowsePrices';
import { COLORS } from '../../constants';
import Typography from '../../components/common/Typography/Typography';

const { height: windowHeight } = Dimensions.get('window');

type Props = {};

type BottomSheetContent = 'search' | 'browse';

const Home = ({}: Props) => {
    const [isBottomSheetCollapsed, setIsBottomSheetCollapsed] = useState(true);
    const [currentMarker, setCurrentMarker] = useState<PlaceMarker | null>(
        null
    );
    const [isTracking, setIsTracking] = useState(false);
    const [bottomSheetContent, setBottomSheetContent] =
        useState<BottomSheetContent>('search');

    const bottomSheetRef = useRef<BottomSheet>(null);

    const mapRef = useRef<MapView | null>(null);

    const { handleAnimateToRegion } = useMap(mapRef);
    const router = useRouter();

    useEffect(() => {
        if (!isBottomSheetCollapsed) {
            bottomSheetRef.current?.expand();
        } else {
            bottomSheetRef.current?.collapse();
        }
    }, [isBottomSheetCollapsed]);

    const snapPoints = useMemo(() => [100, windowHeight - 100], []);

    const handleBottomSheetCollapse = () => {
        Keyboard.dismiss();
        setIsBottomSheetCollapsed(true);

        if (currentMarker) setBottomSheetContent('browse');
    };

    const handleCloseSheetAndAnimate = (data: PlaceDetailsResult) => {
        setBottomSheetContent('browse');

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
        setBottomSheetContent('search');
    };

    const handleOpenSearch = () => {
        setBottomSheetContent('search');
        setIsBottomSheetCollapsed(false);
    };

    const handleBrowsePrices = () => {
        setBottomSheetContent('browse');
        setIsBottomSheetCollapsed((isCollapsed) => !isCollapsed);
    };

    const handleSheetChanges = (index: number) => {
        if (index === 0) handleBottomSheetCollapse();
        else setIsBottomSheetCollapsed(false);
    };

    const handleAddExpenseEntry = () => {
        router.push('/sheet/123/entry');
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTransparent: currentMarker ? false : true,
                    headerTitle: () => (
                        <Typography weight='Bold' color='light'>
                            {currentMarker?.name || ''}
                        </Typography>
                    ),
                    headerStyle: {
                        backgroundColor: currentMarker
                            ? COLORS.darkModeBackground
                            : 'transparent',
                    },
                    headerTitleStyle: { color: 'black' },
                    headerLeft: () => {
                        return currentMarker ? (
                            <TouchableOpacity onPress={handleHeaderBack}>
                                <FontAwesome
                                    name='chevron-left'
                                    size={24}
                                    color={COLORS.darkModePlaceholderColor}
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
            {currentMarker &&
                (!isTracking ? (
                    <>
                        <AppButton
                            style={styles.startButton}
                            size='medium'
                            title='Start Expense Tracking'
                            onPress={handleBeginTrackSpend}
                        />
                    </>
                ) : (
                    <AppButton
                        style={styles.addButton}
                        size='medium'
                        title={
                            <FontAwesome
                                name='plus'
                                size={25}
                                color={COLORS.light}
                            />
                        }
                        onPress={handleAddExpenseEntry}
                    />
                ))}
            <AppButton
                style={styles.addButton}
                size='medium'
                title={
                    <FontAwesome name='plus' size={25} color={COLORS.light} />
                }
                onPress={handleAddExpenseEntry}
            />
            <BottomSheet
                keyboardBehavior='extend'
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                handleIndicatorStyle={styles.bottomSheetHandleIndicator}
                backgroundStyle={styles.bottomSheetBackground}
                onChange={handleSheetChanges}
            >
                {bottomSheetContent === 'browse' ? (
                    <BrowsePrices
                        isTracking={isTracking}
                        isBottomSheetCollapsed={isBottomSheetCollapsed}
                        handleBrowsePrices={handleBrowsePrices}
                        handleOpenSearch={handleOpenSearch}
                    />
                ) : (
                    <Search
                        isBottomSheetCollapsed={isBottomSheetCollapsed}
                        handleBottomSheetCollapse={handleBottomSheetCollapse}
                        handleFocus={handleOpenSearch}
                        onSelect={handleCloseSheetAndAnimate}
                    />
                )}
            </BottomSheet>
        </View>
    );
};

export default Home;
