import { Stack } from 'expo-router';
import React from 'react';

type Props = {};

const SheetDetails = (props: Props) => {
    return (
        <Stack.Screen
            options={{
                headerTitle: 'sheetDetails',
            }}
        />
    );
};

export default SheetDetails;
