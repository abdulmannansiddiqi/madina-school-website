'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageBackground from '../../components/PageBackground';

// Add or remove photo entries here as you get new ones.
// category must match one of the categories array below.
const photos = [
  // Building
  { src: '/images/gallery/building/mmps.jpg', category: 'Building' },

  // Principal
  { src: '/images/gallery/principal/MR AKBAR SIDDIQI FRONT.jpg', category: 'Principal' },

  // Teachers
  { src: '/images/gallery/teachers/IFTIKHAR.jpg', category: 'Teachers' },
  { src: '/images/gallery/teachers/IRFAN.jpg', category: 'Teachers' },
  { src: '/images/gallery/teachers/NAZIM.jpg', category: 'Teachers' },
  { src: '/images/gallery/teachers/SALMAN.jpg', category: 'Teachers' },

  // Achievements
  { src: '/images/gallery/achievements/1.jpg', category: 'Achievements' },
  { src: '/images/gallery/achievements/1st position naat .png', category: 'Achievements' },
  { src: '/images/gallery/achievements/1ST POSITION.png', category: 'Achievements' },
  { src: '/images/gallery/achievements/1ST_POSITION.png', category: 'Achievements' },
  { src: '/images/gallery/achievements/3RD POSITION.png', category: 'Achievements' },
  { src: '/images/gallery/achievements/Aleeza.png', category: 'Achievements' },
  { src: '/images/gallery/achievements/IMG_0873.png', category: 'Achievements' },
  { src: '/images/gallery/achievements/IMG_0882.png', category: 'Achievements' },
  { src: '/images/gallery/achievements/IMG_0898.png', category: 'Achievements' },
  { src: '/images/gallery/achievements/IMG_0907.png', category: 'Achievements' },
  { src: '/images/gallery/achievements/New.JPEG.jpg', category: 'Achievements' },
  { src: '/images/gallery/achievements/prize.jpg', category: 'Achievements' },
  { src: '/images/gallery/achievements/prizes.png', category: 'Achievements' },
  { src: '/images/gallery/achievements/PXL_20231114_092126269.png', category: 'Achievements' },
  { src: '/images/gallery/achievements/Shazim Ali .png', category: 'Achievements' },
  { src: '/images/gallery/achievements/UMAIR LIAQAT.png', category: 'Achievements' },

  // Students
  { src: '/images/gallery/student-pictures/1 NEW.png', category: 'Students' },
  { src: '/images/gallery/student-pictures/2.png', category: 'Students' },
  { src: '/images/gallery/student-pictures/3.jpg', category: 'Students' },
  { src: '/images/gallery/student-pictures/3.png', category: 'Students' },
  { src: '/images/gallery/student-pictures/4.jpg', category: 'Students' },
  { src: '/images/gallery/student-pictures/5.jpg', category: 'Students' },
  { src: '/images/gallery/student-pictures/6.jpg', category: 'Students' },
  { src: '/images/gallery/student-pictures/20240301124327.png', category: 'Students' },
  { src: '/images/gallery/student-pictures/20240301124924.png', category: 'Students' },
  { src: '/images/gallery/student-pictures/20240301130630.png', category: 'Students' },
  { src: '/images/gallery/student-pictures/20240301131555.png', category: 'Students' },
  { src: '/images/gallery/student-pictures/IMG-20240205-WA0127 copy.jpg', category: 'Students' },
  { src: '/images/gallery/student-pictures/IMG-20240205-WA0131 copy.jpg', category: 'Students' },
  { src: '/images/gallery/student-pictures/IMG-20240205-WA0135 copy.jpg', category: 'Students' },
  { src: '/images/gallery/student-pictures/IMG-20240205-WA0138 copy.jpg', category: 'Students' },
  { src: '/images/gallery/student-pictures/kids.jpg', category: 'Students' },
  { src: '/images/gallery/student-pictures/student7.jpg', category: 'Students' },
  { src: '/images/gallery/student-pictures/student8.jpg', category: 'Students' },
  { src: '/images/gallery/student-pictures/student9.jpg', category: 'Students' },
];

const categories = [
  'All',
  'Building',
  'Teachers',
  'Students',
  'Achievements',
  'Principal',
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredPhotos =
    activeCategory === 'All'
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

  return (
    <>
      <Navbar />

      <main className="bg-[#F7F5EF] px-6 py-16 min-h-screen">
        <PageBackground>
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-[#0F2557] mb-4 text-center">
              Gallery
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Moments from school life at MMPS
            </p>

            {/* Category filter buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#0F2557] text-white'
                      : 'bg-white text-[#0F2557] border border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Photo grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredPhotos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPhoto(photo.src)}
                  className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <Image
                    src={photo.src}
                    alt={photo.category}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {filteredPhotos.length === 0 && (
              <p className="text-center text-gray-500">
                No photos in this category yet.
              </p>
            )}
          </div>
        </PageBackground>
      </main>

      <Footer />

      {/* Lightbox overlay - only shows when a photo is selected */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50 cursor-pointer"
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-white text-3xl font-bold"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="relative w-full max-w-3xl h-[80vh]">
            <Image
              src={selectedPhoto}
              alt="Enlarged view"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}