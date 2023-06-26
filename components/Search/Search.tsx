import React, { useEffect, useMemo, useState } from 'react';
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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import styles from './search.style';
import type {
    MapLocation,
    PlaceAutocompleteResponse,
    PlacePrediction,
} from '../../types';
import useDebounce from '../../hooks/useDebounce';

type Props = {
    data: MapLocation[];
    handleFocus: (isFocused: boolean) => void;
    onSelect: (data: MapLocation) => void;
};

const Search = ({ data, handleFocus, onSelect }: Props) => {
    const [searchText, setSearchText] = useState('');
    const [isAtStart, setIsAtStart] = useState(true);
    const [filteredData, setFilteredData] = useState<PlacePrediction[]>([]);

    useDebounce(searchText, 500, (text) => handleSearchPlace(text));

    const handleSearch = async (text: string) => {
        setSearchText(text);
        // try {
        //     const response = await axios.get(
        //         `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAwDHxcPhySx-LxFOA2SODOLRSt2p8Fcms&input=${text}&types=(cities)&language=en&components=country:ph`
        //     );

        //     console.log(response);
        // } catch (error) {
        //     console.log(error);
        // }

        // const filtered = data.filter((item) =>
        //     item.name.toLowerCase().includes(text.toLowerCase())
        // );

        // setFilteredData(filtered);
    };

    const handleSearchPlace = async (searchQuery: string) => {
        if (!searchQuery) return;

        try {
            const response = await axios.get<PlaceAutocompleteResponse>(
                `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
                {
                    params: {
                        input: searchQuery,
                        types: 'administrative_area_level_3|locality|tourist_attraction',
                        language: 'en',
                        components: 'country:ph',
                        key: '',
                    },
                }
            );
            console.log(response);
            setFilteredData(response.data.predictions);
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
        // onSelect(item);
        console.log(item.place_id);
        try {
            const response = await axios.get<any>(
                `https://maps.googleapis.com/maps/api/place/details/json`,
                {
                    params: {
                        placeid: item.place_id,
                        key: '',
                    },
                }
            );
            console.log(response);
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
