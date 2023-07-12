import { Stack } from 'expo-router';
import React from 'react';

type Props = {};

const Sheet = (props: Props) => {
    return (
        <Stack.Screen
            options={{
                headerTitle: 'Sheet',
            }}
        />
    );
};

export default Sheet;
