'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setChecking(false);
      loadNews();
    }
  }, [router]);

  function loadNews() {
    setLoading(true);
    fetch('http://localhost:5000/api/news')
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      });
  }

  async function handleAddNews(e) {
    e.preventDefault();
    setFormError('');
    const token = localStorage.getItem('adminToken');

    try {
      const res = await fetch('http://localhost:5000/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, date }),
      });

      if (!res.ok) {
        const data = await res.json();
        setFormError(data.error || 'Could not add news');
        return;
      }

      setTitle('');
      setDescription('');
      setDate('');

      loadNews();
    } catch (err) {
      setFormError('Something went wrong');
    }
  }

  async function handleDelete(id) {
    const confirmed = confirm('Are you sure you want to delete this news item?');
    if (!confirmed) return;

    const token = localStorage.getItem('adminToken');

    await fetch(`http://localhost:5000/api/news/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    loadNews();
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/dashboard" className="text-sm text-[#0F2557] font-semibold">
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-[#0F2557] mt-4 mb-8">
          Manage News
        </h1>

        {/* Add News Form */}
        <form
          onSubmit={handleAddNews}
          className="bg-white border border-gray-200 rounded-lg p-6 mb-10 space-y-4"
        >
          <h2 className="font-semibold text-[#0F2557]">Add News</h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />

          {formError && <p className="text-red-600 text-sm">{formError}</p>}

          <button
            type="submit"
            className="bg-[#0F2557] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#16326e] transition-colors"
          >
            Add News
          </button>
        </form>

        {/* News List */}
        {loading && <p className="text-gray-500">Loading news...</p>}

        <div className="space-y-3">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-[#0F2557]">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString('en-GB')}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 text-sm font-semibold hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}