import { KeyboardTypeOptions } from 'react-native';
import * as yup from 'yup';

export type EntryDetails = {
    cost: string;
    notes: string | undefined;
    category: string;
};

type Structure = {
    name: keyof EntryDetails;
    placeholder: string;
    defaultValue: string;
    keyboardType?: KeyboardTypeOptions;
    type: 'text' | 'textarea' | 'picker';
}[];

export const validationSchema = yup.object().shape({
    cost: yup
        .string()
        .matches(/^[0-9]*$/, 'Invalid Input')
        .required('Cost is required'),
    notes: yup.string().max(150, 'Notes must not exceed 150 characters'),
    category: yup.string().required('Please select a category'),
});

export const structure: Structure = [
    {
        keyboardType: 'numeric',
        name: 'cost',
        placeholder: 'Cost',
        defaultValue: '',
        type: 'text',
    },
    {
        name: 'notes',
        placeholder: 'Notes',
        defaultValue: '',
        type: 'textarea',
    },
    {
        name: 'category',
        placeholder: 'Category',
        defaultValue: '',
        type: 'picker',
    },
];
