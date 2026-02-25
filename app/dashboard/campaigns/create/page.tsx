'use client';

import Header from '@/components/Header';
import CampaignForm from '@/components/CampaignForm';

export default function CreateCampaign() {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CampaignForm />
      </div>
    </>
  );
}
