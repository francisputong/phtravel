import { Stack, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useRef } from 'react';
import { View, TouchableOpacity, Keyboard } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './entry.style';
import Typography from '../../../../components/common/Typography';
import Input from '../../../../components/common/Input';
import { CATEGORIES, COLORS } from '../../../../constants';
import AppButton from '../../../../components/common/Button';
import { structure, validationSchema, EntryDetails } from './formStructure';
import AppPicker from '../../../../components/common/Picker/Picker';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useClickOutside } from 'react-native-click-outside';

type Props = {};

const Entry = (props: Props) => {
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm<EntryDetails>({
        resolver: yupResolver(validationSchema),
    });

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const onSubmit = (data: EntryDetails) => {
        console.log(data);
    };

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        Keyboard.dismiss();
    }, []);

    const ref = useClickOutside<View>(() =>
        bottomSheetModalRef.current?.close()
    );

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <Stack.Screen
                    options={{
                        headerStyle: {
                            backgroundColor: COLORS.darkModeBackground,
                        },
                        headerTitle: () => (
                            <Typography color='light' weight='Bold'>
                                Create Expense Log
                            </Typography>
                        ),
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => router.back()}>
                                <Typography weight='Medium' color='primary'>
                                    Cancel
                                </Typography>
                            </TouchableOpacity>
                        ),
                    }}
                />
                <View style={styles.content}>
                    {structure.map((data) => {
                        return (
                            <Controller
                                key={data.name}
                                control={control}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => {
                                    if (
                                        data.type === 'textarea' ||
                                        data.type === 'text'
                                    ) {
                                        return (
                                            <Input
                                                onFocus={() =>
                                                    bottomSheetModalRef.current?.close()
                                                }
                                                keyboardType={data.keyboardType}
                                                multiline={
                                                    data.type === 'textarea'
                                                }
                                                onBlur={onBlur}
                                                onChangeText={(text) => {
                                                    onChange(text);
                                                    trigger(data.name);
                                                }}
                                                value={value}
                                                placeholder={data.placeholder}
                                                error={errors[data.name]}
                                            />
                                        );
                                    } else {
                                        return (
                                            <>
                                                <TouchableOpacity
                                                    onPress={
                                                        handlePresentModalPress
                                                    }
                                                >
                                                    <Input
                                                        pointerEvents='none'
                                                        editable={false}
                                                        value={value}
                                                        placeholder={
                                                            data.placeholder
                                                        }
                                                        error={
                                                            errors[data.name]
                                                        }
                                                    />
                                                </TouchableOpacity>
                                                <View ref={ref}>
                                                    <AppPicker
                                                        innerRef={
                                                            bottomSheetModalRef
                                                        }
                                                        list={CATEGORIES}
                                                        value={value}
                                                        onValueChange={onChange}
                                                    />
                                                </View>
                                            </>
                                        );
                                    }
                                }}
                                name={data.name}
                                defaultValue={data.defaultValue}
                            />
                        );
                    })}
                    <AppButton
                        size='small'
                        title='Done'
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </View>
        </BottomSheetModalProvider>
    );
};

export default Entry;
