import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { validateRule, ruleConfigs } from "@/config/ruleConfigs";
import { InternalRule, PaccurateState } from "@/app/types/paccurateTypes";


export const usePaccurateStore = create<PaccurateState>((set, get) => ({
  items: [],
  selectedItemRefId: null,
  boxTypeSets: [],
  customBoxTypes: [],
  selectedCustomBoxTypeIds: [],
  rules: [],
  nextRefId: 1,

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
          return state;
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
        return state;
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

  isAnyBoxTypeSelected: () => {
    const state = get();
    return state.boxTypeSets.length > 0 || state.selectedCustomBoxTypeIds.length > 0;
  },


  addRule: (rule) => {
    const state = get();
    const selectedItem = state.items.find(item => item.refId === state.selectedItemRefId);
    if (!selectedItem) return { error: "No item selected" };

    const validationError = validateRule(rule, state.items.length);
    if (validationError) {
      return { error: validationError };
    }

    const existingRule = state.rules.find(r =>
      r.itemRefId === selectedItem.refId && r.operation === rule.operation
    );
    if (existingRule) {
      return { error: `A ${rule.operation} rule already exists for this item` };
    }

    const id = uuidv4();
    const fullRule: InternalRule = {
      ...rule,
      id,
      itemRefId: selectedItem.refId,
      apiFormatted: ruleConfigs[rule.operation].formatForAPI({
        ...rule,
        id,
        itemRefId: selectedItem.refId
      }, state.items)
    };

    set(state => ({ rules: [...state.rules, fullRule] }));
    return {};
  },

  removeRule: (id) => set((state) => ({
    rules: state.rules.filter(r => r.id !== id)
  })),

  updateRule: (id, updatedRule) => set((state) => ({
    rules: state.rules.map(rule => {
      if (rule.id === id) {
        const updated: InternalRule = {
          ...rule,
          ...updatedRule,
          apiFormatted: ruleConfigs[rule.operation].formatForAPI({
            ...rule,
            ...updatedRule
          }, state.items)
        };
        return updated;
      }
      return rule;
    })
  })),

}));