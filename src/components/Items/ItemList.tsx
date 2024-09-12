import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Text, Box, IconButton, Image, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { usePaccurateStore } from '@/app/store/paccurateStore';
import { EmptyState } from '../UI/EmptyState';
import { ItemForm } from './ItemForm';
import { useDisclosure } from '@chakra-ui/react';
import { GenericModal } from '../UI/GenericModal';

export const ItemList: React.FC = () => {
    const { items, removeItem } = usePaccurateStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editingItem, setEditingItem] = useState<(typeof items)[number] | null>(null);

    const handleEdit = (item: typeof items[number]) => {
        setEditingItem(item);
        onOpen();
    };

    if (items.length === 0) {
        return (
            <EmptyState subject="Item" />
        );
    }

    return (
        <>
            <Table variant="simple" fontSize="13px">
                <Thead bg="gray.100">
                    <Tr>
                        <Th>Ref ID</Th>
                        <Th>Name</Th>
                        <Th>Color</Th>
                        <Th>Weight</Th>
                        <Th>Dimensions</Th>
                        <Th>Quantity</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead >
                <Tbody>
                    {items.map((item) => (
                        <Tr key={item.refId}>
                            <Td>{item.refId}</Td>
                            <Td>{item.name || 'Unnamed'}</Td>
                            <Td>
                                <Box w="20px" h="20px" bg={item.color || 'gray'} borderRadius="md" />
                            </Td>
                            <Td>{item.weight}</Td>
                            <Td>{`${item.dimensions.x} x ${item.dimensions.y} x ${item.dimensions.z}`}</Td>
                            <Td>{item.quantity}</Td>
                            <Td>
                                <IconButton
                                    aria-label="Edit item"
                                    icon={<EditIcon />}
                                    size="xs"
                                    mr={2}
                                    onClick={() => handleEdit(item)}
                                />
                                <IconButton
                                    aria-label="Delete item"
                                    icon={<DeleteIcon />}
                                    size="xs"
                                    onClick={() => removeItem(item.refId)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table >
            <GenericModal
                isOpen={isOpen}
                onClose={() => {
                    setEditingItem(null);
                    onClose();
                }}
                title="Edit Item"
            >
                {editingItem && (
                    <ItemForm
                        onClose={() => {
                            setEditingItem(null);
                            onClose();
                        }}
                        editingItem={editingItem}
                    />
                )}
            </GenericModal>
        </>
    );
}