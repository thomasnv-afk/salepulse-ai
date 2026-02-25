'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function CampaignsList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('/api/campaigns');
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Campaigns</h1>
          <Link
            href="/dashboard/campaigns/create"
            className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90"
          >
            New Campaign
          </Link>
        </div>

        {campaigns.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Prospect</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Company</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign: any) => (
                  <tr key={campaign.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{campaign.name}</td>
                    <td className="px-6 py-4">{campaign.prospect_name}</td>
                    <td className="px-6 py-4">{campaign.prospect_company}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        campaign.status === 'published' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'generating' ? 'bg-yellow-100 text-yellow-800' :
                        campaign.status === 'generated' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(campaign.created_at).toLocaleDateString()}
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
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">No campaigns yet</p>
            <Link
              href="/dashboard/campaigns/create"
              className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90"
            >
              Create Your First Campaign
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
