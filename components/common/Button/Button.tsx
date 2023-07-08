import React from 'react';
import { TouchableOpacity, Text, TextStyle, ViewStyle } from 'react-native';
import styles from './buttons.style';
import { COLORS } from '../../../constants';
import { ButtonColor, ButtonSize } from './Button.types';
import Typography from '../Typography/Typography';

interface ButtonProps {
    title: string;
    onPress: () => void;
    color?: ButtonColor;
    size?: ButtonSize;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    color = 'primary',
    size = 'medium',
    style,
    textStyle,
}) => {
    const colorValue = COLORS[color];

    const buttonStyles = [
        styles.button,
        { backgroundColor: colorValue },
        getSizeStyle(size),
        style,
    ];
    const textStyles = [textStyle || {}];

    return (
        <TouchableOpacity style={buttonStyles} onPress={onPress}>
            <Typography color='light' variant='subheading' style={textStyles}>
                {title}
            </Typography>
        </TouchableOpacity>
    );
};

const getSizeStyle = (size: ButtonSize) => {
    switch (size) {
        case 'small':
            return styles.smallButton;
        case 'medium':
            return styles.mediumButton;
        case 'large':
            return styles.largeButton;
        default:
            return null;
    }
};

export default Button;
