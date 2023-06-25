import { View, Keyboard, Dimensions } from 'react-native';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Stack, useRouter } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import Map from '../../components/Map/Map';
import styles from './home.style';
import Search from '../../components/Search/Search';
import phProvinces from '../../philippines-provinces.json';

const { height: windowHeight } = Dimensions.get('window');

type Props = {};

const home = ({}: Props) => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        if (isSearchFocused) {
            bottomSheetRef.current?.expand();
        }
    }, [isSearchFocused]);

    const snapPoints = useMemo(() => [100, windowHeight - 50], []);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === 1) {
            setIsSearchFocused(false);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerTransparent: true,
                    headerTitle: '',
                }}
            />
            <Map />
            <BottomSheet
                keyboardBehavior='extend'
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <Search
                    handleFocus={setIsSearchFocused}
                    data={phProvinces.provinces}
                />
            </BottomSheet>
        </View>
    );
};

export default home;
