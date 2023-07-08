import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 120,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '90%',
    },
    startButton: {
        width: '100%',
    },
    trackingContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    searchIcon: {
        // padding: 5,
    },
});

export default styles;
