import React from 'react';
import { FormControl, FormLabel, NumberInput, NumberInputField } from '@chakra-ui/react';

interface NumberOptionProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    placeholder?: string;
    isRequired?: boolean;
}

export const NumberOption: React.FC<NumberOptionProps> = ({ label, value, onChange, placeholder, isRequired = false }) => (
    <FormControl isRequired={isRequired}>
        <FormLabel fontSize="xs">{label}</FormLabel>
        <NumberInput value={value} onChange={(_, value) => onChange(value)}>
            <NumberInputField height="28px" placeholder={placeholder} />
        </NumberInput>
    </FormControl>
);