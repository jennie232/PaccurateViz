import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

import { GenericModal } from '../UI/GenericModal';

import { useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export const RateDisplay: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex flexDirection="column" gap={2}>
            <Flex mb={4} justify="space-between" align="center">
                <Box>
                    <Text fontSize="xl" fontWeight="bold">
                        Create Rate Tables (Optional)
                    </Text>
                    <Text mt={2} fontSize="sm" color="blackAlpha.600" fontWeight={500}>
                        Define rate tables for shipping costs calculation.
                    </Text>
                </Box>
                <GenericModal
                    isOpen={isOpen}
                    onClose={onClose}
                    title="Add Rate Table"
                    triggerButton={{
                        text: "Add New Rate Table",
                        icon: <AddIcon ml={2} />,
                        onClick: onOpen,
                    }}
                >
                    <Text>hello</Text>
                </GenericModal>
            </Flex>

        </Flex>
    );
};