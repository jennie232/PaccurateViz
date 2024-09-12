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
import { ruleConfigs, getApplicableRules, checkRuleConflicts } from '@/config/ruleConfigs';
import { usePaccurateStore } from '@/app/store/paccurateStore';
import { Rule } from '@/app/types/paccurateTypes';
import { RuleModalCard } from './RuleModalCard';

const ruleCategories = [
    { name: 'Item Handling', rules: ['fragile', 'lock-orientation'] },
    { name: 'Item Interaction', rules: ['exclude', 'exclude-all'] },
    { name: 'Special Packing', rules: ['pack-as-is', 'alternate-dimensions'] },
];

interface RuleAccordionProps {
    selectedRules: Rule[];
    onUpdateRules: (rules: Rule[]) => void;
}

export const RuleAccordion: React.FC<RuleAccordionProps> = ({
    selectedRules,
    onUpdateRules,
}) => {
    const { items, selectedItemRefId } = usePaccurateStore();
    const [disabledRules, setDisabledRules] = useState<Rule['operation'][]>([]);
    const [applicableRules, setApplicableRules] = useState<Rule['operation'][]>([]);

    useEffect(() => {
        setApplicableRules(getApplicableRules(items.length));
    }, [items.length]);

    useEffect(() => {
        const newDisabledRules = selectedRules.flatMap(
            (rule) => ruleConfigs[rule.operation].conflicts
        );
        setDisabledRules(newDisabledRules);
    }, [selectedRules]);

    const handleRuleToggle = useCallback((rule: Rule['operation']) => {
        onUpdateRules(
            selectedRules.some((r) => r.operation === rule)
                ? selectedRules.filter((r) => r.operation !== rule)
                : [...selectedRules, {
                    id: Date.now().toString(),
                    operation: rule,
                    itemRefId: selectedItemRefId!,
                    options: ruleConfigs[rule].options
                        ? Object.fromEntries(
                            Object.entries(ruleConfigs[rule].options!).map(
                                ([key, option]) => {
                                    if (option.type === 'toggle') return [key, true];
                                    if (option.type === 'multiSelect') return [key, []];
                                    if (rule === 'lock-orientation' && key === 'freeAxes') return [key, []];
                                    return [key, ''];
                                }
                            )
                        )
                        : {}
                }]
        );
    }, [selectedRules, selectedItemRefId, onUpdateRules]);

    const handleOptionChange = useCallback((ruleOperation: Rule['operation'], optionKey: string, value: any) => {
        onUpdateRules(
            selectedRules.map((rule) => {
                if (rule.operation === ruleOperation) {
                    let newValue = value;
                    if (ruleOperation === 'lock-orientation' && optionKey === 'freeAxes') {
                        newValue = value.map((v: string) => parseInt(v));
                    }
                    return { ...rule, options: { ...rule.options, [optionKey]: newValue } };
                }
                return rule;
            })
        );
    }, [selectedRules, onUpdateRules]);

    const getOptionChoices = useCallback((ruleOperation: Rule['operation'], optionKey: string) => {
        if (ruleOperation === 'exclude' && optionKey === 'excludedItems') {
            return items
                .filter((item) => item.refId !== selectedItemRefId)
                .map((item) => `${item.name || `Item ${item.refId}`}|${item.refId}`);
        }
        return ruleConfigs[ruleOperation].options?.[optionKey]?.choices || [];
    }, [items, selectedItemRefId]);

    const parseOptionChoice = useCallback((choice: string) => {
        return choice.split('|')[0];
    }, []);

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
                                const ruleOperation = rule as Rule['operation'];
                                const selectedRule = selectedRules.find((r) => r.operation === ruleOperation);
                                const isApplicable = applicableRules.includes(ruleOperation);
                                const isDisabled = disabledRules.includes(ruleOperation) || !selectedItemRefId || !isApplicable;
                                return (
                                    <Tooltip
                                        key={rule}
                                        label={isApplicable ? ruleConfigs[ruleOperation].description : `Not applicable with ${items.length} item(s)`}
                                    >
                                        <Box>
                                            <RuleBox
                                                rule={ruleOperation}
                                                isSelected={!!selectedRule}
                                                onToggle={() => handleRuleToggle(ruleOperation)}
                                                isDisabled={isDisabled}
                                                options={selectedRule?.options || {}}
                                                onOptionChange={(optionKey, value) =>
                                                    handleOptionChange(ruleOperation, optionKey, value)
                                                }
                                                getOptionChoices={(optionKey) => getOptionChoices(ruleOperation, optionKey)}
                                                parseOptionChoice={parseOptionChoice}

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