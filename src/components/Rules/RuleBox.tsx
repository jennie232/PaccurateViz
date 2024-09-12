import React from 'react';
import { Box, Checkbox, VStack, Text, Flex, Switch } from '@chakra-ui/react';
import { Rule } from '@/app/types/paccurateTypes';
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
    parseOptionChoice?: (choice: string) => string;
}

export const RuleBox: React.FC<RuleBoxProps> = ({
    rule,
    isSelected,
    onToggle,
    isDisabled,
    options,
    onOptionChange,
    getOptionChoices,
    parseOptionChoice
}) => {
    const config: RuleConfig = ruleConfigs[rule];

    const renderOption = (key: string, optionConfig: RuleOption) => {
        const choices = getOptionChoices(key);

        const commonProps = {
            label: optionConfig.label,
            value: options[key] ?? '',
            onChange: (value: any) => onOptionChange(key, value),
            placeholder: optionConfig.placeholder,
            isRequired: optionConfig.required,
        };

        switch (optionConfig.type) {
            case 'text':
                return <TextOption key={key} {...commonProps} />;
            case 'number':
                return <NumberOption key={key} {...commonProps} value={options[key] ?? 0} />;
            case 'multiNumber':
                return <MultiNumberOption key={key} {...commonProps} value={options[key] ?? []} />;
            case 'multiSelect':
                return (
                    <MultiSelectOption
                        key={key}
                        {...commonProps}
                        choices={choices}
                        value={options[key] ?? []}
                        parseChoice={parseOptionChoice}
                        parseValue={(value) => {
                            if (rule === 'exclude' && key === 'excludedItems') {
                                return parseInt(value.split('|')[1]);
                            }
                            if (rule === 'lock-orientation' && key === 'freeAxes') {
                                return parseInt(value.split(' ')[0]);
                            }
                            return value;
                        }}
                    />
                );
            case 'toggle':
                return (
                    <Flex key={key} align="center">
                        <Switch
                            isChecked={options[key] ?? false}
                            onChange={(e) => {
                                onOptionChange(key, e.target.checked);
                                if (key === 'toggle') onToggle();
                            }}
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
    const isToggleOnly = hasOptions && Object.values(config.options!).every(option => option.type === 'toggle');

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