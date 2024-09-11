import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export const ResponseDisplay: React.FC = () => {
    return (
        <Box px={4} py={7} height="100vh" width="100%" >
            <Text fontSize="xl" fontWeight="bold">Your Pack Results</Text>
        </Box>
    );
};