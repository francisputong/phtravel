import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

const styles = StyleSheet.create({
    dark: {
        color: COLORS.darkGray,
    },
    light: {
        color: COLORS.light,
    },
    heading: {
        fontSize: 24,
    },
    subheading: {
        fontSize: 18,
    },
    body: {
        fontSize: 16,
    },
    subtext: {
        fontSize: 14,
    },
});

export default styles;
