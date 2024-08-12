import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { itemType: string; ownerId: string } }
) {
  const ownerId = params.ownerId;
  try {
    const projects = await (db[params.itemType as any] as any).findMany({
      where: { ownerId },
    });
    if (!projects)
      return NextResponse.json({ error: 'No projects found' }, { status: 404 });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { message: 'internal server error', statusCode: 500 },
      { status: 500 }
    );
  }
}
