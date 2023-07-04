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
        width: '48%',
    },
});

export default styles;
