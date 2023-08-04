import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import Typography from '../Typography';
import AppBottomSheetModal from '../BottomSheetModal';
import { COLORS } from '../../../constants';
import Container from '../Container/Container';
import { useClickOutside } from 'react-native-click-outside';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import styles from './imagePicker.style';

type Props = {};

const AppImagePicker = (props: Props) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const clickOutsideRef = useClickOutside<View>(() =>
        bottomSheetModalRef.current?.close()
    );

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        Keyboard.dismiss();
    }, []);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
        } else {
            alert('You did not select any image.');
        }
    };

    return (
        <>
            <TouchableOpacity
                onPress={handlePresentModalPress}
                style={styles.container}
            >
                <Typography weight='Medium' color='primary'>
                    Add Image
                </Typography>
            </TouchableOpacity>
            <AppBottomSheetModal
                snapPoints={[250]}
                clickOutsideRef={clickOutsideRef}
                innerRef={bottomSheetModalRef}
            >
                <Container>
                    <TouchableOpacity
                        onPress={pickImageAsync}
                        style={styles.menuItem}
                    >
                        <Ionicons
                            style={styles.menuIcon}
                            size={24}
                            name='image-outline'
                            color={COLORS.light}
                        />
                        <Typography color='light'>
                            Choose from library
                        </Typography>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            style={styles.menuIcon}
                            size={24}
                            name='camera-outline'
                            color={COLORS.light}
                        />
                        <Typography color='light'>Take photo</Typography>
                    </TouchableOpacity>
                </Container>
            </AppBottomSheetModal>
        </>
    );
};

export default AppImagePicker;
