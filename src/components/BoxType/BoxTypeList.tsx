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
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { usePaccurateStore } from '@/app/store/paccurateStore';
import { BoxTypeForm } from './BoxTypeForm';
import { EmptyState } from '../EmptyState';

export const BoxTypeList: React.FC = () => {
    const { customBoxTypes, selectedCustomBoxTypeIds, removeCustomBoxType, toggleCustomBoxTypeSelection } = usePaccurateStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editingBoxType, setEditingBoxType] = useState<(typeof customBoxTypes)[number] | null>(null);

    const handleEdit = (boxType: typeof customBoxTypes[number]) => {
        setEditingBoxType(boxType);
        onOpen();
    };

    if (customBoxTypes.length === 0) {
        return (
            <EmptyState subject="Custom Box Type" />
        );
    }
    return (
        <>
            <Table variant="simple">
                <Thead bg="gray.100">
                    <Tr>
                        <Th>Name</Th>
                        <Th>Dimensions</Th>
                        <Th>Max Weight</Th>
                        <Th>Tare Weight</Th>
                        <Th>Price</Th>
                        <Th>Selected</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {customBoxTypes.map((boxType) => (
                        <Tr key={boxType.id}>
                            <Td>{boxType.name || 'Unnamed'}</Td>
                            <Td>{`${boxType.dimensions.x} x ${boxType.dimensions.y} x ${boxType.dimensions.z}`}</Td>
                            <Td>{boxType.weightMax}</Td>
                            <Td>{boxType.weightTare || 'N/A'}</Td>
                            <Td>{boxType.price || 'N/A'}</Td>
                            <Td>
                                <Checkbox
                                    isChecked={selectedCustomBoxTypeIds.includes(boxType.id)}
                                    onChange={() => toggleCustomBoxTypeSelection(boxType.id)}
                                    colorScheme="purple" // Change the color of the checkbox
                                />
                            </Td>
                            <Td>
                                <IconButton
                                    aria-label="Edit box type"
                                    icon={<EditIcon />}
                                    size="sm"
                                    mr={2}
                                    onClick={() => handleEdit(boxType)}
                                />
                                <IconButton
                                    aria-label="Delete box type"
                                    icon={<DeleteIcon />}
                                    size="sm"
                                    onClick={() => removeCustomBoxType(boxType.id)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Box Type</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {editingBoxType && (
                            <BoxTypeForm
                                onClose={() => {
                                    setEditingBoxType(null);
                                    onClose();
                                }}
                                editingBoxType={editingBoxType}
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}