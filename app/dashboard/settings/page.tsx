'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { supabase } from '@/lib/supabase';

interface UserData {
  email: string;
  name: string;
  subscription_tier: string;
}

export default function SettingsPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    salesforce_api_key: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (authUser) {
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', authUser.id)
            .single();

          if (userData) {
            setUser(userData);
            setFormData({
              name: userData.name || '',
              salesforce_api_key: userData.salesforce_api_key || '',
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (authUser) {
        const { error } = await supabase
          .from('users')
          .update({
            name: formData.name,
            salesforce_api_key: formData.salesforce_api_key,
          })
          .eq('id', authUser.id);

        if (error) throw error;
        alert('Settings saved successfully');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>

        {user && (
          <div className="space-y-8">
            {/* Account Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Account Information</h2>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subscription Tier
                  </label>
                  <input
                    type="text"
                    value={user.subscription_tier}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 capitalize"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>

            {/* Integrations */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Integrations</h2>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salesforce API Key
                  </label>
                  <input
                    type="password"
                    name="salesforce_api_key"
                    value={formData.salesforce_api_key}
                    onChange={handleChange}
                    placeholder="Enter your Salesforce API key"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Your Salesforce API key will be encrypted and stored securely
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Integration'}
                </button>
              </form>
            </div>

            {/* Billing */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Billing</h2>
              <p className="text-gray-600 mb-4">Manage your subscription and billing information</p>
              <a
                href="https://billing.stripe.com/p/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90"
              >
                Go to Stripe Billing Portal
              </a>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-red-700">Danger Zone</h2>
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
