import React, { useState } from 'react';
import {
    FlatList,
    TouchableOpacity,
    View,
    Text,
    NativeSyntheticEvent,
    NativeScrollEvent,
    TextInput,
} from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import styles from './search.style';
import type { MapLocation } from '../../types';
import useDebounce from '../../hooks/useDebounce';
import {
    getGooglePlaceAutocomplete,
    getGooglePlaceDetails,
} from '../../api/googlePlace/googlePlace';
import { PlacePrediction } from '../../api/googlePlace/types';

type Props = {
    handleFocus: (isFocused: boolean) => void;
    onSelect: (data: MapLocation) => void;
};

const Search = ({ handleFocus, onSelect }: Props) => {
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
            // console.log(error);
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
        // onSelect(item);
        try {
            const response = await getGooglePlaceDetails(item.place_id);

            // setFilteredData(response.data.predictions);
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
                    <Ionicons
                        name='search'
                        size={24}
                        color='#888'
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Search for a province'
                        placeholderTextColor='#C0C0C0'
                        onFocus={() => handleFocus(true)}
                        onBlur={() => handleFocus(false)}
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
