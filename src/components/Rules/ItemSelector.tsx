// src/components/Rules/ItemSelector.tsx
import React from 'react';
import {
    FormControl,
    FormLabel,
    Select,
    Box,
    Text,
} from '@chakra-ui/react';
import { usePaccurateStore } from '@/app/store/paccurateStore';
import { RuleModalCard } from './RuleModalCard';

export const ItemSelector: React.FC = () => {
    const { items, selectedItemRefId, selectItem } = usePaccurateStore();

    const formatItemDetails = (item: any) => {
        const details = [];
        if (item.name) details.push(`name: ${item.name}`);
        if (item.refId) details.push(`refId: ${item.refId}`);
        if (item.weight) details.push(`weight: ${item.weight}`);
        if (item.dimensions) details.push(`dim: ${item.dimensions.x} x ${item.dimensions.y} x ${item.dimensions.z}`);
        if (item.quantity) details.push(`quantity: ${item.quantity}`);
        if (item.price) details.push(`price: ${item.price}`);

        return details.join(', ') || `Item ${item.id}`;
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