import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

interface TextOptionProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const TextOption: React.FC<TextOptionProps> = ({ label, value, onChange, placeholder }) => (
    <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </FormControl>
);