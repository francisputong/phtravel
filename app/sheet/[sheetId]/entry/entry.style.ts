import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.darkModeBackground,
        padding: 15,
    },
    content: {
        // padding: 15,
    },
    bottomSheetModal: {
        backgroundColor: COLORS.darkModeModalBackground,
    },
    bottomSheetModalHandleIndicator: {
        backgroundColor: COLORS.darkGray,
    },
});

export default styles;
