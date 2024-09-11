import React from 'react';
import { VStack, Box, Flex, useDisclosure, Text, Divider } from '@chakra-ui/react';

import { FaUsps, FaPallet, FaFedex } from 'react-icons/fa';
import { AddIcon } from '@chakra-ui/icons';
import { usePaccurateStore } from '@/app/store/paccurateStore';
import { BoxTypeCard } from './BoxTypeCard';
import { BoxTypeList } from './BoxTypeList';
import { GenericModal } from '../UI/GenericModal';
import { BoxTypeForm } from './BoxTypeForm';

const predefinedBoxTypes = [
    { id: 'fedex', name: 'FedEx', icon: FaFedex, description: 'FedEx OneRate' },
    { id: 'usps', name: 'USPS', icon: FaUsps, description: 'USPS Priority Flat Rate' },
    { id: 'pallet', name: 'Pallet', icon: FaPallet, description: 'full-, half-, and quarter-sized 48"x40" pallets' },
];

export const BoxTypeSet: React.FC = () => {
    const { boxTypeSets, toggleBoxTypeSet } = usePaccurateStore();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <VStack spacing={6} align="stretch" >
            <Box>
                <Text fontSize="xl" fontWeight="bold">
                    Create Box Types
                </Text>
                <Text mt={2} fontSize="sm" color="blackAlpha.600" fontWeight={500}>
                    Either select a predefined box type or create a custom one. You can select multiple box types.
                </Text>
            </Box>
            <Box>
                <Text mb={6} fontSize="17px" fontWeight="bold">Predefined Box Types</Text>
                <Flex wrap="wrap" gap={6}>
                    {predefinedBoxTypes.map((boxType) => (
                        <BoxTypeCard
                            key={boxType.id}
                            {...boxType}
                            isSelected={boxTypeSets.includes(boxType.id)}
                            onToggle={() => toggleBoxTypeSet(boxType.id)}
                        />
                    ))}
                </Flex>
            </Box>
            <Divider />
            <Box h="250px">
                <Flex justify="space-between" align="center" mb={4} >
                    <Text mb={6} fontSize="17px" fontWeight="bold">Custom Box Types</Text>
                    <GenericModal
                        isOpen={isOpen}
                        onClose={onClose}
                        title="Add Custom Box Type"
                        triggerButton={{
                            text: "Add Custom Box Type",
                            icon: <AddIcon ml={2} />,
                            onClick: onOpen,
                        }}
                    >
                        <BoxTypeForm onClose={onClose} />
                    </GenericModal>
                </Flex>
                <BoxTypeList />
            </Box>
        </VStack>
    );
};