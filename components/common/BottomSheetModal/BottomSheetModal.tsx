import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useClickOutside } from 'react-native-click-outside';
import styles from './bottomSheetModal.style';

type Props = {
    innerRef: React.RefObject<BottomSheetModalMethods>;
    children: ReactNode;
    snapPoints: (string | number)[];
};

const AppBottomSheetModal = ({ innerRef, snapPoints, children }: Props) => {
    const ref = useClickOutside<View>(() => innerRef.current?.close());

    return (
        <View ref={ref}>
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
