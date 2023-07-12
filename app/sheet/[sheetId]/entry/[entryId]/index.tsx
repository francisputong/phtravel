import { Stack } from 'expo-router';
import React from 'react';

type Props = {};

const EntryDetails = (props: Props) => {
    return (
        <Stack.Screen
            options={{
                headerTitle: 'EntryDetails',
            }}
        />
    );
};

export default EntryDetails;
