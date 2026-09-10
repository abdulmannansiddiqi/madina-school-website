'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      router.push('/admin/login');
    } else {
      setChecking(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#0F2557]">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="text-red-600 font-semibold text-sm hover:underline"
          >
            Logout
          </button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {['Teachers', 'Students', 'News', 'Achievements'].map((item) => (
            <div
              key={item}
              className="bg-white border border-gray-200 rounded-lg p-6 text-center font-semibold text-[#0F2557]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}