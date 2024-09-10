import React from 'react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';

interface SelectOptionProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    choices: string[];
}

export const SelectOption: React.FC<SelectOptionProps> = ({ label, value, onChange, choices }) => (
    <FormControl>
        <FormLabel>{label}</FormLabel>
        <Select value={value} onChange={(e) => onChange(e.target.value)}>
            {choices.map((choice) => (
                <option key={choice} value={choice}>
                    {choice}
                </option>
            ))}
        </Select>
    </FormControl>
);