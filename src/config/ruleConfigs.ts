import { Rule } from '@/app/store/paccurateStore';

export interface RuleConfig {
    name: string;
    options?: {
        [key: string]: {
            type: 'text' | 'number' | 'select' | 'multiSelect';
            label: string;
            placeholder?: string;
            choices?: string[];
        };
    };
    conflicts: string[];
}

export const ruleConfigs: { [key in Rule['operation']]: RuleConfig } = {
    'internal-space': {
        name: 'Internal Space',
        options: {
            boxType: {
                type: 'select',
                label: 'Box Type',
                choices: [],
            },
        },
        conflicts: ['pack-as-is', 'alternate-dimensions'],
    },
    'alternate-dimensions': {
        name: 'Alternate Dimensions',
        options: {
            dimensions: {
                type: 'multiSelect',
                label: 'Alternate Dimensions',
                choices: [], // Will be populated dynamically
            },
        },
        conflicts: ['pack-as-is', 'internal-space'],
    },
    'exclude': {
        name: 'Exclude',
        options: {
            excludedItems: {
                type: 'multiSelect',
                label: 'Excluded Items',
                choices: [], // Will be populated dynamically
            },
        },
        conflicts: ['pack-as-is'],
    },
    'exclude-all': {
        name: 'Exclude All',
        conflicts: ['pack-as-is'],
    },
    'pack-as-is': {
        name: 'Pack As Is',
        conflicts: ['internal-space', 'alternate-dimensions', 'exclude', 'exclude-all', 'irregular', 'group-pack'],
    },
    'irregular': {
        name: 'Irregular',
        conflicts: ['pack-as-is', 'internal-space'],
    },
    'lock-orientation': {
        name: 'Lock Orientation',
        options: {
            freeAxes: {
                type: 'multiSelect',
                label: 'Free Axes',
                choices: ['x', 'y', 'z'],
            },
        },
        conflicts: [],
    },
    'fragile': {
        name: 'Fragile',
        options: {
            maxWeight: {
                type: 'number',
                label: 'Max Weight Above',
                placeholder: 'Enter max weight',
            },
        },
        conflicts: [],
    },
    'group-pack': {
        name: 'Group Pack',
        options: {
            groupId: {
                type: 'text',
                label: 'Group ID',
                placeholder: 'Enter group ID',
            },
        },
        conflicts: ['pack-as-is'],
    },
};