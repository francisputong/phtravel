import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // position: 'relative',
        // zIndex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        backgroundColor: COLORS.gray,
        borderRadius: 30,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        height: 40,
        width: '100%',
        color: '#424242',
    },
    dropdownContainer: {
        position: 'absolute',
        top: 40,
        left: 12,
        right: 12,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
        maxHeight: 200,
    },
    dropdownItem: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default styles;
