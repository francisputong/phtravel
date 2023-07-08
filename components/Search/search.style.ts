import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
        // position: 'relative',
        // zIndex: 1,
    },
    header: {
        width: '100%',
        borderBottomWidth: 0.5,
        backgroundColor: '#fff',
    },
    headerWithBottomBorder: {
        borderBottomColor: COLORS.divider,
        shadowColor: COLORS.divider,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    headerWithoutBottomBorder: {
        borderBottomColor: COLORS.light,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.gray,
        marginHorizontal: 20,
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
        // color: D,
    },
    dropdownContainer: {
        width: '100%',
        paddingBottom: 44,
    },
    dropdownItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default styles;
