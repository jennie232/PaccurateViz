import React from 'react';
import { Box, VStack, HStack, Divider } from '@chakra-ui/react';
import { PackingResultSummary } from './PackingResultSummary';
import { PackingResultDetails } from './PackingResultDetails';
import { PackingResultVisual } from './PackingResultVisual';
import { PackResponse } from '@/app/types/paccurateTypes';

interface PackingResultContainerProps {
    result: PackResponse;
}

export const PackingResultContainer: React.FC<PackingResultContainerProps> = ({ result }) => {
    return (

        <Box h="300px" w="100%" borderWidth={1} borderRadius="lg" p={4}>

            <VStack spacing={4} align="stretch" justifyContent="center" >

                <HStack p={3} spacing={2} align="start">
                    <Box>
                        <PackingResultVisual result={result} />
                    </Box>
                    <Box>
                        <PackingResultSummary result={result} />
                        <Divider mb={4} />

                        <PackingResultDetails result={result} />
                    </Box>

                </HStack>
            </VStack>
        </Box>
    );
};