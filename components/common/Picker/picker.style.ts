import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

const styles = StyleSheet.create({
    picker: {
        justifyContent: 'center',
        // backgroundColor: 'tomato',
    },
    options: {
        color: COLORS.light,
    },
    bottomSheetModal: {
        backgroundColor: COLORS.darkModeModalBackground,
    },
    bottomSheetModalHandleIndicator: {
        backgroundColor: COLORS.darkGray,
    },
});

export default styles;
