import React from 'react';
import {
    Box,
    Text,
    Badge,
    VStack,
    HStack,
    IconButton,
    Tooltip,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Rule } from '@/app/store/paccurateStore';

interface RuleCardProps {
    rule: Rule;
    onEdit: (rule: Rule) => void;
    onDelete: (id: string) => void;
}

export const RuleCard: React.FC<RuleCardProps> = ({ rule, onEdit, onDelete }) => {
    const { operation, itemRefId, targetItemRefIds, options } = rule;

    const renderRuleDetails = () => {
        switch (operation) {
            case 'internal-space':
                return (
                    <Text fontSize="sm">
                        Internal space: {options?.boxType?.dimensions.x} x {options?.boxType?.dimensions.y} x {options?.boxType?.dimensions.z}
                    </Text>
                );
            case 'alternate-dimensions':
                return (
                    <Text fontSize="sm">
                        Alternate dimensions available: {options?.dimensions.length}
                    </Text>
                );
            case 'exclude':
                return (
                    <Text fontSize="sm">
                        Excluded from: {targetItemRefIds?.join(', ') || 'Not specified'}
                    </Text>
                );
            case 'fragile':
                return (
                    <Text fontSize="sm">
                        Max weight above: {options?.maxWeight || 'Not specified'}
                    </Text>
                );
            case 'lock-orientation':
                return (
                    <Text fontSize="sm">
                        Locked axes: {options?.freeAxes ? `All except ${options.freeAxes.join(', ')}` : 'All'}
                    </Text>
                );
            default:
                return null;
        }
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <VStack align="stretch" spacing={2}>
                <HStack justify="space-between">
                    <Badge colorScheme="purple">{operation}</Badge>
                    <HStack>
                        <Tooltip label="Edit Rule">
                            <IconButton
                                icon={<EditIcon />}
                                size="sm"
                                onClick={() => onEdit(rule)}
                                aria-label="Edit Rule"
                            />
                        </Tooltip>
                        <Tooltip label="Delete Rule">
                            <IconButton
                                icon={<DeleteIcon />}
                                size="sm"
                                onClick={() => onDelete(rule.id)}
                                aria-label="Delete Rule"
                            />
                        </Tooltip>
                    </HStack>
                </HStack>
                <Text fontWeight="bold">Item: {itemRefId}</Text>
                {renderRuleDetails()}
            </VStack>
        </Box>
    );
};