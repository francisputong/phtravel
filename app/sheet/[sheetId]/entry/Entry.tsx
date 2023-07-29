import { Stack, useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '../../../../components/common/Typography';
import Input from '../../../../components/common/Input';
import { CATEGORIES, COLORS } from '../../../../constants';
import AppButton from '../../../../components/common/Button';
import { structure, validationSchema, EntryDetails } from './formStructure';
import AppPicker from '../../../../components/common/Picker';
import AppImagePicker from '../../../../components/common/ImagePicker';
import Container from '../../../../components/common/Container';
import styles from './entry.style';

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

    return (
        <BottomSheetModalProvider>
            <Container style={styles.container}>
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
                                    } else if (data.type === 'picker') {
                                        return (
                                            <AppPicker
                                                error={errors[data.name]}
                                                placeholder={data.placeholder}
                                                list={CATEGORIES}
                                                value={value}
                                                onValueChange={onChange}
                                            />
                                        );
                                    } else {
                                        return <AppImagePicker />;
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
            </Container>
        </BottomSheetModalProvider>
    );
};

export default Entry;
