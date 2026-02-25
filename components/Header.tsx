'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          SalesPulse AI
        </Link>
        
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-gray-600 hover:text-primary">
            Dashboard
          </Link>
          <Link href="/dashboard/campaigns" className="text-gray-600 hover:text-primary">
            Campaigns
          </Link>
          <Link href="/dashboard/analytics" className="text-gray-600 hover:text-primary">
            Analytics
          </Link>
          <Link href="/dashboard/settings" className="text-gray-600 hover:text-primary">
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}
