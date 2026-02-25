import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateVideo, generateScript } from '@/lib/heygen';

export async function POST(request: NextRequest) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { campaign_id } = body;

    // Verify campaign belongs to user
    const { data: campaign, error: campaignError } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', campaign_id)
      .eq('user_id', user.id)
      .single();

    if (campaignError || !campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    // Update campaign status to generating
    await supabase
      .from('campaigns')
      .update({ status: 'generating', updated_at: new Date().toISOString() })
      .eq('id', campaign_id);

    // Generate script
    const script = generateScript(
      campaign.prospect_name,
      campaign.prospect_company,
      campaign.custom_message || ''
    );

    // Call HeyGen API
    const videoData = await generateVideo({
      script,
      title: campaign.name,
    });

    // Create video record
    const { data: video, error: videoError } = await supabase
      .from('videos')
      .insert([
        {
          campaign_id,
          heygen_video_id: videoData.video_id,
          status: 'generating',
        },
      ])
      .select()
      .single();

    if (videoError) throw videoError;

    return NextResponse.json(video, { status: 201 });
  } catch (error: any) {
    console.error('Video generation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
