import React from 'react';
import { VStack, FormControl, FormLabel, Input, Switch } from '@chakra-ui/react';
import { Rule } from '@/app/types/paccurateTypes';
import { ruleConfigs, RuleOption } from '@/config/ruleConfigs';
import { MultiSelectOption } from './RuleOptions/MultiSelectOption';
import { NumberOption } from './RuleOptions/NumberOption';
import { MultiNumberOption } from './RuleOptions/MultiNumberOption';

interface RuleEditorProps {
    rule: Rule;
    onUpdateRule: (updatedRule: Rule) => void;
    items: any[];
}

export const RuleEditor: React.FC<RuleEditorProps> = ({ rule, onUpdateRule, items }) => {
    const config = ruleConfigs[rule.operation];

    const handleOptionChange = (optionKey: string, value: any) => {
        let processedValue = value;

        if (rule.operation === 'lock-orientation' && optionKey === 'freeAxes') {
            processedValue = value.map((v: string) => parseInt(v));
        }

        const updatedRule = {
            ...rule,
            options: {
                ...rule.options,
                [optionKey]: processedValue,
            },
        };
        onUpdateRule(updatedRule);
    };

    const renderOption = (key: string, optionConfig: RuleOption) => {
        switch (optionConfig.type) {
            case 'text':
                return (
                    <FormControl key={key}>
                        <FormLabel>{optionConfig.label}</FormLabel>
                        <Input
                            value={rule.options?.[key] || ''}
                            onChange={(e) => handleOptionChange(key, e.target.value)}
                            placeholder={optionConfig.placeholder}
                        />
                    </FormControl>
                );
            case 'number':
                return (
                    <NumberOption
                        key={key}
                        label={optionConfig.label}
                        value={rule.options?.[key] as number || 0}
                        onChange={(value) => handleOptionChange(key, value)}
                        placeholder={optionConfig.placeholder}
                        isRequired={optionConfig.required}
                    />
                );
            case 'multiNumber':
                return (
                    <MultiNumberOption
                        key={key}
                        label={optionConfig.label}
                        value={rule.options?.[key] as number[] || []}
                        onChange={(value) => handleOptionChange(key, value)}
                        placeholder={optionConfig.placeholder}
                        isRequired={optionConfig.required}
                    />
                );
            case 'multiSelect':
                let choices = optionConfig.choices || [];
                let value = rule.options?.[key] as (string | number)[] || [];
                console.log('value', choices, value);

                if (rule.operation === 'exclude' && key === 'excludedItems') {
                    choices = items
                        .filter((item) => item.refId !== rule.itemRefId)
                        .map((item) => `${item.name || `Item ${item.refId}`}|${item.refId}`);
                    value = value.map(v => items.find(item => item.refId === v)?.refId || v);
                }

                return (
                    <MultiSelectOption
                        key={key}
                        label={optionConfig.label}
                        value={value}
                        onChange={(value) => {
                            if (rule.operation === 'exclude' && key === 'excludedItems') {
                                value = value.map(v => parseInt(v.toString().split('|')[1]));
                            }
                            handleOptionChange(key, value);
                        }}
                        choices={choices}
                        isRequired={optionConfig.required}
                        parseChoice={(choice) => choice.split('|')[0]}
                    />
                );
            case 'toggle':
                return (
                    <FormControl key={key} display="flex" alignItems="center">
                        <Switch
                            id={key}
                            isChecked={rule.options?.[key] as boolean || false}
                            onChange={(e) => handleOptionChange(key, e.target.checked)}
                            colorScheme="purple"
                        />
                        <FormLabel htmlFor={key} mb="0" fontSize="xs" fontWeight="500" ml={2}>
                            {optionConfig.label}
                        </FormLabel>
                    </FormControl>
                );
            default:
                return null;
        }
    };

    return (
        <VStack spacing={4} align="stretch">
            {config.options &&
                Object.entries(config.options).map(([key, optionConfig]) =>
                    renderOption(key, optionConfig)
                )}
        </VStack>
    );
};