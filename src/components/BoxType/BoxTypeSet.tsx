import React from 'react';
import { VStack, Heading, Box, Flex, Button, useDisclosure, Text, Divider } from '@chakra-ui/react';
import { FaUsps, FaPallet, FaFedex } from 'react-icons/fa';
import { usePaccurateStore } from '@/app/store/paccurateStore';
import { BoxTypeCard } from './BoxTypeCard';
import { BoxTypeList } from './BoxTypeList';
import { BoxTypeModal } from './BoxTypeModal';

const predefinedBoxTypes = [
    { id: 'fedex', name: 'FedEx', icon: FaFedex, description: 'FedEx OneRate' },
    { id: 'usps', name: 'USPS', icon: FaUsps, description: 'USPS Priority Flat Rate' },
    { id: 'pallet', name: 'Pallet', icon: FaPallet, description: 'full-, half-, and quarter-sized 48"x40" pallets' },
];

export const BoxTypeSet: React.FC = () => {
    const { boxTypeSets, toggleBoxTypeSet } = usePaccurateStore();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <VStack spacing={8} align="stretch">
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
            <Box>
                <Flex justify="space-between" align="center" mb={4}>
                    <Text mb={6} fontSize="17px" fontWeight="bold">Custom Box Types</Text>
                    <BoxTypeModal />
                </Flex>
                <BoxTypeList />
            </Box>
        </VStack>
    );
};