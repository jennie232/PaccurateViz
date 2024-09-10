import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { RuleList } from './RuleList';

export const RuleDisplay: React.FC = () => {
    return (
        <Box>
            <VStack spacing={8} align="stretch">
                <Box mb={4}>
                    <Text fontSize="2xl" fontWeight="bold">
                        Create Item Rules (Optional)
                    </Text>
                    <Text mt={2} fontSize="sm" color="blackAlpha.600" fontWeight={500}>
                        You can create rules for the items that you have created from step 1. Otherwise, you can skip this step if you do not want to create any rules.
                    </Text>
                </Box>
                <RuleList />
            </VStack>
        </Box>
    );
};