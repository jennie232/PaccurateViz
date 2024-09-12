import React, { useState, useCallback, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    Alert,
    Text,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
} from '@chakra-ui/react';
import { ItemSelector } from './ItemSelector';
import { RuleAccordion } from './RuleAccordion';
import { usePaccurateStore } from '@/app/store/paccurateStore';
import { Rule } from '@/app/types/paccurateTypes';
import { validateRule } from '@/config/ruleConfigs';

interface CreateRuleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateRuleModal: React.FC<CreateRuleModalProps> = ({ isOpen, onClose }) => {
    const [selectedRules, setSelectedRules] = useState<Rule[]>([]);
    const [validationError, setValidationError] = useState<React.ReactNode | null>(null);
    const { addRule, items, selectedItemRefId } = usePaccurateStore();

    useEffect(() => {
        if (isOpen) {
            setSelectedRules([]);
            setValidationError(null);
        }
    }, [isOpen]);

    const validateRules = useCallback(() => {
        const errors: string[] = [];

        selectedRules.forEach(rule => {
            const error = validateRule(rule, items.length);
            if (error) errors.push(error);
        });

        if (errors.length > 0) {
            setValidationError(
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={4}>Validation Error</AlertTitle>
                    <AlertDescription>
                        <VStack align="start">
                            {errors.map((error, index) => (
                                <Text key={`error-${index}`}>{error}</Text>
                            ))}
                        </VStack>
                    </AlertDescription>
                </Alert>
            );
            return false;
        }

        setValidationError(null);
        return true;
    }, [selectedRules, items.length]);

    const handleCreateRules = useCallback(() => {
        if (validateRules()) {
            let hasError = false;
            selectedRules.forEach(rule => {
                const formattedRule = {
                    ...rule,
                    options: {
                        ...rule.options,
                        excludedItems: rule.operation === 'exclude' && rule.options?.excludedItems
                            ? rule.options.excludedItems.map((item: string | number) =>
                                typeof item === 'string' ? parseInt(item.split('|')[1]) : item
                            )
                            : rule.options?.excludedItems
                    }
                };
                const result = addRule(formattedRule);
                if (result.error) {
                    setValidationError(
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle mr={4}>Error</AlertTitle>
                            <AlertDescription>{result.error}</AlertDescription>
                        </Alert>
                    );
                    hasError = true;
                }
            });
            if (!hasError) {
                onClose();
                setSelectedRules([]);
                setValidationError(null);
            }
        }
    }, [selectedItemRefId, selectedRules, addRule, onClose, validateRules]);

    const handleUpdateRules = useCallback((updatedRules: Rule[]) => {
        setSelectedRules(updatedRules);
        setValidationError(null);
    }, []);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
            <ModalOverlay />
            <ModalContent maxHeight="80vh" display="flex" flexDirection="column">
                <ModalHeader fontSize="lg">Create Item Rule</ModalHeader>
                <ModalCloseButton />
                {validationError && (
                    <Box px={6} pt={2}>
                        {validationError}
                    </Box>
                )}
                <ModalBody overflowY="auto" flex="1">
                    <VStack spacing={6} alignItems="flex-start">
                        <ItemSelector />
                        <RuleAccordion
                            selectedRules={selectedRules}
                            onUpdateRules={handleUpdateRules}
                        />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        bg="purple.600" color="white" _hover={{ bg: 'purple.800' }} fontSize="xs"
                        onClick={handleCreateRules}
                        isDisabled={!selectedItemRefId || selectedRules.length === 0}
                    >
                        Add Rules
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};