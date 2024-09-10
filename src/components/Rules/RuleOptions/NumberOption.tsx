import React from 'react';
import { FormControl, FormLabel, NumberInput, NumberInputField } from '@chakra-ui/react';

interface NumberOptionProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    placeholder?: string;
}

export const NumberOption: React.FC<NumberOptionProps> = ({ label, value, onChange, placeholder }) => (
    <FormControl>
        <FormLabel>{label}</FormLabel>
        <NumberInput value={value} onChange={(_, value) => onChange(value)}>
            <NumberInputField placeholder={placeholder} />
        </NumberInput>
    </FormControl>
);