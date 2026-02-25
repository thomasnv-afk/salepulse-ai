'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';

interface AnalyticsData {
  totalViews: number;
  totalReplies: number;
  totalConversions: number;
  conversionRate: number;
  replyRate: number;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    totalReplies: 0,
    totalConversions: 0,
    conversionRate: 0,
    replyRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch analytics data
    // This would typically come from /api/analytics
    setAnalytics({
      totalViews: Math.floor(Math.random() * 500),
      totalReplies: Math.floor(Math.random() * 100),
      totalConversions: Math.floor(Math.random() * 20),
      conversionRate: Math.random() * 15,
      replyRate: Math.random() * 30,
    });
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Analytics</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Views</h3>
            <p className="text-4xl font-bold">{analytics.totalViews}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Replies</h3>
            <p className="text-4xl font-bold">{analytics.totalReplies}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Conversions</h3>
            <p className="text-4xl font-bold">{analytics.totalConversions}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Conversion Rate</h3>
            <p className="text-4xl font-bold">{analytics.conversionRate.toFixed(1)}%</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Reply Rate</h2>
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-6xl font-bold text-primary">{analytics.replyRate.toFixed(1)}%</p>
                <p className="text-gray-600 mt-2">Average reply rate across all campaigns</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Top Campaigns</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <p className="font-semibold">Campaign A</p>
                <p className="text-green-600 font-bold">+5 conversions</p>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <p className="font-semibold">Campaign B</p>
                <p className="text-green-600 font-bold">+3 conversions</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">Campaign C</p>
                <p className="text-green-600 font-bold">+2 conversions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
