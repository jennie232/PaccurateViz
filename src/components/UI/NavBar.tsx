import React from 'react';
import { Box, Flex, Image, Spacer, Text } from '@chakra-ui/react';

export const NavBar: React.FC = () => {
    return (
        <Box as="nav" bg="white" boxShadow="md" py={3} px={2}>
            <Flex align="flex-start" maxW="container.xl" mx="4">
                <Image
                    src="/paccurate-logo.svg"
                    alt="Paccurate Logo"
                    height="27px"
                />
                <Text fontSize="lg" fontWeight="bold" ml={1}>-viz</Text>
                <Spacer />
            </Flex>
        </Box>
    );
};