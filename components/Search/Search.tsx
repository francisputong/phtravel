import React, { useCallback, useState } from 'react';
import {
    FlatList,
    TouchableOpacity,
    View,
    Text,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styles from './search.style';
import useDebounce from '../../hooks/useDebounce';
import {
    getGooglePlaceAutocomplete,
    getGooglePlaceDetails,
} from '../../api/googlePlace/googlePlace';
import type {
    PlaceDetailsResult,
    PlacePrediction,
} from '../../api/googlePlace/types';
import Typography from '../common/Typography/Typography';
import { COLORS } from '../../constants';

type Props = {
    handleFocus: (isFocused: boolean) => void;
    onSelect: (details: PlaceDetailsResult) => void;
    handleBottomSheetCollapse: () => void;
    isBottomSheetCollapsed: boolean;
};

const Search = ({
    isBottomSheetCollapsed,
    handleFocus,
    handleBottomSheetCollapse,
    onSelect,
}: Props) => {
    const [searchText, setSearchText] = useState('');
    const [isAtStart, setIsAtStart] = useState(true);
    const [filteredData, setFilteredData] = useState<PlacePrediction[]>([]);

    useDebounce(searchText, 500, (text) => handleSearchPlace(text));

    const handleSearch = async (text: string) => {
        setSearchText(text);
    };

    const handleSearchPlace = async (searchQuery: string) => {
        if (!searchQuery) return;

        try {
            const { data } = await getGooglePlaceAutocomplete(searchQuery);

            setFilteredData(data.predictions);
        } catch (error) {
            console.log(error);
        }
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset } = event.nativeEvent;

        if (contentOffset.y <= 0) {
            setIsAtStart(true);
        } else {
            setIsAtStart(false);
        }
    };

    const handleSelectItem = async (item: PlacePrediction) => {
        // setSearchText(item);
        try {
            const {
                data: { result },
            } = await getGooglePlaceDetails(item.place_id);
            onSelect(result);
            setSearchText('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.header,
                    isAtStart
                        ? styles.headerWithoutBottomBorder
                        : styles.headerWithBottomBorder,
                ]}
            >
                <View style={[styles.inputContainer]}>
                    {!isBottomSheetCollapsed ? (
                        <View style={{ width: 40 }}>
                            <TouchableOpacity
                                onPress={handleBottomSheetCollapse}
                            >
                                <Ionicons
                                    name='chevron-back-sharp'
                                    size={24}
                                    color={COLORS.darkModePlaceholderColor}
                                    style={styles.searchIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ width: 40 }}>
                            <FontAwesome
                                name='search'
                                size={24}
                                color={COLORS.darkModePlaceholderColor}
                                style={styles.searchIcon}
                            />
                        </View>
                    )}
                    <BottomSheetTextInput
                        style={styles.input}
                        placeholder='Search for a place'
                        placeholderTextColor={COLORS.darkModePlaceholderColor}
                        onFocus={() => handleFocus(true)}
                        onChangeText={handleSearch}
                        value={searchText}
                    />
                </View>
            </View>
            {filteredData.length > 0 && (
                <FlatList
                    data={filteredData}
                    onScroll={handleScroll}
                    keyExtractor={(item) => item.place_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => handleSelectItem(item)}
                        >
                            <Typography weight='Bold' color='light'>
                                {item.description}
                            </Typography>
                        </TouchableOpacity>
                    )}
                    style={styles.dropdownContainer}
                />
            )}
        </View>
    );
};

export default Search;
