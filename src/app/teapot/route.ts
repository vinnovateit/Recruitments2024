import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse(JSON.stringify({ flag: "teap0t", instructions: "Append it to the previous flag after a dash (-)" }), {
    status: 418,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}