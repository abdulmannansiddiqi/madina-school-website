'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageBackground from '../../components/PageBackground';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <main className="bg-[#F7F5EF] px-6 py-16 min-h-screen">
        <PageBackground>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-[#0F2557] mb-4 text-center">
              News & Announcements
            </h1>
            <p className="text-gray-600 text-center mb-12">
              Stay updated with the latest from Madina Model Higher
              Secondary School
            </p>

            {loading && (
              <p className="text-center text-gray-500">Loading news...</p>
            )}

            {!loading && news.length === 0 && (
              <p className="text-center text-gray-500">
                No announcements yet.
              </p>
            )}

            <div className="space-y-6">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-gray-200 p-6"
                >
                  <p className="text-sm text-[#1E7A4C] font-semibold mb-2">
                    {new Date(item.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <h3 className="text-xl font-semibold text-[#0F2557] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                  {item.pdfUrl && (
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-[#0F2557] font-semibold underline text-sm"
                    >
                      Download Attachment
                    </a>
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