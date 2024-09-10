import React from 'react';
import { FormControl, FormLabel, CheckboxGroup, Checkbox, VStack } from '@chakra-ui/react';

interface MultiSelectOptionProps {
    label: string;
    value: string[];
    onChange: (value: string[]) => void;
    choices: string[];
}

export const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({ label, value, onChange, choices }) => (
    <FormControl>
        <FormLabel>{label}</FormLabel>
        <CheckboxGroup value={value} onChange={onChange}>
            <VStack align="start">
                {choices.map((choice) => (
                    <Checkbox key={choice} value={choice}>
                        {choice}
                    </Checkbox>
                ))}
            </VStack>
        </CheckboxGroup>
    </FormControl>
);