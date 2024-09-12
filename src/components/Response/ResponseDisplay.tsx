'use client';

import React, { useState } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { testPaccurateApi } from '@/app/testPaccurateApi';
import { PackResponse } from '@/app/types/paccurateTypes';
import { PackingResultContainer } from '../Results/PackingResultsContainer';

export const ResponseDisplay: React.FC = () => {
    const [packingResult, setPackingResult] = useState<PackResponse | null>(null);

    const handleTestApi = async () => {
        try {
            const result = await testPaccurateApi();
            setPackingResult(result);
        } catch (error) {
            console.error('Error testing API:', error);
            // You might want to set an error state here and display it to the user
        }
    };

    return (
        <Box px={4} height="100%" width="100%" >
            <Text fontSize="xl" fontWeight="bold">Create Pack</Text>
            <Button onClick={handleTestApi}>Test API</Button>

            {packingResult && (

                <Box mt={4}>
                    <PackingResultContainer result={packingResult} />
                </Box>
            )}

        </Box>
    );
};