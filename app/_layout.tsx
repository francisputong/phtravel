import { Stack } from 'expo-router';

const Layout = () => {
    return (
        <Stack initialRouteName='home'>
            <Stack.Screen
                name='sheet/index'
                options={{ presentation: 'modal' }}
            />
            <Stack.Screen
                name='sheet/[sheetId]/index'
                options={{ presentation: 'modal' }}
            />
            <Stack.Screen
                name='sheet/[sheetId]/entry/index'
                options={{ presentation: 'modal' }}
            />
            <Stack.Screen
                name='sheet/[sheetId]/entry/[entryId]/index'
                options={{ presentation: 'modal' }}
            />
        </Stack>
    );
};

export default Layout;
