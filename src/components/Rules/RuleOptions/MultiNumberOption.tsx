import React from 'react';
import { FormControl, FormLabel, HStack, NumberInput, NumberInputField } from '@chakra-ui/react';

interface MultiNumberOptionProps {
    label: string;
    value: number[];
    onChange: (value: number[]) => void;
    placeholder?: string;
    isRequired?: boolean;
}

export const MultiNumberOption: React.FC<MultiNumberOptionProps> = ({
    label,
    value,
    onChange,
    isRequired = false
}) => {
    const handleChange = (index: number, newValue: number) => {
        const updatedValue = [...value];
        updatedValue[index] = newValue;
        onChange(updatedValue);
    };

    return (
        <FormControl isRequired={isRequired}>
            <FormLabel fontSize="xs">{label}</FormLabel>
            <HStack>
                {['x (height)', 'y (width)', 'z (length)'].map((dim, index) => (
                    <NumberInput
                        key={dim}
                        value={value[index] || ''}
                        onChange={(_, newValue) => handleChange(index, newValue)}
                        min={0}

                    >
                        <NumberInputField placeholder={`${dim}`} sx={{ '::placeholder': { fontSize: 'sm' } }} />
                    </NumberInput>
                ))}
            </HStack>
        </FormControl>
    );
};