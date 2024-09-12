import React from 'react';
import {
    FormControl,
    Select,
} from '@chakra-ui/react';
import { usePaccurateStore } from '@/app/store/paccurateStore';
import { RuleModalCard } from './RuleModalCard';
import { Item } from '@/app/types/paccurateTypes';

export const ItemSelector: React.FC = () => {
    const { items, selectedItemRefId, selectItem } = usePaccurateStore();

    const formatItemDetails = (item: Item) => {
        const details: string[] = [];
        if (item.name) details.push(`name: ${item.name}`);
        if (item.refId) details.push(`refId: ${item.refId}`);
        if (item.weight) details.push(`weight: ${item.weight}`);
        if (item.dimensions) details.push(`dim: ${item.dimensions.x} x ${item.dimensions.y} x ${item.dimensions.z}`);
        if (item.quantity) details.push(`quantity: ${item.quantity}`);

        return details.join(', ') || `Item ${item.refId}`;
    };

    return (
        <RuleModalCard title="1. Select Item">
            <FormControl>
                <Select
                    placeholder="Choose an item"
                    value={selectedItemRefId || ''}
                    onChange={(e) => selectItem(Number(e.target.value))}
                    fontSize="sm"
                    height="30px"
                    bg="white"
                    color="gray.500"
                >
                    {items.map((item) => (
                        <option key={item.refId} value={item.refId}>
                            {formatItemDetails(item)}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </RuleModalCard>
    );
};