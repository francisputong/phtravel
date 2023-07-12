import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import styles from './entry.style';
import Typography from '../../../../components/common/Typography/Typography';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {};

const Entry = (props: Props) => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <Typography weight='Bold'>
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
        </View>
    );
};

export default Entry;
