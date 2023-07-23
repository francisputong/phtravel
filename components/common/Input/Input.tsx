import React, { FC } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import styles from './input.style';
import { COLORS } from '../../../constants';
import { FieldError } from 'react-hook-form';
import Typography from '../Typography';

interface CustomInputProps extends TextInputProps {
    error?: FieldError | undefined;
    multiline?: boolean;
}

const Input: FC<CustomInputProps> = ({ style, error, multiline, ...rest }) => {
    const inputStyles = [styles.input, style, { height: multiline ? 120 : 40 }];

    return (
        <>
            <TextInput
                multiline={multiline}
                numberOfLines={multiline ? 4 : 1}
                placeholderTextColor={COLORS.darkModePlaceholderColor}
                style={inputStyles}
                {...rest}
            />
            {error && (
                <Typography variant='subtext' color='error'>
                    {error.message}
                </Typography>
            )}
        </>
    );
};

export default Input;
