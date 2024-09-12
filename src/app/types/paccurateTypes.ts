export interface Item {
    refId: number;
    name?: string | null;
    color?: string;
    weight: number;
    dimensions: {
        x: number;
        y: number;
        z: number;
    };
    quantity: number;
}

export interface BoxType {
    id: string;
    name?: string | null;
    weightMax: number;
    dimensions: {
        x: number;
        y: number;
        z: number;
    };
    weightTare?: number | null;
    price?: number | null;
}

export interface Rule {
    id: string;
    operation: 'alternate-dimensions' | 'exclude' | 'exclude-all' | 'pack-as-is' | 'lock-orientation' | 'fragile';
    itemRefId: number;
    itemMatch?: {
        all: boolean;
        property?: 'refId' | 'name';
        expression?: string;
        expressions?: string[];
        negate?: boolean;
    };
    targetItemRefIds?: number[];
    options?: {
        [key: string]: any;
    };
}

export interface Box {
    name?: string;
    dimensions: {
        x: number;
        y: number;
        z: number;
    };
    weightMax: number;
    items: Item[];
    price: number;
    lenItems: number;
    weightUtilization: number;
    volumeUtilization: number;
}

export interface InternalRule extends Rule {
    apiFormatted: any;
}

export interface PaccurateState {
    items: Item[];
    selectedItemRefId: number | null;
    boxTypeSets: string[];
    customBoxTypes: BoxType[];
    selectedCustomBoxTypeIds: string[];
    rules: InternalRule[];
    nextRefId: number;
    addItem: (item: Omit<Item, 'refId'> & { refId?: number }) => { error: string } | void;
    removeItem: (refId: number) => void;
    updateItem: (refId: number, item: Partial<Item>) => void;
    selectItem: (refId: number) => void;
    toggleBoxTypeSet: (boxTypeSet: string) => void;
    isAnyBoxTypeSelected: () => boolean;
    addCustomBoxType: (boxType: Omit<BoxType, 'id'>) => void;
    removeCustomBoxType: (id: string) => void;
    updateCustomBoxType: (id: string, boxType: Partial<BoxType>) => void;
    toggleCustomBoxTypeSelection: (id: string) => void;
    addRule: (rule: Omit<Rule, 'id'>) => { error?: string };
    removeRule: (id: string) => void;
    updateRule: (id: string, rule: Partial<Rule>) => void;
}

export interface PackResponse {
    boxes: { box: Box[] }[];
    lenBoxes: number;
    lenItems: number;
    lenLeftovers: number;
    totalCost: number;
    totalVolumeUtilization: number;
    totalVolumeUsed: number;
    totalWeight: number;
    packTime: number;
    leftovers?: Item[];
    svgs: string[];
}

