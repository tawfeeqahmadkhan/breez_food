 
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.breez.food/v1/restaurants?idroute=saladandsalad');
    
    if (!res.ok) {
       return NextResponse.json({ error: 'Failed to fetch from external API' }, { status: res.status });
    }
    const data = await res.json();
  
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}