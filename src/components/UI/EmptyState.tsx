"use client"
import React from 'react';
import { Image, Text, VStack, Flex } from '@chakra-ui/react';

interface EmptyStateProps {
    subject: string;
    height?: string;
    message?: string;
}
export const EmptyState: React.FC<EmptyStateProps> = ({ subject, height = '100%', message }) => {
    return (
        <Flex
            height={height}
            width="100%"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderStyle="dashed"
            borderWidth={1}
            borderColor="gray.300"
            borderRadius="md"
        >
            <VStack spacing={4} p={6} maxWidth="100%">
                <Image
                    src="/empty-state.png"
                    alt="Empty state"
                    width="auto"
                    height="auto"
                    maxWidth="150px"
                    maxHeight="13vh"
                />
                <Text fontSize={["sm", "md", "lg"]} fontWeight="bold">
                    You have no {subject.toLowerCase()}s yet.
                </Text>
                <Text color="gray.500" fontSize={["xs", "sm"]}>
                    {message || `Start by clicking the 'Add ${subject}' button above.`}
                </Text>
            </VStack>
        </Flex>
    );
};