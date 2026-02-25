-- Create videos table
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  heygen_video_id VARCHAR(255) UNIQUE,
  video_url TEXT,
  thumbnail_url TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'generating', 'completed', 'failed')),
  duration_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create RLS policies
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read videos for their campaigns" ON videos
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM campaigns 
    WHERE campaigns.id = videos.campaign_id 
    AND campaigns.user_id = auth.uid()
  ));

CREATE POLICY "Users can create videos for their campaigns" ON videos
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM campaigns 
    WHERE campaigns.id = videos.campaign_id 
    AND campaigns.user_id = auth.uid()
  ));

CREATE POLICY "Users can update videos for their campaigns" ON videos
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM campaigns 
    WHERE campaigns.id = videos.campaign_id 
    AND campaigns.user_id = auth.uid()
  ));

-- Create indexes
CREATE INDEX idx_videos_campaign_id ON videos(campaign_id);
CREATE INDEX idx_videos_heygen_video_id ON videos(heygen_video_id);
CREATE INDEX idx_videos_status ON videos(status);
