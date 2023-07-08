import React, { FC, ReactNode } from 'react';
import { Text, TextStyle } from 'react-native';
import { TypographyColor, TypographyVariant } from './Typohraphy.types';
import styles from './typography.style';
import { COLORS } from '../../../constants';

type Props = {
    variant?: TypographyVariant;
    style?: TextStyle | TextStyle[];
    children: ReactNode;
    color?: TypographyColor;
};

const Typography = ({
    variant = 'body',
    style,
    color = 'darkGray',
    children,
}: Props) => {
    const textStyle = [{ color: COLORS[color] }, getVariant(variant)];

    return <Text style={[textStyle, style]}>{children}</Text>;
};

const getVariant = (variant: TypographyVariant) => {
    switch (variant) {
        case 'heading':
            return styles.heading;
        case 'subheading':
            return styles.subheading;
        case 'body':
        default:
            return styles.body;
    }
};

export default Typography;
