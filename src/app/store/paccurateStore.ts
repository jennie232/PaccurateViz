import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface Item {
  id: string;
  refId?: number | null;
  name?: string | null; // Allow name to be string, null, or undefined
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
  itemRefId?: number;
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
  selectedItemId: string | null;
  boxTypeSets: string[];
  customBoxTypes: BoxType[];
  selectedCustomBoxTypeIds: string[];
  rules: Rule[];
  addItem: (item: Omit<Item, 'id'>) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: Partial<Item>) => void;
  selectItem: (id: string) => void;
  toggleBoxTypeSet: (boxTypeSet: string) => void;
  addCustomBoxType: (boxType: Omit<BoxType, 'id'>) => void;
  removeCustomBoxType: (id: string) => void;
  updateCustomBoxType: (id: string, boxType: Partial<BoxType>) => void;
  toggleCustomBoxTypeSelection: (id: string) => void;
  addRule: (rule: Omit<Rule, 'id'>) => void;
  removeRule: (id: string) => void;
  updateRule: (id: string, rule: Partial<Rule>) => void;
}

export const usePaccurateStore = create<PaccurateState>((set) => ({
  items: [],
  selectedItemId: null,
  boxTypeSets: [],
  customBoxTypes: [],
  selectedCustomBoxTypeIds: [],
  rules: [],
  addItem: (item) => set((state) => ({ items: [...state.items, { ...item, id: uuidv4() }] })),
  removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
  updateItem: (id, updatedItem) => set((state) => ({
    items: state.items.map(item => item.id === id ? { ...item, ...updatedItem } : item)
  })),
  selectItem: (id) => set({ selectedItemId: id }),
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
  addRule: (rule) => set((state) => ({ rules: [...state.rules, { ...rule, id: uuidv4() }] })),
  removeRule: (id) => set((state) => ({ rules: state.rules.filter(r => r.id !== id) })),
  updateRule: (id, updatedRule) => set((state) => ({
    rules: state.rules.map(rule => rule.id === id ? { ...rule, ...updatedRule } : rule)
  })),
}));