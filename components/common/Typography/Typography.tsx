import React, { FC, ReactNode } from 'react';
import { Text, TextStyle } from 'react-native';
import {
    TypographyColor,
    TypographyVariant,
    TypographyWeight,
} from './Typohraphy.types';
import styles from './typography.style';
import { COLORS } from '../../../constants';

type Props = {
    variant?: TypographyVariant;
    style?: TextStyle | TextStyle[];
    children: ReactNode;
    color?: TypographyColor;
    weight?: TypographyWeight;
};

const Typography = ({
    variant = 'body',
    style,
    color = 'darkGray',
    weight = 'Regular',
    children,
}: Props) => {
    const textStyle = [
        { color: COLORS[color], fontFamily: `Montserrat${weight}` },
        getVariant(variant),
    ];

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
