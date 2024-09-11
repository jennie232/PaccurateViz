import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { validateRule } from "@/config/ruleConfigs";

interface Item {
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

interface BoxType {
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
  operation: 'internal-space' | 'alternate-dimensions' | 'exclude' | 'exclude-all' | 'pack-as-is' | 'irregular' | 'lock-orientation' | 'fragile' | 'group-pack';
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

interface PaccurateState {
  items: Item[];
  selectedItemRefId: number | null;
  boxTypeSets: string[];
  customBoxTypes: BoxType[];
  selectedCustomBoxTypeIds: string[];
  rules: Rule[];
  nextRefId: number;
  addItem: (item: Omit<Item, 'refId'> & { refId?: number }) => { error: string } | void;
  removeItem: (refId: number) => void;
  updateItem: (refId: number, item: Partial<Item>) => void;
  selectItem: (refId: number) => void;
  toggleBoxTypeSet: (boxTypeSet: string) => void;
  addCustomBoxType: (boxType: Omit<BoxType, 'id'>) => void;
  removeCustomBoxType: (id: string) => void;
  updateCustomBoxType: (id: string, boxType: Partial<BoxType>) => void;
  toggleCustomBoxTypeSelection: (id: string) => void;
  addRule: (rule: Omit<Rule, 'id'>) => void;
  removeRule: (id: string) => void;
  updateRule: (id: string, rule: Partial<Rule>) => void;
}

export const usePaccurateStore = create<PaccurateState>((set, get) => ({
  items: [],
  selectedItemRefId: null,
  boxTypeSets: [],
  customBoxTypes: [],
  selectedCustomBoxTypeIds: [],
  rules: [],
  nextRefId: 1, // Start with 1 as the first refId

  addItem: (item) => {
    let error: string | undefined;
    set((state) => {
      let refId = item.refId;
      if (refId === undefined) {
        refId = state.nextRefId;
        state.nextRefId++;
      } else {
        if (state.items.some(existingItem => existingItem.refId === refId)) {
          error = 'RefId must be unique';
          return state; // Return current state without changes
        }
        state.nextRefId = Math.max(state.nextRefId, refId + 1);
      }
      return {
        items: [...state.items, { ...item, refId }],
        nextRefId: state.nextRefId,
      };
    });
    return error ? { error } : undefined;
  },

  removeItem: (refId) => set((state) => ({
    items: state.items.filter(i => i.refId !== refId)
  })),

  updateItem: (refId, updatedItem) => {
    let error: string | undefined;
    set((state) => {
      if (updatedItem.refId !== undefined &&
        updatedItem.refId !== refId &&
        state.items.some(item => item.refId === updatedItem.refId)) {
        error = 'RefId must be unique';
        return state; // Return current state without changes
      }

      return {
        items: state.items.map(item =>
          item.refId === refId ? { ...item, ...updatedItem } : item
        ),
      };
    });
    return error ? { error } : undefined;
  },

  selectItem: (refId) => set({ selectedItemRefId: refId }),

  toggleBoxTypeSet: (boxTypeSet) => set((state) => ({
    boxTypeSets: state.boxTypeSets.includes(boxTypeSet)
      ? state.boxTypeSets.filter((set) => set !== boxTypeSet)
      : [...state.boxTypeSets, boxTypeSet]
  })),

  addCustomBoxType: (boxType) => set((state) => {
    const newBoxType = { ...boxType, id: uuidv4() };
    return {
      customBoxTypes: [...state.customBoxTypes, newBoxType],
      selectedCustomBoxTypeIds: [...state.selectedCustomBoxTypeIds, newBoxType.id]
    };
  }),

  removeCustomBoxType: (id) => set((state) => ({
    customBoxTypes: state.customBoxTypes.filter((bt) => bt.id !== id),
    selectedCustomBoxTypeIds: state.selectedCustomBoxTypeIds.filter((selectedId) => selectedId !== id)
  })),

  updateCustomBoxType: (id, updatedBoxType) => set((state) => ({
    customBoxTypes: state.customBoxTypes.map((bt) =>
      bt.id === id ? { ...bt, ...updatedBoxType } : bt
    )
  })),

  toggleCustomBoxTypeSelection: (id) => set((state) => ({
    selectedCustomBoxTypeIds: state.selectedCustomBoxTypeIds.includes(id)
      ? state.selectedCustomBoxTypeIds.filter((selectedId) => selectedId !== id)
      : [...state.selectedCustomBoxTypeIds, id]
  })),

  addRule: (rule) => set((state) => {
    const selectedItem = state.items.find(item => item.refId === state.selectedItemRefId);
    if (!selectedItem) return state;
    
    const validationError = validateRule(rule, state.items.length);
    if (validationError) {
      console.error(validationError);
      return state; // No change if rule is invalid
    }
    const newRule = {
      ...rule,
      id: uuidv4(),
      itemRefId: selectedItem.refId
    };
    return { rules: [...state.rules, newRule] };
  }),

  removeRule: (id) => set((state) => ({
    rules: state.rules.filter(r => r.id !== id)
  })),

  updateRule: (id, updatedRule) => set((state) => ({
    rules: state.rules.map(rule => rule.id === id ? { ...rule, ...updatedRule } : rule)
  })),
}));