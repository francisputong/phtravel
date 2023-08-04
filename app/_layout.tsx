import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { ClickOutsideProvider } from 'react-native-click-outside';

const Layout = () => {
    const [fontsLoaded] = useFonts({
        MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
        MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
        MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ClickOutsideProvider>
            <Stack initialRouteName='home'>
                <Stack.Screen
                    name='camera/index'
                    options={{ presentation: 'fullScreenModal' }}
                />
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
        </ClickOutsideProvider>
    );
};

export default Layout;
