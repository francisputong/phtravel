import React, { useState } from 'react';
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

type Props = {
    handleFocus: (isFocused: boolean) => void;
    onSelect: (details: PlaceDetailsResult) => void;
    handleBottomSheetCollapse: () => void;
    isBottomSheetOpen: boolean;
};

const Search = ({
    isBottomSheetOpen,
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
    console.log(searchText);
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
                    {isBottomSheetOpen ? (
                        <TouchableOpacity onPress={handleBottomSheetCollapse}>
                            <Ionicons
                                name='chevron-back-sharp'
                                size={24}
                                color='#888'
                                style={styles.searchIcon}
                            />
                        </TouchableOpacity>
                    ) : (
                        <FontAwesome
                            name='search'
                            size={24}
                            color='#888'
                            style={styles.searchIcon}
                        />
                    )}

                    <BottomSheetTextInput
                        style={styles.input}
                        placeholder='Search for a place'
                        placeholderTextColor='#C0C0C0'
                        onFocus={() => handleFocus(true)}
                        // onBlur={() => handleFocus(false)}
                        onChangeText={handleSearch}
                        value={searchText}
                    />
                </View>
            </View>

            <FlatList
                data={filteredData}
                onScroll={handleScroll}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => handleSelectItem(item)}
                    >
                        <Text>{item.description}</Text>
                    </TouchableOpacity>
                )}
                style={styles.dropdownContainer}
            />
        </View>
    );
};

export default Search;
