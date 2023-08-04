import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import styles from './bottomSheetModal.style';

type Props = {
    innerRef: React.RefObject<BottomSheetModalMethods>;
    children: ReactNode;
    snapPoints: (string | number)[];
    clickOutsideRef?: React.RefObject<View>;
};

const AppBottomSheetModal = ({
    innerRef,
    clickOutsideRef,
    snapPoints,
    children,
}: Props) => {
    return (
        <View ref={clickOutsideRef}>
            <BottomSheetModal
                backgroundStyle={styles.bottomSheetModal}
                handleIndicatorStyle={styles.bottomSheetModalHandleIndicator}
                ref={innerRef}
                index={0}
                snapPoints={snapPoints}
            >
                {children}
            </BottomSheetModal>
        </View>
    );
};

export default AppBottomSheetModal;
