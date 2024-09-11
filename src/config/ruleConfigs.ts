import { Rule } from '@/app/store/paccurateStore';

export interface RuleOption {
    type: 'text' | 'number' | 'multiNumber' | 'multiSelect' | 'toggle';
    label: string;
    placeholder?: string;
    choices?: string[];
    required: boolean;
}

export interface RuleConfig {
    name: string;
    options?: Record<string, RuleOption>;
    conflicts: Rule['operation'][];
    appliesToSingleItem: boolean;
    description: string;
}

export const ruleConfigs: Record<Rule['operation'], RuleConfig> = {
    'internal-space': {
        name: 'Internal Space',
        options: {
            dimensions: {
                type: 'multiNumber',
                label: 'Internal Dimensions (x, y, z)',
                required: true
            },
            origin: {
                type: 'multiNumber',
                label: 'Origin (x, y, z)',
                required: false
            }
        },
        conflicts: ['pack-as-is', 'alternate-dimensions'],
        appliesToSingleItem: true,
        description: 'Defines an internal space within the item that can contain other items.'
    },
    'alternate-dimensions': {
        name: 'Alternate Dimensions',
        options: {
            dimensions: {
                type: 'multiNumber',
                label: 'Alternate Dimensions Sets (x, y, z)',
                required: true
            }
        },
        conflicts: ['pack-as-is', 'internal-space'],
        appliesToSingleItem: true,
        description: 'Specifies alternative dimensions for the item.'
    },
    'exclude': {
        name: 'Exclude',
        options: {
            excludedItems: {
                type: 'multiSelect',
                label: 'Items to Exclude',
                required: true
            }
        },
        conflicts: ['pack-as-is'],
        appliesToSingleItem: false,
        description: 'Prevents this item from being packed with specific other items.'
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
        conflicts: ['pack-as-is'],
        appliesToSingleItem: false,
        description: 'Prevents this item from being packed with any other items.'
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
        conflicts: ['internal-space', 'alternate-dimensions', 'exclude', 'exclude-all', 'irregular', 'group-pack'],
        appliesToSingleItem: true,
        description: 'Packs the item exactly as specified, without any modifications.'
    },
    'irregular': {
        name: 'Irregular (Roll)',
        options: {
            innerDiameter: {
                type: 'number',
                label: 'Inner Diameter',
                required: true
            },
            maxDiameter: {
                type: 'number',
                label: 'Max Diameter',
                required: true
            },
            maxWeight: {
                type: 'number',
                label: 'Max Weight',
                required: true
            }
        },
        conflicts: ['pack-as-is', 'internal-space'],
        appliesToSingleItem: true,
        description: 'Defines parameters for rolling an irregular item.'
    },
    'lock-orientation': {
        name: 'Lock Orientation',
        options: {
            freeAxes: {
                type: 'multiSelect',
                label: 'Free Axes',
                choices: ['X', 'Y', 'Z'],
                required: true
            }
        },
        conflicts: [],
        appliesToSingleItem: true,
        description: 'Restricts the orientation of the item during packing.'
    },
    'fragile': {
        name: 'Fragile',
        options: {
            maxWeight: {
                type: 'number',
                label: 'Max Weight Above',
                required: false
            },
            onTopOnly: {
                type: 'toggle',
                label: 'On Top Only',
                required: false
            }

        },
        conflicts: [],
        appliesToSingleItem: true,
        description: 'Marks the item as fragile, with special packing considerations.'
    },
    'group-pack': {
        name: 'Group Pack',
        options: {
            groupId: {
                type: 'text',
                label: 'Group ID',
                required: true
            }
        },
        conflicts: ['pack-as-is'],
        appliesToSingleItem: false,
        description: 'Groups items together for packing.'
    }
};

export const getApplicableRules = (itemCount: number): Rule['operation'][] => {
    return (Object.entries(ruleConfigs) as [Rule['operation'], RuleConfig][])
        .filter(([_, config]) => itemCount > 1 || config.appliesToSingleItem)
        .map(([key, _]) => key);
};

type RuleWithoutId = Omit<Rule, 'id'>;

export const validateRule = (rule: RuleWithoutId, itemCount: number): string | null => {
    const config = ruleConfigs[rule.operation];

    if (!config) {
        return `Invalid rule operation: ${rule.operation}`;
    }

    if (itemCount === 1 && !config.appliesToSingleItem) {
        return `The ${config.name} rule is not applicable when there's only one item.`;
    }

    // Additional validation logic can be added here
    // For example, checking if required options are provided

    return null; // Rule is valid
};

export const checkRuleConflicts = (existingRules: Rule['operation'][], newRule: Rule['operation']): boolean => {
    return existingRules.some(rule =>
        ruleConfigs[rule]?.conflicts.includes(newRule) ||
        ruleConfigs[newRule]?.conflicts.includes(rule)
    );
};