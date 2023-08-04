import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './camera.style';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import Typography from '../../components/common/Typography';
import { Stack, useRouter } from 'expo-router';
import Button from '../../components/common/Button';

type Props = {};

const AppCamera = (props: Props) => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const router = useRouter();

    const cameraRef = useRef<Camera>(null);

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            // Do something with the photo, like save it or display it in your app
            console.log('Photo taken:', photo);
        }
    };

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Typography style={{ textAlign: 'center' }}>
                    We need your permission to show the camera
                </Typography>
                <Button onPress={requestPermission} title='grant permission' />
            </View>
        );
    }

    function toggleCameraType() {
        // cameraRef.current.tak
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{ headerTransparent: true, headerTitle: '' }}
            />
            <Camera ref={cameraRef} style={styles.camera} type={type} />
            <TouchableOpacity
                style={styles.takePictureButton}
                onPress={takePhoto}
            >
                <View style={styles.innerButton} />
            </TouchableOpacity>

            {/* Flip screen button */}
            <TouchableOpacity
                style={styles.flipScreenButton}
                onPress={toggleCameraType}
            >
                <Ionicons
                    name='camera-reverse-outline'
                    size={24}
                    color='white'
                />
            </TouchableOpacity>
        </View>
    );
};

export default AppCamera;
