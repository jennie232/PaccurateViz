import React from 'react';
import { VStack, Text } from '@chakra-ui/react';
import { PackResponse } from '@/app/types/paccurateTypes';

interface PackingResultSummaryProps {
    result: PackResponse;
}

export const PackingResultSummary: React.FC<PackingResultSummaryProps> = ({ result }) => {
    return (
        <VStack align="start" spacing={1}>
            <Text fontWeight="bold">
                Packed {result.lenItems} items in {result.lenBoxes} container
            </Text>
            <Text fontSize="xs" color="gray.600">
                in {result.packTime.toFixed(8)} seconds with {result.lenLeftovers} item remaining.
            </Text>
            <Text fontSize="13px" fontWeight="500" color="gray.800">TOTAL COST: {result.totalCost}</Text>
            <Text fontSize="13px" fontWeight="500" color="gray.800">TOTAL WEIGHT: {result.totalWeight.toFixed(2)}</Text>
        </VStack>
    );
};