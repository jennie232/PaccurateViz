import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react';

interface GenericModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    triggerButton?: {
        text: string;
        icon: React.ReactNode;
        onClick: () => void;
    }
}

export const GenericModal: React.FC<GenericModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    triggerButton,
}) => {
    return (
        <>
            {triggerButton && (
                <Button
                    onClick={triggerButton.onClick}
                    borderRadius="full"
                    bg="purple.600"
                    color="white"
                    fontSize="xs"
                    _hover={{ bg: "purple.700" }}
                >
                    {triggerButton.text}
                    {triggerButton.icon}
                </Button>
            )}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent paddingTop={2} paddingBottom={4}>
                    <ModalHeader fontSize="xl">{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}