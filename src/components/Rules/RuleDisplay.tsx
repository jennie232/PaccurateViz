import React from 'react';
import { Box, Text, VStack, Flex } from '@chakra-ui/react';
import { RuleList } from './RuleList';
import { Button, Icon } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
import { CreateRuleModal } from './CreateRuleModal';

export const RuleDisplay: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box>
            <VStack align="stretch">
                <Flex mb={4} justify="space-between" align="flex-start">
                    <Box w={800}>
                        <Text fontSize="xl" fontWeight="bold">
                            Create Item Rules (Optional)
                        </Text>
                        <Text mt={2} fontSize="sm" color="blackAlpha.600" fontWeight={500}>
                            You can create rules for the items that you have created from step 1. Otherwise, you can skip this step if you do not want to create any rules.
                        </Text>
                    </Box>
                    <Button
                        borderRadius="full"
                        bg="purple.600"
                        color="white"
                        fontSize="xs"
                        _hover={{ bg: "purple.700" }}
                        onClick={onOpen}
                    >
                        Create Rule <Icon as={AddIcon} ml={2} />
                    </Button>
                </Flex>
                <RuleList />
                <CreateRuleModal isOpen={isOpen} onClose={onClose} />
            </VStack>
        </Box>
    );
};