import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Set the auth token for this request
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: campaigns, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(campaigns || []);
  } catch (error: any) {
    console.error('GET /api/campaigns error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Decode token to get user ID (simple JWT decode)
    const parts = token.split('.');
    if (parts.length !== 3) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    try {
      const decoded = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
      const userId = decoded.sub;

      if (!userId) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }

      const body = await request.json();

      const { data: campaign, error } = await supabase
        .from('campaigns')
        .insert([
          {
            user_id: userId,
            name: body.name,
            prospect_name: body.prospect_name,
            prospect_company: body.prospect_company,
            prospect_email: body.prospect_email,
            custom_message: body.custom_message,
            status: 'draft',
          },
        ])
        .select()
        .single();

      if (error) throw error;

      return NextResponse.json(campaign, { status: 201 });
    } catch (decodeError: any) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  } catch (error: any) {
    console.error('POST /api/campaigns error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create campaign' }, { status: 500 });
  }
}
