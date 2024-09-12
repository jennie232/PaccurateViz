import React from 'react';
import { VStack, Text, Box, Image, SimpleGrid } from '@chakra-ui/react';
import { RuleCard } from './RuleCard';
import { usePaccurateStore } from '@/app/store/paccurateStore';

export const RuleList: React.FC = () => {
    const { rules } = usePaccurateStore();

    return (
        <Box>
            <Box bg="purple.50" width="100%" height="450px" borderRadius="md" overflowY="auto">
                {rules.length === 0 ? (
                    <VStack gap={3} justifyContent="center" height="100%">
                        <Image
                            src="/rules.png"
                            alt="Empty state"
                            width="auto"
                            height="auto"
                            maxWidth="100px"
                            maxHeight="13vh"
                        />
                        <Text fontSize={["sm", "md", "lg"]} fontWeight="bold">No rules have been added yet.</Text>
                        <Text color="gray.500" fontSize={["xs", "sm"]}>
                            If you want to create rules for your items, you can do so by clicking the 'Create Rule' button above.
                        </Text>
                    </VStack>
                ) : (
                    <SimpleGrid columns={3} spacing={4} padding={4}>
                        {rules.map((rule) => {
                            console.log('Rendering rule:', rule);
                            return (
                                <RuleCard
                                    key={rule.id}
                                    rule={rule}
                                />
                            );
                        })}
                    </SimpleGrid>
                )}
            </Box>
        </Box>
    );
};