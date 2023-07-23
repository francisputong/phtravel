import React, { useMemo } from 'react';
import { Picker } from '@react-native-picker/picker';
import styles from './picker.style';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

interface PickerProps {
    value?: string;
    onValueChange: (value: string) => void;
    list: string[];
    innerRef: React.RefObject<BottomSheetModalMethods>;
}

const AppPicker: React.FC<PickerProps> = ({
    value,
    list,
    innerRef,
    onValueChange,
}) => {
    const snapPoints = useMemo(() => [250], []);

    return (
        <BottomSheetModal
            backgroundStyle={styles.bottomSheetModal}
            handleIndicatorStyle={styles.bottomSheetModalHandleIndicator}
            ref={innerRef}
            index={0}
            snapPoints={snapPoints}
        >
            <Picker
                style={styles.picker}
                itemStyle={styles.options}
                selectedValue={value}
                onValueChange={onValueChange}
            >
                {list.map((item) => {
                    return <Picker.Item key={item} label={item} value={item} />;
                })}
            </Picker>
        </BottomSheetModal>
    );
};

export default AppPicker;
