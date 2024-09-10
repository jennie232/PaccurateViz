import React from 'react';
import { Box, Checkbox, VStack } from '@chakra-ui/react';
import { Rule } from '@/app/store/paccurateStore';
import { ruleConfigs } from '@/config/ruleConfigs';
import { TextOption } from './RuleOptions/TextOption';
import { NumberOption } from './RuleOptions/NumberOption';
import { SelectOption } from './RuleOptions/SelectOption';
import { MultiSelectOption } from './RuleOptions/MultiSelectOption';

interface RuleBoxProps {
    rule: Rule['operation'];
    isSelected: boolean;
    onToggle: () => void;
    isDisabled: boolean;
    options: Record<string, any>;
    onOptionChange: (optionKey: string, value: any) => void;
    getOptionChoices: (optionKey: string) => string[];
}

export const RuleBox: React.FC<RuleBoxProps> = ({
    rule,
    isSelected,
    onToggle,
    isDisabled,
    options,
    onOptionChange,
    getOptionChoices,
}) => {
    const config = ruleConfigs[rule];

    return (
        <Box borderWidth={1} borderRadius="md" p={2} opacity={isDisabled ? 0.5 : 1}>
            <Checkbox isChecked={isSelected} onChange={onToggle} isDisabled={isDisabled}>
                {config.name}
            </Checkbox>
            {isSelected && config.options && (
                <VStack align="start" mt={2}>
                    {Object.entries(config.options).map(([key, optionConfig]) => {
                        const choices = getOptionChoices(key);
                        switch (optionConfig.type) {
                            case 'text':
                                return (
                                    <TextOption
                                        key={key}
                                        label={optionConfig.label}
                                        value={options[key] || ''}
                                        onChange={(value) => onOptionChange(key, value)}
                                        placeholder={optionConfig.placeholder}
                                    />
                                );
                            case 'number':
                                return (
                                    <NumberOption
                                        key={key}
                                        label={optionConfig.label}
                                        value={options[key] || 0}
                                        onChange={(value) => onOptionChange(key, value)}
                                        placeholder={optionConfig.placeholder}
                                    />
                                );
                            case 'select':
                                return (
                                    <SelectOption
                                        key={key}
                                        label={optionConfig.label}
                                        value={options[key] || ''}
                                        onChange={(value) => onOptionChange(key, value)}
                                        choices={choices}
                                    />
                                );
                            case 'multiSelect':
                                return (
                                    <MultiSelectOption
                                        key={key}
                                        label={optionConfig.label}
                                        value={options[key] || []}
                                        onChange={(value) => onOptionChange(key, value)}
                                        choices={choices}
                                    />
                                );
                            default:
                                return null;
                        }
                    })}
                </VStack>
            )}
        </Box>
    );
};