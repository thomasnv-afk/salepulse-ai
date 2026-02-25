'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CampaignForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    prospect_name: '',
    prospect_company: '',
    prospect_email: '',
    custom_message: '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create campaign');

      const { id } = await response.json();
      router.push(`/dashboard/campaigns/${id}`);
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create Campaign</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Prospect Name</label>
        <input
          type="text"
          name="prospect_name"
          value={formData.prospect_name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Prospect Company</label>
        <input
          type="text"
          name="prospect_company"
          value={formData.prospect_company}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Prospect Email</label>
        <input
          type="email"
          name="prospect_email"
          value={formData.prospect_email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Custom Message</label>
        <textarea
          name="custom_message"
          value={formData.custom_message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2 rounded font-semibold hover:opacity-90 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Campaign'}
      </button>
    </form>
  );
}
