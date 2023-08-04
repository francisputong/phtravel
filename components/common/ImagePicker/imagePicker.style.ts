import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.darkModeInputBackground,
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 10,
        justifyContent: 'center',
        marginBottom: 16,
    },
    menu: {
        padding: 18,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    menuIcon: {
        paddingRight: 16,
    },
});

export default styles;
