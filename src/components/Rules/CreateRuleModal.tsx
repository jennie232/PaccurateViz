import React, { useState, useCallback } from 'react';
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
    Text,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
} from '@chakra-ui/react';
import { ItemSelector } from './ItemSelector';
import { RuleAccordion } from './RuleAccordion';
import { usePaccurateStore } from '@/app/store/paccurateStore';
import { Rule } from '@/app/store/paccurateStore';
import { ruleConfigs } from '@/config/ruleConfigs';

interface CreateRuleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateRuleModal: React.FC<CreateRuleModalProps> = ({ isOpen, onClose }) => {
    const [selectedRules, setSelectedRules] = useState<Rule[]>([]);
    const [validationError, setValidationError] = useState<React.ReactNode | null>(null);
    const { addRule, items, selectedItemRefId } = usePaccurateStore();

    const validateRules = useCallback(() => {
        let hasError = false;
        const errorMessages: React.ReactNode[] = [];

        selectedRules.forEach(rule => {
            const config = ruleConfigs[rule.operation];
            if (config.options) {
                Object.entries(config.options).forEach(([key, option]) => {
                    if (option.required && (!rule.options || rule.options[key] === undefined || rule.options[key] === '')) {
                        hasError = true;
                        errorMessages.push(
                            <div key={`${rule.operation}-${key}`}>{`${config.name}: ${option.label} is required`}</div>
                        );
                    }
                });
            }
        });

        if (hasError) {
            setValidationError(
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={4}>Validation Error</AlertTitle>
                    <AlertDescription fontSize="sm" >{errorMessages}</AlertDescription>
                </Alert>
            );
        } else {
            setValidationError(null);
        }

        return !hasError;
    }, [selectedRules]);

    const handleCreateRules = useCallback(() => {
        if (validateRules()) {
            if (selectedItemRefId) {
                const selectedItem = items.find(item => item.refId === selectedItemRefId);
                if (selectedItem) {
                    selectedRules.forEach(rule => {
                        addRule({
                            operation: rule.operation,
                            itemRefId: selectedItem.refId,
                            options: rule.options,
                        });
                    });
                }
                onClose();
                setSelectedRules([]);
                setValidationError(null);
            }
        }
    }, [selectedItemRefId, selectedRules, items, addRule, onClose, validateRules]);

    const handleUpdateRules = useCallback((updatedRules: Rule[]) => {
        setSelectedRules(updatedRules);
        setValidationError(null); // Changed from setValidationErrors([])
    }, []);
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
            <ModalOverlay />
            <ModalContent maxHeight="80vh" display="flex" flexDirection="column">
                <ModalHeader>Create Item Rule</ModalHeader>
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
                        Add Rule(s)
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};