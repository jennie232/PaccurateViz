import React from 'react';
import { Box, HStack, Divider, Flex } from '@chakra-ui/react';
import { PackingResultSummary } from './PackingResultSummary';
import { PackingResultDetails } from './PackingResultDetails';
import { PackingResultVisual } from './PackingResultVisual';
import { PackResponse } from '@/app/types/paccurateTypes';

interface PackingResultContainerProps {
    result: PackResponse;
}

export const PackingResultContainer: React.FC<PackingResultContainerProps> = ({ result }) => {
    return (
        <Box h="auto" w="100%" borderWidth={1} borderRadius="lg" px={4} py={8}>
            <Flex direction="row">
                <Box width="35%" pr={2}>
                    <PackingResultVisual result={result} />
                </Box>
                <Box width="65%" pl={2}>
                    <PackingResultSummary result={result} />
                    <Divider my={4} />
                    <PackingResultDetails result={result} />
                </Box>
            </Flex>
        </Box>
    );
};