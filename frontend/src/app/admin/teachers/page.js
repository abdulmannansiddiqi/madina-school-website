'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  // Form state
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [subject, setSubject] = useState('');
  const [qualification, setQualification] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [showPhoto, setShowPhoto] = useState(true);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setChecking(false);
      loadTeachers();
    }
  }, [router]);

  function loadTeachers() {
    setLoading(true);
    fetch('http://localhost:5000/api/teachers')
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);
        setLoading(false);
      });
  }

  async function handleAddTeacher(e) {
    e.preventDefault();
    setFormError('');
    const token = localStorage.getItem('adminToken');

    try {
      const res = await fetch('http://localhost:5000/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          designation,
          subject,
          qualification,
          isPublic,
          showPhoto,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setFormError(data.error || 'Could not add teacher');
        return;
      }

      // Clear the form
      setName('');
      setDesignation('');
      setSubject('');
      setQualification('');
      setIsPublic(true);
      setShowPhoto(true);

      // Refresh the list
      loadTeachers();
    } catch (err) {
      setFormError('Something went wrong');
    }
  }

  async function handleDelete(id) {
    const confirmed = confirm('Are you sure you want to delete this teacher?');
    if (!confirmed) return;

    const token = localStorage.getItem('adminToken');

    await fetch(`http://localhost:5000/api/teachers/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    loadTeachers();
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
          Manage Teachers
        </h1>

        {/* Add Teacher Form */}
        <form
          onSubmit={handleAddTeacher}
          className="bg-white border border-gray-200 rounded-lg p-6 mb-10 space-y-4"
        >
          <h2 className="font-semibold text-[#0F2557]">Add New Teacher</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="text"
            placeholder="Designation (optional)"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="text"
            placeholder="Subject (optional)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="text"
            placeholder="Qualification (optional)"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />

          <div className="flex gap-6 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              Show on website
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showPhoto}
                onChange={(e) => setShowPhoto(e.target.checked)}
              />
              Show photo
            </label>
          </div>

          {formError && <p className="text-red-600 text-sm">{formError}</p>}

          <button
            type="submit"
            className="bg-[#0F2557] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#16326e] transition-colors"
          >
            Add Teacher
          </button>
        </form>

        {/* Teachers List */}
        {loading && <p className="text-gray-500">Loading teachers...</p>}

        <div className="space-y-3">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-[#0F2557]">{teacher.name}</p>
                <p className="text-sm text-gray-500">
                  {teacher.designation || 'No designation'} —{' '}
                  {teacher.subject || 'No subject'}
                </p>
              </div>
              <button
                onClick={() => handleDelete(teacher.id)}
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