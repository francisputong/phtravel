import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 8,
        color: COLORS.light, // Text color for input
        backgroundColor: COLORS.darkModeInputBackground, // White background color
    },
});

export default styles;
