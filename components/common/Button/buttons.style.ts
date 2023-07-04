import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
    },
    mediumButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
    },
    largeButton: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;
