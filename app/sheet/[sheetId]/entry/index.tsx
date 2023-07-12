import { Stack } from 'expo-router';
import React from 'react';

type Props = {};

const Entry = (props: Props) => {
    return (
        <Stack.Screen
            options={{
                headerTitle: 'Entry',
            }}
        />
    );
};

export default Entry;
