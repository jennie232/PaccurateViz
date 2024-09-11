import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

interface TextOptionProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    isRequired?: boolean;
}

export const TextOption: React.FC<TextOptionProps> = ({
    label,
    value,
    onChange,
    placeholder,
    isRequired = false
}) => (
    <FormControl isRequired={isRequired}>
        <FormLabel fontSize="xs">{label}</FormLabel>
        <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            size="sm"
        />
    </FormControl>
);