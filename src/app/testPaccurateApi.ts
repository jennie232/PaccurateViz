import { usePaccurateStore } from './store/paccurateStore';

export async function testPaccurateApi() {
    const state = usePaccurateStore.getState();
    const { items, boxTypeSets, customBoxTypes, selectedCustomBoxTypeIds } = state;

    const selectedCustomBoxTypes = customBoxTypes.filter((boxType: { id: string }) =>
        selectedCustomBoxTypeIds.includes(boxType.id)
    );

    const requestBody = {
        itemSets: items,
        boxTypes: selectedCustomBoxTypes,
        boxTypeSets: boxTypeSets,
    };

    try {
        const response = await fetch('/api/pack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Paccurate API response:', data);
        return data;
    } catch (error) {
        console.error('Error testing Paccurate API:', error);
        throw error;
    }
}