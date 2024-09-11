// src/components/Rules/RuleAccordion.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Tooltip,
} from '@chakra-ui/react';
import { RuleBox } from './RuleBox';
import { ruleConfigs, getApplicableRules } from '@/config/ruleConfigs';
import { usePaccurateStore } from '@/app/store/paccurateStore';
import { Rule } from '@/app/store/paccurateStore';
import { RuleModalCard } from './RuleModalCard';



const ruleCategories = [
    {
        name: 'Item Handling',
        rules: ['fragile', 'lock-orientation'],
    },
    {
        name: 'Item Interaction',
        rules: ['exclude', 'exclude-all'],
    },
    {
        name: 'Special Packing',
        rules: ['pack-as-is', 'alternate-dimensions'],
    },
];

interface RuleAccordionProps {
    selectedRules: Rule[];
    onUpdateRules: (rules: Rule[]) => void;
}

export const RuleAccordion: React.FC<RuleAccordionProps> = ({
    selectedRules,
    onUpdateRules,
}) => {
    const { items, customBoxTypes, selectedItemRefId } = usePaccurateStore();
    const [disabledRules, setDisabledRules] = useState<string[]>([]);
    const [applicableRules, setApplicableRules] = useState<Rule['operation'][]>([]);

    const updateDisabledRules = useCallback(() => {
        const newDisabledRules = selectedRules.flatMap(
            (rule) => ruleConfigs[rule.operation].conflicts
        );
        setDisabledRules(newDisabledRules);
    }, [selectedRules]);

    useEffect(() => {
        setApplicableRules(getApplicableRules(items.length));
    }, [items.length]);

    useEffect(() => {
        updateDisabledRules();
    }, [updateDisabledRules]);

    const handleRuleToggle = useCallback((rule: Rule['operation']) => {
        if (selectedRules.some((r) => r.operation === rule)) {
            onUpdateRules(selectedRules.filter((r) => r.operation !== rule));
        } else {
            onUpdateRules([...selectedRules, { id: Date.now().toString(), operation: rule, itemRefId: selectedItemRefId || 0, options: {} }]);
        }
    }, [selectedRules, selectedItemRefId, onUpdateRules]);

    const handleOptionChange = useCallback((ruleOperation: Rule['operation'], optionKey: string, value: any) => {
        onUpdateRules(
            selectedRules.map((rule) =>
                rule.operation === ruleOperation
                    ? { ...rule, options: { ...rule.options, [optionKey]: value } }
                    : rule
            )
        );
    }, [selectedRules, onUpdateRules]);

    const getOptionChoices = useCallback((ruleOperation: Rule['operation'], optionKey: string) => {
        switch (ruleOperation) {
            case 'exclude':
                if (optionKey === 'excludedItems') {
                    return items
                        .filter((item) => item.refId !== selectedItemRefId)
                        .map((item) => item.name || item.refId.toString());
                }
                break;
            case 'lock-orientation':
                if (optionKey === 'freeAxes') {
                    return ['x', 'y', 'z'];
                }
                break;
        }
        return ruleConfigs[ruleOperation].options?.[optionKey]?.choices || [];
    }, [items, selectedItemRefId]);

    return (
        <RuleModalCard title="2. Select Rules">
            <Accordion allowMultiple>
                {ruleCategories.map((category, index) => (
                    <AccordionItem key={index}>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left" fontSize="15px" fontWeight="500">
                                    {category.name}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {category.rules.map((rule) => {
                                const selectedRule = selectedRules.find((r) => r.operation === rule);
                                const isApplicable = applicableRules.includes(rule as Rule['operation']);
                                return (
                                    <Tooltip
                                        label={isApplicable ? ruleConfigs[rule as keyof typeof ruleConfigs].description : `Not applicable with ${items.length} item(s)`}
                                        key={rule}
                                    >
                                        <Box>
                                            <RuleBox
                                                rule={rule as Rule['operation']}
                                                isSelected={!!selectedRule}
                                                onToggle={() => handleRuleToggle(rule as Rule['operation'])}
                                                isDisabled={disabledRules.includes(rule) || !selectedItemRefId || !isApplicable}
                                                options={selectedRule?.options || {}}
                                                onOptionChange={(optionKey, value) =>
                                                    handleOptionChange(rule as Rule['operation'], optionKey, value)
                                                }
                                                getOptionChoices={(optionKey) => getOptionChoices(rule as Rule['operation'], optionKey)}
                                            />
                                        </Box>
                                    </Tooltip>
                                );
                            })}
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </RuleModalCard>
    );
};