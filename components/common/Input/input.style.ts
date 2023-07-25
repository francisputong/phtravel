import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        fontSize: 16,
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 4,
        color: COLORS.light, // Text color for input
        backgroundColor: COLORS.darkModeInputBackground, // White background color
    },
});

export default styles;
