"use client"

import React from 'react';
import { VStack, Text, Box, Image, Button, Icon, useDisclosure } from '@chakra-ui/react';
import { RuleCard } from './RuleCard';
import { usePaccurateStore } from '@/app/store/paccurateStore';
import { AddIcon } from '@chakra-ui/icons';
import { CreateRuleModal } from './CreateRuleModal';

export const RuleList: React.FC = () => {
    const { rules, updateRule, removeRule } = usePaccurateStore();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box bg="purple.50" width="100%" height="530px" borderRadius="md">
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
                        If you want to create rules for your items, you can do so by clicking the 'Create Rule' button below.
                    </Text>

                    <Button
                        borderRadius="full"
                        bg="purple.600"
                        color="white"
                        fontSize="sm"
                        mt={4}
                        _hover={{ bg: "purple.700" }}
                        onClick={onOpen}
                    >
                        Create Rule <Icon as={AddIcon} ml={2} />
                    </Button>
                </VStack>
            ) : (
                <VStack spacing={4} align="stretch">
                    {rules.map((rule) => (
                        <RuleCard
                            key={rule.id}
                            rule={rule}
                            onEdit={(updatedRule) => updateRule(rule.id, updatedRule)}
                            onDelete={removeRule}
                        />
                    ))}
                </VStack>
            )}
            <CreateRuleModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};