import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.divider, // Light gray border color
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 8,
        color: COLORS.darkGray, // Text color for input
        backgroundColor: 'white', // White background color
    },
});

export default styles;
