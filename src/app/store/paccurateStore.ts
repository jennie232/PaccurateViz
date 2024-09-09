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

interface PaccurateState {
  items: Item[];
  boxTypeSets: string[];
  customBoxTypes: BoxType[];
  selectedCustomBoxTypeIds: string[];
  addItem: (item: Omit<Item, 'id'>) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: Partial<Item>) => void;
  toggleBoxTypeSet: (boxTypeSet: string) => void;
  addCustomBoxType: (boxType: Omit<BoxType, 'id'>) => void;
  removeCustomBoxType: (id: string) => void;
  updateCustomBoxType: (id: string, boxType: Partial<BoxType>) => void;
  toggleCustomBoxTypeSelection: (id: string) => void;
}

export const usePaccurateStore = create<PaccurateState>((set) => ({
  items: [],
  boxTypeSets: [],
  customBoxTypes: [],
  selectedCustomBoxTypeIds: [],
  addItem: (item) => set((state) => ({ items: [...state.items, { ...item, id: uuidv4() }] })),
  removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
  updateItem: (id, updatedItem) => set((state) => ({
    items: state.items.map(item => item.id === id ? { ...item, ...updatedItem } : item)
  })),
  toggleBoxTypeSet: (boxTypeSet) => set((state) => ({
    boxTypeSets: state.boxTypeSets.includes(boxTypeSet)
      ? state.boxTypeSets.filter((set) => set !== boxTypeSet)
      : [...state.boxTypeSets, boxTypeSet]
  })),
  addCustomBoxType: (boxType) => set((state) => ({
    customBoxTypes: [...state.customBoxTypes, { ...boxType, id: uuidv4() }]
  })),
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
}));