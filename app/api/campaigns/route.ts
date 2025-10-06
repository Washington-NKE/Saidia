import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const creatorId = searchParams.get('creatorId');

  try {
    let query = prisma
      .campaigns
      .findMany({
        include: {
          profiles: {
            select: {
              full_name: true,
              email: true
            }
          }
        },
        orderBy: {
          created_at: 'desc'
        }
      });

    if (status) {
      query = query.eq('status', status);
    }

    if (creatorId) {
      query = query.eq('creator_id', creatorId);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { creator_id, title, description, goal_amount, image_url, sdg_goal } = body;

    if (!creator_id || !title || !description || !goal_amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const data = await prisma.campaigns.create({
      data: {
        creator_id,
        title,
        description,
        goal_amount,
        image_url,
        sdg_goal,
        status: 'draft',
        raised_amount: 0,
      },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create campaign' }, { status: 500 });
  }
}
