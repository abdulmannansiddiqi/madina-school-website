'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageBackground from '../../components/PageBackground';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/achievements')
      .then((res) => res.json())
      .then((data) => {
        setAchievements(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching achievements:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <main className="bg-[#F7F5EF] px-6 py-16 min-h-screen">
        <PageBackground>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-[#0F2557] mb-4 text-center">
              Achievements
            </h1>
            <p className="text-gray-600 text-center mb-12">
              Celebrating our students&apos; success over the years
            </p>

            {loading && (
              <p className="text-center text-gray-500">
                Loading achievements...
              </p>
            )}

            {!loading && achievements.length === 0 && (
              <p className="text-center text-gray-500">
                No achievements added yet.
              </p>
            )}

            <div className="grid sm:grid-cols-2 gap-6">
              {achievements.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-[#1E7A4C] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {item.year || 'Achievement'}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0F2557] mb-1">
                    {item.title}
                  </h3>
                  {item.studentName && (
                    <p className="text-sm text-gray-500 mb-2">
                      {item.studentName}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </PageBackground>
      </main>

      <Footer />
    </>
  );
}