import React from 'react';
import { FormControl, FormLabel, Checkbox, VStack, Text } from '@chakra-ui/react';

interface MultiSelectOptionProps {
    label: string;
    value: (string | number)[];
    onChange: (value: (string | number)[]) => void;
    choices: string[];
    isRequired?: boolean;
    parseChoice?: (choice: string) => string;
    parseValue?: (value: string) => string | number;
}

export const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({
    label,
    value,
    onChange,
    choices,
    isRequired = false,
    parseChoice = (choice) => choice,
    parseValue = (value) => value,
}) => {
    const handleChange = (checkedValue: string, isChecked: boolean) => {
        const parsedValue = parseValue(checkedValue);
        if (isChecked) {
            onChange([...value, parsedValue]);
        } else {
            onChange(value.filter(v => String(v) !== String(parsedValue)));
        }
    };

    return (
        <FormControl isRequired={isRequired}>
            <FormLabel fontSize="sm">{label}</FormLabel>
            <VStack align="start">
                {choices.map((choice) => {
                    const parsedValue = parseValue(choice);
                    const isChecked = value.some(v => String(v) === String(parsedValue));
                    return (
                        <Checkbox
                            key={choice}
                            isChecked={isChecked}
                            onChange={(e) => handleChange(choice, e.target.checked)}
                            colorScheme="purple"
                        >
                            <Text fontSize="xs">{parseChoice(choice)}</Text>
                        </Checkbox>
                    );
                })}
            </VStack>
        </FormControl>
    );
};