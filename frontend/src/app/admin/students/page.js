
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  // Form state
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [contact, setContact] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setChecking(false);
      loadStudents();
    }
  }, [router]);

  function loadStudents() {
    const token = localStorage.getItem('adminToken');
    setLoading(true);
    fetch('http://localhost:5000/api/students', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      });
  }

  async function handleAddStudent(e) {
    e.preventDefault();
    setFormError('');
    const token = localStorage.getItem('adminToken');

    try {
      const res = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, className, section, fatherName, contact }),
      });

      if (!res.ok) {
        const data = await res.json();
        setFormError(data.error || 'Could not add student');
        return;
      }

      setName('');
      setClassName('');
      setSection('');
      setFatherName('');
      setContact('');

      loadStudents();
    } catch (err) {
      setFormError('Something went wrong');
    }
  }

  async function handleDelete(id) {
    const confirmed = confirm('Are you sure you want to delete this student?');
    if (!confirmed) return;

    const token = localStorage.getItem('adminToken');

    await fetch(`http://localhost:5000/api/students/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    loadStudents();
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
          Manage Students
        </h1>

        {/* Add Student Form */}
        <form
          onSubmit={handleAddStudent}
          className="bg-white border border-gray-200 rounded-lg p-6 mb-10 space-y-4"
        >
          <h2 className="font-semibold text-[#0F2557]">Add New Student</h2>

          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="text"
            placeholder="Class (e.g. 9th)"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="text"
            placeholder="Section (e.g. A)"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="text"
            placeholder="Father's Name"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />

          {formError && <p className="text-red-600 text-sm">{formError}</p>}

          <button
            type="submit"
            className="bg-[#0F2557] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#16326e] transition-colors"
          >
            Add Student
          </button>
        </form>

        {/* Students List */}
        {loading && <p className="text-gray-500">Loading students...</p>}

        <div className="space-y-3">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-[#0F2557]">{student.name}</p>
                <p className="text-sm text-gray-500">
                  Class {student.className} - {student.section} | Father:{' '}
                  {student.fatherName} | {student.contact}
                </p>
              </div>
              <button
                onClick={() => handleDelete(student.id)}
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