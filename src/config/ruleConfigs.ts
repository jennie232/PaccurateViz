import { Rule } from '@/app/types/paccurateTypes';

export interface RuleOption {
    type: 'text' | 'number' | 'multiNumber' | 'multiSelect' | 'toggle';
    label: string;
    placeholder?: string;
    choices?: string[];
    required: boolean;
    apiField?: string;
}

export interface RuleConfig {
    name: string;
    options?: Record<string, RuleOption>;
    conflicts: Rule['operation'][];
    appliesToSingleItem: boolean;
    description: string;
    formatForAPI: (rule: Rule, items: any[]) => any;
}

export const ruleConfigs: Record<Rule['operation'], RuleConfig> = {
    'alternate-dimensions': {
        name: 'Alternate Dimensions',
        options: {
            dimensions: {
                type: 'multiNumber',
                label: 'Alternate Dimensions Sets (x, y, z)',
                required: true,
                apiField: 'dimensions'
            }
        },
        conflicts: ['pack-as-is'],
        appliesToSingleItem: true,
        description: 'Specifies alternative dimensions for the item.',
        formatForAPI: (rule) => ({
            operation: 'alternate-dimensions',
            itemRefId: rule.itemRefId,
            options: {
                dimensions: rule.options?.dimensions ?? []
            }
        })
    },
    'exclude': {
        name: 'Exclude',
        options: {
            excludedItems: {
                type: 'multiSelect',
                label: 'Items to Exclude',
                required: true,
                apiField: 'targetItemRefIds'
            }
        },
        conflicts: ['pack-as-is', 'exclude-all'],
        appliesToSingleItem: false,
        description: 'Prevents this item from being packed with specific other items.',
        formatForAPI: (rule) => ({
            operation: 'exclude',
            itemRefId: rule.itemRefId,
            targetItemRefIds: (rule.options?.excludedItems || []).map(Number)
        })
    },
    'exclude-all': {
        name: 'Exclude All',
        options: {
            toggle: {
                type: 'toggle',
                label: 'Exclude All',
                required: true
            }
        },
        conflicts: ['pack-as-is', 'exclude'],
        appliesToSingleItem: false,
        description: 'Prevents this item from being packed with any other items.',
        formatForAPI: (rule) => ({
            operation: 'exclude-all',
            itemRefId: rule.itemRefId
        })
    },
    'pack-as-is': {
        name: 'Pack As Is',
        options: {
            toggle: {
                type: 'toggle',
                label: 'Pack As Is',
                required: true
            }
        },
        conflicts: ['alternate-dimensions', 'exclude', 'exclude-all', 'lock-orientation', 'fragile'],
        appliesToSingleItem: true,
        description: 'Packs the item exactly as specified, without any modifications.',
        formatForAPI: (rule) => ({
            operation: 'pack-as-is',
            itemRefId: rule.itemRefId
        })
    },
    'lock-orientation': {
        name: 'Lock Orientation',
        options: {
            freeAxes: {
                type: 'multiSelect',
                label: 'Free Axes',
                choices: ['0 (yaw)', '1 (roll)'],
                required: true,
                apiField: 'freeAxes'
            }
        },
        conflicts: ['pack-as-is'],
        appliesToSingleItem: true,
        description: 'Restricts the orientation of the item during packing.',
        formatForAPI: (rule) => ({
            operation: 'lock-orientation',
            itemRefId: rule.itemRefId,
            options: {
                freeAxes: rule.options?.freeAxes?.map(Number) ?? []
            }
        })
    },
    'fragile': {
        name: 'Fragile',
        options: {
            maxWeight: {
                type: 'number',
                label: 'Max Weight Above',
                required: false,
                apiField: 'maxWeight'
            },
            onTopOnly: {
                type: 'toggle',
                label: 'On Top Only',
                required: false,
                apiField: 'onTopOnly'
            }
        },
        conflicts: ['pack-as-is'],
        appliesToSingleItem: true,
        description: 'Marks the item as fragile, with special packing considerations.',
        formatForAPI: (rule) => ({
            operation: 'fragile',
            itemRefId: rule.itemRefId,
            options: {
                maxWeight: rule.options?.maxWeight,
                onTopOnly: rule.options?.onTopOnly
            }
        })
    }
};

export const getApplicableRules = (itemCount: number): Rule['operation'][] => {
    return (Object.entries(ruleConfigs) as [Rule['operation'], RuleConfig][])
        .filter(([_, config]) => itemCount > 1 || config.appliesToSingleItem)
        .map(([key]) => key);
};

export const validateRule = (rule: Omit<Rule, 'id'>, itemCount: number): string | null => {
    const config = ruleConfigs[rule.operation];
    console.log('Validating rule:', rule.operation, 'Options:', rule.options);

    if (!config) {
        return `Invalid rule operation: ${rule.operation}`;
    }

    if (itemCount === 1 && !config.appliesToSingleItem) {
        return `The ${config.name} rule is not applicable when there's only one item.`;
    }

    if (config.options) {
        for (const [key, option] of Object.entries(config.options)) {
            if (option.required) {
                const value = rule.options?.[key];
                console.log(`Checking option: ${key}, value:`, value);
                if (value === undefined || (option.type !== 'toggle' && value === '')) {
                    return `${config.name}: ${option.label} is required`;
                }
            }
        }
    }

    return null;
};

export const checkRuleConflicts = (existingRules: Rule['operation'][], newRule: Rule['operation']): boolean => {
    return existingRules.some(rule =>
        ruleConfigs[rule]?.conflicts.includes(newRule) ||
        ruleConfigs[newRule]?.conflicts.includes(rule)
    );
};