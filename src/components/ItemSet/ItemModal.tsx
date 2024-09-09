"use client"
import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { ItemForm } from './ItemForm';

export const ItemModal: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}
                borderRadius="full"
                bg="purple.600"
                color="white"
                fontSize="xs"
                _hover={{ bg: "purple.700" }}
            >
                Add New Item
                <AddIcon ml={2} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent p={3}>
                    <ModalHeader fontSize="xl">Add Item</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ItemForm onClose={onClose} />
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

