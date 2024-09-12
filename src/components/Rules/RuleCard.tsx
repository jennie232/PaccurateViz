import React from 'react';
import {
    Box,
    Text,
    Badge,
    VStack,
    HStack,
    IconButton,
    useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Rule } from '@/app/types/paccurateTypes';
import { usePaccurateStore } from '@/app/store/paccurateStore';
import { EditRuleModal } from './EditRuleModal';
import { ruleConfigs } from '@/config/ruleConfigs';

interface RuleCardProps {
    rule: Rule;
}

export const RuleCard: React.FC<RuleCardProps> = ({ rule }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { removeRule } = usePaccurateStore();
    const { operation, itemRefId, options } = rule;

    const renderRuleDetails = () => {
        const config = ruleConfigs[operation];
        return (
            <VStack align="start" spacing={1}>
                {config.options && Object.entries(config.options).map(([key, optionConfig]) => {
                    const value = options?.[key];
                    if (value === undefined) return null;

                    let displayValue = value.toString();
                    if (operation === 'exclude' && key === 'excludedItems') {
                        const { items } = usePaccurateStore();
                        displayValue = (value as number[])
                            .map(refId => items.find(item => item.refId === refId)?.name || `Item ${refId}`)
                            .join(', ');
                    }

                    return (
                        <Text key={key} fontSize="xs" color="gray.700">
                            {optionConfig.label}: {displayValue}
                        </Text>
                    );
                })}
            </VStack>
        );
    };
    return (
        <>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white">
                <VStack align="stretch" spacing={2}>
                    <HStack justify="space-between">
                        <Badge colorScheme="purple">{ruleConfigs[operation].name}</Badge>
                        <HStack>
                            <IconButton
                                icon={<EditIcon />}
                                size="xs"
                                onClick={onOpen}
                                aria-label="Edit Rule"
                            />

                            <IconButton
                                icon={<DeleteIcon />}
                                size="xs"
                                onClick={() => removeRule(rule.id)}
                                aria-label="Delete Rule"
                            />

                        </HStack>
                    </HStack>
                    <Text fontSize="sm" fontWeight="bold">Item RefId: {itemRefId}</Text>
                    {renderRuleDetails()}
                </VStack>
            </Box>
            <EditRuleModal isOpen={isOpen} onClose={onClose} rule={rule} />
        </>
    );
};