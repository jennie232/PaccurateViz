import React from 'react';
import { Card, CardBody, Divider, VStack, Text, Box } from '@chakra-ui/react';

interface RuleModalCardProps {
    title: string;
    children: React.ReactNode;
}

export const RuleModalCard: React.FC<RuleModalCardProps> = ({ title, children }) => {
    return (
        <Card
            variant="outline"
            borderColor="gray.200"
            borderRadius="md"
            width="100%"
            maxWidth="600px"
        >
            <CardBody p={0}>
                <VStack gap={0} align="stretch">
                    <Text fontSize="sm" color="gray.600" fontWeight="bold" p={2} px={3}>{title}</Text>
                    <Divider borderColor="gray.200" />
                    <Box p={3}>
                        {children}
                    </Box>
                </VStack>
            </CardBody>
        </Card>
    );
};