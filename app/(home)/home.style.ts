import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    startButton: {
        position: 'absolute',
        bottom: 120,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
    },
    addButton: {
        position: 'absolute',
        bottom: 120,
        right: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 50,
        height: 65,
        width: 65,
        elevation: 5, // Adjust the shadow depth as needed
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    trackingContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    bottomSheetBackground: {
        backgroundColor: COLORS.darkModeBackground,
    },
    bottomSheetHandleIndicator: {
        backgroundColor: COLORS.darkGray,
    },
});

export default styles;
