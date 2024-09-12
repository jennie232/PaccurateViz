import React from 'react';
import { VStack, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { PackResponse } from '@/app/types/paccurateTypes';

interface PackingResultDetailsProps {
    result: PackResponse;
}

export const PackingResultDetails: React.FC<PackingResultDetailsProps> = ({ result }) => {
    const boxData = result.boxes[0];
    const boxes = Array.isArray(boxData.box) ? boxData.box : [boxData.box];

    return (
        <VStack py={1} align="start" spacing={4} width="100%">
            <Table variant="simple" size="sm">
                <Thead>
                    <Tr>
                        <Th>Container Name</Th>
                        <Th>Dimensions</Th>
                        <Th>Items</Th>
                        <Th>Price</Th>
                        <Th>Weight Used</Th>
                        <Th>Volume Used</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {boxes.map((box, index) => (
                        <Tr key={index}>
                            <Td>{box.name}</Td>
                            <Td>{`[${box.dimensions.x}, ${box.dimensions.y}, ${box.dimensions.z}]`}</Td>
                            <Td>{box.lenItems}</Td>
                            <Td>{box.price}</Td>
                            <Td>{box.weightUtilization.toFixed(4)}%</Td>
                            <Td>{box.volumeUtilization.toFixed(4)}%</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </VStack>
    );
};