export type SubscriptionTier = 'starter' | 'pro' | 'enterprise';
export type CampaignStatus = 'draft' | 'generating' | 'generated' | 'published' | 'failed';
export type VideoStatus = 'pending' | 'generating' | 'completed' | 'failed';
export type AnalyticsEventType = 'view' | 'reply' | 'conversion' | 'click' | 'open';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';

export interface User {
  id: string;
  email: string;
  name?: string;
  stripe_customer_id?: string;
  subscription_tier: SubscriptionTier;
  salesforce_api_key?: string;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  user_id: string;
  name: string;
  prospect_name: string;
  prospect_company: string;
  prospect_email?: string;
  custom_message?: string;
  status: CampaignStatus;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: string;
  campaign_id: string;
  heygen_video_id?: string;
  video_url?: string;
  thumbnail_url?: string;
  status: VideoStatus;
  duration_seconds?: number;
  created_at: string;
  updated_at: string;
}

export interface Analytics {
  id: string;
  campaign_id: string;
  video_id?: string;
  event_type: AnalyticsEventType;
  user_email?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id?: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  amount_monthly?: number;
  billing_date?: string;
  renewal_date?: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface PricingPlan {
  name: string;
  tier: SubscriptionTier;
  price: number;
  features: string[];
  description: string;
  stripePriceId: string;
}
