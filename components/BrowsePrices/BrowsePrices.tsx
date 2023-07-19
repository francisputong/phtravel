import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Typography from '../common/Typography/Typography';
import styles from './browse-prices.style';
import { COLORS } from '../../constants';

type Props = {
    isTracking: boolean;
    isBottomSheetCollapsed: boolean;
    handleOpenSearch: () => void;
    handleBrowsePrices: () => void;
};

const BrowsePrices = ({
    isTracking,
    isBottomSheetCollapsed,
    handleOpenSearch,
    handleBrowsePrices,
}: Props) => {
    return (
        <View style={styles.trackingContainer}>
            <TouchableOpacity disabled={isTracking} onPress={handleOpenSearch}>
                <FontAwesome
                    style={styles.searchIcon}
                    name='search'
                    size={24}
                    color={
                        isTracking
                            ? COLORS.darkModeBackground
                            : COLORS.darkModePlaceholderColor
                    }
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBrowsePrices}>
                <Typography weight='Medium' color='light' variant='subheading'>
                    Browse Prices
                </Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBrowsePrices}>
                <FontAwesome
                    style={styles.searchIcon}
                    name={`chevron-${isBottomSheetCollapsed ? 'up' : 'down'}`}
                    size={24}
                    color={COLORS.darkModePlaceholderColor}
                />
            </TouchableOpacity>
        </View>
    );
};

export default BrowsePrices;
