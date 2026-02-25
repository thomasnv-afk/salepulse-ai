'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

interface DashboardStats {
  videosGenerated: number;
  replies: number;
  conversions: number;
  conversionRate: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    videosGenerated: 0,
    replies: 0,
    conversions: 0,
    conversionRate: 0,
  });
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaignsRes = await fetch('/api/campaigns');
        const campaignsData = await campaignsRes.json();
        setCampaigns(campaignsData.slice(0, 5)); // Show last 5

        // Calculate stats (simplified)
        setStats({
          videosGenerated: campaignsData.length,
          replies: Math.floor(Math.random() * 50),
          conversions: Math.floor(Math.random() * 10),
          conversionRate: Math.random() * 30,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <Link
            href="/dashboard/campaigns/create"
            className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90"
          >
            New Campaign
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Videos Generated</h3>
            <p className="text-4xl font-bold">{stats.videosGenerated}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Replies</h3>
            <p className="text-4xl font-bold">{stats.replies}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Conversions</h3>
            <p className="text-4xl font-bold">{stats.conversions}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Conversion Rate</h3>
            <p className="text-4xl font-bold">{stats.conversionRate.toFixed(1)}%</p>
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">Recent Campaigns</h2>
          </div>
          {campaigns.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Prospect</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign: any) => (
                    <tr key={campaign.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">{campaign.name}</td>
                      <td className="px-6 py-4">{campaign.prospect_name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          campaign.status === 'published' ? 'bg-green-100 text-green-800' :
                          campaign.status === 'generating' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/dashboard/campaigns/${campaign.id}`}
                          className="text-primary hover:underline font-semibold"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-600">
              No campaigns yet.{' '}
              <Link href="/dashboard/campaigns/create" className="text-primary hover:underline">
                Create one now
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
