'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  const [studentName, setStudentName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setChecking(false);
      loadAchievements();
    }
  }, [router]);

  function loadAchievements() {
    setLoading(true);
    fetch('http://localhost:5000/api/achievements')
      .then((res) => res.json())
      .then((data) => {
        setAchievements(data);
        setLoading(false);
      });
  }

  async function handleAdd(e) {
    e.preventDefault();
    setFormError('');
    const token = localStorage.getItem('adminToken');

    try {
      const res = await fetch('http://localhost:5000/api/achievements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          studentName,
          title,
          description,
          year: year ? parseInt(year) : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setFormError(data.error || 'Could not add achievement');
        return;
      }

      setStudentName('');
      setTitle('');
      setDescription('');
      setYear('');

      loadAchievements();
    } catch (err) {
      setFormError('Something went wrong');
    }
  }

  async function handleDelete(id) {
    const confirmed = confirm('Are you sure you want to delete this achievement?');
    if (!confirmed) return;

    const token = localStorage.getItem('adminToken');

    await fetch(`http://localhost:5000/api/achievements/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    loadAchievements();
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
          Manage Achievements
        </h1>

        {/* Add Achievement Form */}
        <form
          onSubmit={handleAdd}
          className="bg-white border border-gray-200 rounded-lg p-6 mb-10 space-y-4"
        >
          <h2 className="font-semibold text-[#0F2557]">Add Achievement</h2>

          <input
            type="text"
            placeholder="Student Name (optional)"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="text"
            placeholder="Title (e.g. 1st Position - District)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="number"
            placeholder="Year (e.g. 2026)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />

          {formError && <p className="text-red-600 text-sm">{formError}</p>}

          <button
            type="submit"
            className="bg-[#0F2557] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#16326e] transition-colors"
          >
            Add Achievement
          </button>
        </form>

        {/* Achievements List */}
        {loading && <p className="text-gray-500">Loading achievements...</p>}

        <div className="space-y-3">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-[#0F2557]">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {item.studentName || 'School'} {item.year && `— ${item.year}`}
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