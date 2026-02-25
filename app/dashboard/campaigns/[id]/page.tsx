'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

export default function CampaignDetail() {
  const params = useParams();
  const [campaign, setCampaign] = useState<any>(null);
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`/api/campaigns/${params.id}`);
        const data = await response.json();
        setCampaign(data);
      } catch (error) {
        console.error('Error fetching campaign:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCampaign();
    }
  }, [params.id]);

  const handleGenerateVideo = async () => {
    if (!campaign) return;
    
    setGenerating(true);
    try {
      const response = await fetch('/api/videos/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaign_id: campaign.id }),
      });

      if (!response.ok) throw new Error('Failed to generate video');

      const videoData = await response.json();
      setVideo(videoData);

      // Update campaign status
      setCampaign({ ...campaign, status: 'generating' });
    } catch (error) {
      console.error('Error generating video:', error);
      alert('Failed to generate video');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!campaign) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p>Campaign not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/dashboard/campaigns" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Campaigns
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Campaign Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">{campaign.name}</h2>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-gray-600 text-sm">Prospect Name</p>
                <p className="font-semibold">{campaign.prospect_name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Company</p>
                <p className="font-semibold">{campaign.prospect_company}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="font-semibold">{campaign.prospect_email || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  campaign.status === 'published' ? 'bg-green-100 text-green-800' :
                  campaign.status === 'generating' ? 'bg-yellow-100 text-yellow-800' :
                  campaign.status === 'generated' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status}
                </span>
              </div>
            </div>

            {campaign.custom_message && (
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-600 text-sm font-semibold mb-2">Custom Message</p>
                <p className="text-gray-700">{campaign.custom_message}</p>
              </div>
            )}
          </div>

          {/* Video Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-2xl font-bold mb-6">Video</h3>

            {video || campaign.status !== 'draft' ? (
              <div className="space-y-4">
                <p className="text-gray-600">
                  {video?.status === 'completed' ? 'Video is ready!' : 'Video is being generated...'}
                </p>
                {video?.video_url && (
                  <div className="bg-gray-100 rounded aspect-video flex items-center justify-center">
                    <video
                      src={video.video_url}
                      controls
                      className="w-full h-full rounded"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-6">
                  Generate a personalized video for {campaign.prospect_name}
                </p>
                <button
                  onClick={handleGenerateVideo}
                  disabled={generating}
                  className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
                >
                  {generating ? 'Generating...' : 'Generate Video'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
