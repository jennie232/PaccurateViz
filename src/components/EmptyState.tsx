"use client"
import React, { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    Checkbox,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Box,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';

interface EmptyStateProps {
    subject: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ subject }) => {
    return (
        <Box textAlign="center" borderStyle="dashed" borderWidth={1} borderColor="gray.300" p={10} borderRadius="md">
            <VStack gap={8}>
                <Image src="/empty-state.png" alt="Empty state" width="150px" />
                <Text fontSize="xl" fontWeight="bold">You have no {subject.toLowerCase()}s yet.</Text>
                <Text color="gray.500" fontSize="md">Start by clicking the 'Add {subject}' button above.</Text>
            </VStack>
        </Box>
    );
};