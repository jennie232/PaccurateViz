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
} from '@chakra-ui/react';
import { ItemSelector } from './ItemSelector';
import { RuleAccordion } from './RuleAccordion';
import { usePaccurateStore } from '@/app/store/paccurateStore';
import { Rule } from '@/app/store/paccurateStore';

interface CreateRuleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateRuleModal: React.FC<CreateRuleModalProps> = ({ isOpen, onClose }) => {
    const [selectedRules, setSelectedRules] = useState<Rule[]>([]);
    const { addRule, items, selectedItemRefId } = usePaccurateStore()

    const handleCreateRules = useCallback(() => {
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
        }
    }, [selectedItemRefId, selectedRules, items, addRule, onClose]);

    const handleUpdateRules = useCallback((updatedRules: Rule[]) => {
        setSelectedRules(updatedRules);
    }, []);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent p={4}>
                <ModalHeader>Create Item Rule</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
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
                        colorScheme="purple"
                        onClick={handleCreateRules}
                        isDisabled={!selectedItemRefId || selectedRules.length === 0}
                    >
                        Create Rules
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};