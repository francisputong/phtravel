import { StyleSheet, Text, View } from 'react-native';
import { Svg, Path, SvgUri } from 'react-native-svg';
import { Redirect } from 'expo-router';

export default function Page() {
    return <Redirect href='/home' />;
}

const styles = StyleSheet.create({
    container: {},
});
