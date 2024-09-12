'use client';

import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { testPaccurateApi } from '@/app/testPaccurateApi';


export const CreateResponse: React.FC = () => {
    return (
        <Box>
            <Text fontSize="xl" fontWeight="bold">
                Create Pack
            </Text>
            <Text mt={2} fontSize="sm" color="blackAlpha.600" fontWeight={500}>
                If you are done with your selections, click the button below to create your pack and view the results once the API call is complete.
            </Text>
        </Box>
    );
};