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
        fontWeight: 'bold',
    },
    subheading: { fontSize: 18, fontWeight: '600' },
    body: {
        fontSize: 16,
    },
});

export default styles;
