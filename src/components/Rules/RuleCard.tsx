import {
    Box,
    Text,
    Badge,
    VStack,
    HStack,
    Divider,
    IconButton,
    Tooltip,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Rule } from '@/app/store/paccurateStore';

interface RuleCardProps {
    rule: Rule;
    item?: {
        refId: number;
        name?: string | null;
        dimensions?: { x: number; y: number; z: number };
        weight?: number;
        quantity?: number;
    };
    onEdit: (rule: Rule) => void;
    onDelete: (id: string) => void;
}


export const RuleCard: React.FC<RuleCardProps> = ({ rule, item, onEdit, onDelete }) => {
    const { operation, itemRefId, targetItemRefIds, options } = rule;

    const renderRuleDetails = () => {
        switch (operation) {
            case 'exclude-all':

                return <Text fontSize="sm">Exclude all items</Text>;
            case 'alternate-dimensions':
                return options?.dimensions?.length ? (
                    <Text fontSize="sm">
                        Alternate dimensions available: {options.dimensions.length}
                    </Text>
                ) : null;
            case 'exclude':
                return targetItemRefIds?.length ? (
                    <Text fontSize="sm">
                        Excluded from: {targetItemRefIds.join(', ')}
                    </Text>
                ) : null;
            case 'fragile':
                return options?.maxWeight ? (
                    <Text fontSize="sm">
                        Max weight above: {options.maxWeight}
                    </Text>
                ) : null;
            case 'lock-orientation':
                return options?.freeAxes ? (
                    <Text fontSize="sm">
                        Locked axes: All except {options.freeAxes.join(', ')}
                    </Text>
                ) : (
                    <Text fontSize="sm">Locked axes: All</Text>
                );
            default:
                return null;
        }
    };

    const renderItemInfo = () => {
        if (!item) return null;
        return (
            <VStack align="start" spacing={1} mt={2}>
                <Text fontSize="sm" fontWeight="500">Item: {item.name || `RefID: ${item.refId}`}</Text>
                {item.dimensions && (
                    <Text fontSize="xs" color="gray.500">
                        Dim: {item.dimensions.x} x {item.dimensions.y} x {item.dimensions.z}
                    </Text>
                )}
                {item.weight !== undefined && <Text fontSize="xs" color="gray.500">Weight: {item.weight}</Text>}
                {item.quantity !== undefined && <Text fontSize="xs" color="gray.500">Quantity: {item.quantity}</Text>}
            </VStack>
        );
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" borderColor="gray.200">
            <VStack align="stretch" spacing={2}>
                <HStack justify="space-between">
                    <Badge colorScheme="purple">{operation}</Badge>
                    <HStack>
                        <Tooltip label="Edit Rule">
                            <IconButton
                                icon={<EditIcon />}
                                size="xs"
                                onClick={() => onEdit(rule)}
                                aria-label="Edit Rule"
                            />
                        </Tooltip>
                        <Tooltip label="Delete Rule">
                            <IconButton
                                icon={<DeleteIcon />}
                                size="xs"
                                onClick={() => onDelete(rule.id)}
                                aria-label="Delete Rule"
                            />
                        </Tooltip>
                    </HStack>
                </HStack>
                {renderItemInfo()}
                <Divider />
                {renderRuleDetails()}
            </VStack>
        </Box>
    );
};