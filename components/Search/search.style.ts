import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: COLORS.darkModeBackground,
        // position: 'relative',
        // zIndex: 1,
    },
    header: {
        width: '100%',
        borderBottomWidth: 0.5,
    },
    headerWithBottomBorder: {
        borderBottomColor: COLORS.gray,
    },
    headerWithoutBottomBorder: {
        borderBottomColor: COLORS.darkModeBackground,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.darkModeInputBackground,
        marginHorizontal: 15,
        borderRadius: 30,
        marginBottom: 30,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        height: 40,
        width: '100%',
        color: COLORS.light,
    },
    dropdownContainer: {
        width: '100%',
        paddingBottom: 44,
    },
    dropdownItem: {
        paddingVertical: 15,
        // paddingHorizontal: 20,
        marginHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.darkModePlaceholderColor,
    },
});

export default styles;
