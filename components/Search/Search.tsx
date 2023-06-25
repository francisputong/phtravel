import React, { useState } from 'react';
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import styles from './search.style';

type Props = {
    data: { name: string }[];
    handleFocus: (isFocused: boolean) => void;
};

const Search = ({ data, handleFocus }: Props) => {
    const [searchText, setSearchText] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = (text: string) => {
        setSearchText(text);
        setIsDropdownVisible(true);

        const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleSelectItem = (name: string) => {
        console.log(name);
        // setSearchText(item);
        setIsDropdownVisible(false);
        // onSelect(item);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Ionicons
                    name='search'
                    size={24}
                    color='#888'
                    style={styles.searchIcon}
                />
                <BottomSheetTextInput
                    style={styles.input}
                    placeholder='Search'
                    onFocus={() => handleFocus(true)}
                    onBlur={() => handleFocus(false)}
                    onChangeText={handleSearch}
                    value={searchText}
                />
            </View>

            {/* {isDropdownVisible && (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => handleSelectItem(item.name)}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.dropdownContainer}
                />
            )} */}
        </View>
    );
};

export default Search;
