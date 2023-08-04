import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        justifyContent: 'center',
    },
    camera: {
        // flex: 1,
        aspectRatio: 3 / 4,
        bottom: 20,
    },
    takePictureButton: {
        position: 'absolute',
        bottom: 30,
        backgroundColor: 'blue',
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    flipScreenButton: {
        position: 'absolute',
        top: 30,
        right: 20,
        padding: 10,
    },
});

export default styles;
