"use client"
import React from 'react';
import { Box, Icon, Text, Checkbox, VStack } from '@chakra-ui/react';

interface BoxTypeCardProps {
    id: string;
    name: string;
    icon: React.ElementType;
    description: string;
    isSelected: boolean;
    onToggle: () => void;
}

export const BoxTypeCard: React.FC<BoxTypeCardProps> = ({ name, icon, description, isSelected, onToggle }) => {
    return (
        <Box
            borderWidth={1}
            borderRadius="lg"
            p={2}
            cursor="pointer"
            onClick={onToggle}
            bg={isSelected ? "purple.50" : "white"}
            position="relative"
            width="170px"
        >
            <Checkbox
                isChecked={isSelected}
                onChange={onToggle}
                position="absolute"
                top={2}
                left={2}
                colorScheme='purple'

            />
            <VStack spacing={2} align="center">
                <Icon as={icon} boxSize="40px" />
                <Text fontSize="14px" fontWeight="bold">{name}</Text>
                <Text fontSize="xs" textAlign="center">{description}</Text>
            </VStack>
        </Box>
    );
};