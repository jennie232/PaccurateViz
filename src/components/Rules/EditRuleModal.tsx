import React, { useState, useCallback } from 'react';
import { Button, VStack, Text, Alert, AlertIcon, Flex } from '@chakra-ui/react';
import { GenericModal } from '../UI/GenericModal';
import { RuleEditor } from './RuleEditor';
import { usePaccurateStore } from '@/app/store/paccurateStore';
import { Rule } from '@/app/types/paccurateTypes';
import { ruleConfigs } from '@/config/ruleConfigs';

interface EditRuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    rule: Rule;
}

export const EditRuleModal: React.FC<EditRuleModalProps> = ({ isOpen, onClose, rule }) => {
    const [editedRule, setEditedRule] = useState<Rule>(rule);
    const [error, setError] = useState<string | null>(null);
    const { updateRule, items } = usePaccurateStore();

    const handleUpdateRule = useCallback((updatedRule: Rule) => {
        setEditedRule(updatedRule);
        setError(null);
    }, []);

    const handleSave = useCallback(() => {
        updateRule(editedRule.id, editedRule);
        onClose();
    }, [editedRule, updateRule, onClose]);

    return (
        <GenericModal
            isOpen={isOpen}
            onClose={onClose}
            title={`Edit ${ruleConfigs[rule.operation].name} Rule`}
        >
            <VStack spacing={4} align="stretch">
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
                <RuleEditor
                    rule={editedRule}
                    onUpdateRule={handleUpdateRule}
                    items={items}
                />
                <Flex justifyContent="flex-end" width="100%">
                    <Button bg="purple.600" color="white" _hover={{ bg: 'purple.800' }} fontSize="xs" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Flex>
            </VStack>
        </GenericModal>
    );
};