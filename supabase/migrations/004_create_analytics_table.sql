-- Create analytics table
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  video_id UUID REFERENCES videos(id) ON DELETE SET NULL,
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('view', 'reply', 'conversion', 'click', 'open')),
  user_email VARCHAR(255),
  metadata JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create RLS policies
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read analytics for their campaigns" ON analytics
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM campaigns 
    WHERE campaigns.id = analytics.campaign_id 
    AND campaigns.user_id = auth.uid()
  ));

CREATE POLICY "Analytics service can insert events" ON analytics
  FOR INSERT
  WITH CHECK (TRUE);

-- Create indexes
CREATE INDEX idx_analytics_campaign_id ON analytics(campaign_id);
CREATE INDEX idx_analytics_video_id ON analytics(video_id);
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_timestamp ON analytics(timestamp);
