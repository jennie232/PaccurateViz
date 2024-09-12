import React from 'react';
import { FormControl, FormLabel, CheckboxGroup, Checkbox, VStack, Text } from '@chakra-ui/react';

interface MultiSelectOptionProps {
    label: string;
    value: (string | number)[];
    onChange: (value: (string | number)[]) => void;
    choices: string[];
    isRequired?: boolean;
    parseChoice?: (choice: string) => string;
}

export const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({ label, value, onChange, choices, isRequired = false, parseChoice = (choice) => choice }) => (
    <FormControl isRequired={isRequired}>
        <FormLabel fontSize="sm">{label}</FormLabel>
        <CheckboxGroup
            value={value.map(String)}
            onChange={(newValue) => onChange(newValue.map(v => isNaN(Number(v)) ? v : Number(v)))}
        >
            <VStack align="start">
                {choices.map((choice, index) => (
                    <Checkbox key={`${choice}-${index}`} value={String(index)} colorScheme="purple">
                        <Text fontSize="xs">{parseChoice(choice)}</Text>
                    </Checkbox>
                ))}
            </VStack>
        </CheckboxGroup>
    </FormControl>
);