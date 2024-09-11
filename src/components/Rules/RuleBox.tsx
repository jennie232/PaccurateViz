import React from 'react';
import { Box, Checkbox, VStack, Text, Flex, Switch, FormLabel } from '@chakra-ui/react';
import { Rule } from '@/app/store/paccurateStore';
import { ruleConfigs, RuleConfig, RuleOption } from '@/config/ruleConfigs';
import { TextOption } from './RuleOptions/TextOption';
import { NumberOption } from './RuleOptions/NumberOption';
import { MultiNumberOption } from './RuleOptions/MultiNumberOption';
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
    const config: RuleConfig = ruleConfigs[rule];

    const renderOption = (key: string, optionConfig: RuleOption) => {
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
                        isRequired={optionConfig.required}
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
                        isRequired={optionConfig.required}
                    />
                );
            case 'multiNumber':
                return (
                    <MultiNumberOption
                        key={key}
                        label={optionConfig.label}
                        value={options[key] || []}
                        onChange={(value) => onOptionChange(key, value)}
                        placeholder={optionConfig.placeholder}
                        isRequired={optionConfig.required}
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
                        isRequired={optionConfig.required}
                    />
                );
            case 'toggle':
                return (
                    <Flex align="center">
                        <Switch
                            key={key}
                            isChecked={options[key] || false}
                            onChange={(e) => onOptionChange(key, e.target.checked)}
                            colorScheme="purple"
                        />
                        <Text fontSize="xs" fontWeight="500" ml={2}>{optionConfig.label}</Text>

                    </Flex>
                );
            default:
                return null;
        }
    };

    const hasOptions = config.options && Object.keys(config.options).length > 0;
    const isToggleOnly = hasOptions && config.options && Object.values(config.options).every(option => option.type === 'toggle');

    return (
        <Box mb={2} borderWidth={1} borderRadius="md" p={3} opacity={isDisabled ? 0.5 : 1} bg="white">
            <Flex align="center">
                {isToggleOnly ? (
                    <Flex align="center">
                        <Switch
                            colorScheme="purple"
                            isChecked={isSelected}
                            onChange={onToggle}
                            isDisabled={isDisabled}
                        />
                        <Text fontSize="sm" fontWeight="500" ml={2}>{config.name}</Text>
                    </Flex>

                ) : (
                    <>
                        <Checkbox
                            colorScheme="purple"
                            isChecked={isSelected}
                            onChange={onToggle}
                            isDisabled={isDisabled}
                        />
                        <Text fontSize="sm" fontWeight="500" ml={2}>{config.name}</Text>
                    </>
                )}
            </Flex>
            {isSelected && hasOptions && !isToggleOnly && config.options && (
                <VStack align="start" mt={2} spacing={5} py={4}>
                    {Object.entries(config.options).map(([key, optionConfig]) =>
                        renderOption(key, optionConfig)
                    )}
                </VStack>
            )}
        </Box>
    );
};