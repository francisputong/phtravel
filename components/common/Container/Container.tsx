import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import styles from './container.style';

type Props = {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
};

const Container = ({ children, style }: Props) => {
    return <View style={[styles.container, style]}>{children}</View>;
};

export default Container;
