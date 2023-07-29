import React, { useCallback, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import AppBottomSheetModal from '../BottomSheetModal';
import { Keyboard, TouchableOpacity } from 'react-native';
import Input from '../Input';
import styles from './picker.style';
import { FieldError } from 'react-hook-form';

interface PickerProps {
    value?: string;
    onValueChange: (value: string) => void;
    list: string[];
    placeholder?: string;
    error: FieldError | undefined;
}

const AppPicker: React.FC<PickerProps> = ({
    value,
    list,
    placeholder,
    error,
    onValueChange,
}) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        Keyboard.dismiss();
    }, []);

    return (
        <>
            <TouchableOpacity onPress={handlePresentModalPress}>
                <Input
                    pointerEvents='none'
                    editable={false}
                    value={value}
                    placeholder={placeholder}
                    error={error}
                />
            </TouchableOpacity>
            <AppBottomSheetModal
                snapPoints={[250]}
                innerRef={bottomSheetModalRef}
            >
                <Picker
                    style={styles.picker}
                    itemStyle={styles.options}
                    selectedValue={value}
                    onValueChange={onValueChange}
                >
                    {list.map((item) => {
                        return (
                            <Picker.Item key={item} label={item} value={item} />
                        );
                    })}
                </Picker>
            </AppBottomSheetModal>
        </>
    );
};

export default AppPicker;
