import { NextRequest, NextResponse } from 'next/server';

const PACCURATE_API_URL = 'https://api.paccurate.io/';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const paccurateRequest = {
            itemSets: body.itemSets,
            boxTypes: body.boxTypes,
            boxTypeSets: body.boxTypeSets,
        };

        const paccurateResponse = await fetch(PACCURATE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `apikey ${process.env.PACCURATE_API_KEY}`,
            },
            body: JSON.stringify(paccurateRequest),
        });

        if (!paccurateResponse.ok) {
            throw new Error(`Paccurate API responded with status: ${paccurateResponse.status}`);
        }

        const data = await paccurateResponse.json();

        return NextResponse.json(data);

    } catch (error) {
        console.error('Error in pack API route:', error);
        return NextResponse.json(
            { error: 'An error occurred while processing your request' },
            { status: 500 }
        );
    }
}