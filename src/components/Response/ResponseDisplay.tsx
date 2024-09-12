"use client"
import React, { useState } from 'react';
import { Box, Text, Button, Flex, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { testPaccurateApi } from '@/app/utils/testPaccurateApi';
import { PackResponse } from '@/app/types/paccurateTypes';
import { PackingResultContainer } from '../Results/PackingResultsContainer';
import { EmptyState } from '../UI/EmptyState';

export const ResponseDisplay: React.FC = () => {
    const [packingResult, setPackingResult] = useState<PackResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTestApi = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await testPaccurateApi();
            setPackingResult(result);
        } catch (error) {
            console.error('Error testing API:', error);
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box height="100%" width="100%">
            <Flex mb={4} justify="space-between" align="center">
                <Box>
                    <Text fontSize="xl" fontWeight="bold">
                        Create Pack
                    </Text>
                    <Text mt={2} fontSize="sm" color="blackAlpha.600" fontWeight={500}>
                        If you are done with your selections, click the button to create your pack and view the results once the API call is complete.
                    </Text>
                </Box>
                <Button
                    borderRadius="full"
                    bg="purple.600"
                    color="white"
                    fontSize="xs"
                    width="fit-content"
                    _hover={{ bg: "purple.700" }}
                    onClick={handleTestApi}
                    isLoading={isLoading}
                    loadingText="Creating Pack"
                >
                    Create Pack
                </Button>
            </Flex>

            {error && (
                <Alert status="error" mt={4}>
                    <AlertIcon />
                    <AlertTitle mr={2}>Error:</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {!packingResult && !error && (
                <Box mt={4}>
                    <EmptyState
                        subject="Packing Result"
                        message="Click the 'Create Pack' button to generate packing results."
                    />
                </Box>
            )}

            {packingResult && (
                <Box mt={4}>
                    <PackingResultContainer result={packingResult} />
                </Box>
            )}
        </Box>
    );
};