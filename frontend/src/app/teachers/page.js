'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageBackground from '../../components/PageBackground';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/teachers')
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching teachers:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <main className="bg-[#F7F5EF] px-6 py-16 min-h-screen">
        <PageBackground>
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-[#0F2557] mb-4 text-center">
              Our Team
            </h1>
            <p className="text-gray-600 text-center mb-12">
              Meet the dedicated educators of Madina Model Higher Secondary
              School
            </p>

            {loading && (
              <p className="text-center text-gray-500">
                Loading teachers...
              </p>
            )}

            {!loading && teachers.length === 0 && (
              <p className="text-center text-gray-500">
                No teachers added yet.
              </p>
            )}

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-[#0F2557]">
                    {teacher.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-[#0F2557]">
                    {teacher.name}
                  </h3>
                  {teacher.designation && (
                    <p className="text-sm text-gray-500">
                      {teacher.designation}
                    </p>
                  )}
                  {teacher.subject && (
                    <p className="text-sm text-gray-600 mt-2">
                      {teacher.subject}
                    </p>
                  )}
                  {teacher.qualification && (
                    <p className="text-xs text-gray-400 mt-1">
                      {teacher.qualification}
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