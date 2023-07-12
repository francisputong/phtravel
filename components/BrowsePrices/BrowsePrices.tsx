import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Typography from '../common/Typography/Typography';
import styles from './browse-prices.style';

type Props = {
    isBottomSheetCollapsed: boolean;
    handleOpenSearch: () => void;
    handleBrowsePrices: () => void;
};

const BrowsePrices = ({
    isBottomSheetCollapsed,
    handleOpenSearch,
    handleBrowsePrices,
}: Props) => {
    return (
        <View style={styles.trackingContainer}>
            <TouchableOpacity onPress={handleOpenSearch}>
                <FontAwesome
                    style={styles.searchIcon}
                    name='search'
                    size={24}
                    color='#888'
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBrowsePrices}>
                <Typography weight='Medium' variant='subheading'>
                    Browse Prices
                </Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBrowsePrices}>
                <FontAwesome
                    style={styles.searchIcon}
                    name={`chevron-${isBottomSheetCollapsed ? 'up' : 'down'}`}
                    size={24}
                    color='#888'
                />
            </TouchableOpacity>
        </View>
    );
};

export default BrowsePrices;
