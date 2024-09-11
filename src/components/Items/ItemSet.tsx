import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { ItemList } from './ItemList';
import { GenericModal } from '../UI/GenericModal';
import { ItemForm } from './ItemForm';
import { useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export const ItemSet: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex flexDirection="column" gap={4}>
            <Flex mb={4} justify="space-between" align="center">
                <Box>
                    <Text fontSize="xl" fontWeight="bold">
                        Create Items
                    </Text>
                    <Text mt={2} fontSize="sm" color="blackAlpha.600" fontWeight={500}>
                        Define the items that need to be packed.
                    </Text>
                </Box>
                <GenericModal
                    isOpen={isOpen}
                    onClose={onClose}
                    title="Add Item"
                    triggerButton={{
                        text: "Add New Item",
                        icon: <AddIcon ml={2} />,
                        onClick: onOpen,
                    }}
                >
                    <ItemForm onClose={onClose} />
                </GenericModal>
            </Flex>
            <ItemList />
        </Flex>
    );
};