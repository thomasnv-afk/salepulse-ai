import Link from 'next/link';
import PricingCard from '@/components/PricingCard';
import { PRICING_PLANS } from '@/lib/stripe';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">SalesPulse AI</h1>
        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="text-gray-600 hover:text-primary font-semibold"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          AI-Powered <span className="gradient-text">Video Prospecting</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Generate personalized AI videos for your sales outreach in seconds. Increase reply rates
          and close more deals with authentic video messages.
        </p>
        <Link
          href="/auth/signup"
          className="inline-block px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90"
        >
          Start Free Trial
        </Link>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center mb-16">Why SalesPulse AI?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI Video Generation',
                description: 'Create personalized videos automatically with our advanced AI avatars',
              },
              {
                title: 'Higher Reply Rates',
                description: 'Video messages get 3-5x higher engagement than text emails',
              },
              {
                title: 'Salesforce Integration',
                description: 'Seamlessly integrate with your existing CRM and sales workflows',
              },
              {
                title: 'Advanced Analytics',
                description: 'Track opens, clicks, views, and conversions in real-time',
              },
              {
                title: 'Easy to Use',
                description: 'No technical skills required. Create campaigns in minutes',
              },
              {
                title: 'Priority Support',
                description: 'Get help from our sales experts whenever you need it',
              },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center mb-16">Simple, Transparent Pricing</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              name={PRICING_PLANS.starter.name}
              tier="starter"
              price={PRICING_PLANS.starter.price}
              features={PRICING_PLANS.starter.features}
              description="Perfect for getting started with video prospecting"
            />
            <PricingCard
              name={PRICING_PLANS.pro.name}
              tier="pro"
              price={PRICING_PLANS.pro.price}
              features={PRICING_PLANS.pro.features}
              description="For sales teams ready to scale"
              featured
            />
            <PricingCard
              name={PRICING_PLANS.enterprise.name}
              tier="enterprise"
              price={PRICING_PLANS.enterprise.price}
              features={PRICING_PLANS.enterprise.features}
              description="Custom solution for enterprise teams"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Sales Process?</h3>
          <p className="text-lg mb-8">
            Join hundreds of sales teams already using SalesPulse AI to close more deals
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-8 py-4 bg-white text-primary rounded-lg font-semibold text-lg hover:bg-gray-100"
          >
            Start Your Free Trial Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 SalesPulse AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
