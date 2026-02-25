'use client';

import Link from 'next/link';
import { SubscriptionTier } from '@/types';

interface PricingCardProps {
  name: string;
  tier: SubscriptionTier;
  price: number;
  features: string[];
  description: string;
  featured?: boolean;
}

export default function PricingCard({
  name,
  tier,
  price,
  features,
  description,
  featured = false,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-lg shadow p-8 ${
        featured ? 'border-2 border-primary bg-blue-50' : 'border border-gray-200'
      }`}
    >
      {featured && <div className="text-primary font-semibold text-sm mb-2">MOST POPULAR</div>}
      
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>

      <div className="mb-6">
        {tier === 'enterprise' ? (
          <div className="text-3xl font-bold">Custom</div>
        ) : (
          <>
            <div className="text-4xl font-bold">${(price / 100).toFixed(0)}</div>
            <div className="text-gray-600 text-sm">/month</div>
          </>
        )}
      </div>

      <Link
        href="/auth/signup"
        className={`w-full py-2 rounded font-semibold text-center block mb-6 ${
          featured
            ? 'bg-primary text-white hover:opacity-90'
            : 'border border-primary text-primary hover:bg-primary hover:text-white'
        }`}
      >
        {tier === 'enterprise' ? 'Contact Sales' : 'Start Free Trial'}
      </Link>

      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center text-sm">
            <span className="text-green-500 mr-3">✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
