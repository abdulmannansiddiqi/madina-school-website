'use client';

import { useState } from 'react';

const links = [
  'Home',
  'About',
  'Academics',
  'Admissions',
  'Gallery',
  'News',
  'Contact',
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold tracking-wide">MMPS</span>

        {/* Desktop links - hidden on mobile */}
        <ul className="hidden md:flex gap-6 text-sm">
          {links.map((link) => (
            <li key={link}>{link}</li>
          ))}
        </ul>

        {/* Hamburger button - only visible on mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown menu - only shows when isOpen is true */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 mt-4 text-sm">
          {links.map((link) => (
            <li key={link}>{link}</li>
          ))}
        </ul>
      )}
    </nav>
  );
}