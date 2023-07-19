import React, { FC } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styles from './input.style';

interface CustomInputProps extends TextInputProps {
    // Define any additional props you want to pass to the component
    // For example, you can add a custom placeholder or a custom style.
    customPlaceholder?: string;
}

const Input: FC<CustomInputProps> = ({ customPlaceholder, style, ...rest }) => {
    return (
        <TextInput
            placeholder={customPlaceholder}
            style={[styles.input, style]} // Merge the provided style with the default input style
            {...rest} // Spread the rest of the TextInputProps
        />
    );
};

export default Input;
