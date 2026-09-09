'use client';

import { useState } from 'react';
import Link from 'next/link';

const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Academics', href: '/academics' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-wide">
          MMPS.
        </Link>

        {/* Desktop links - hidden on mobile */}
        <ul className="hidden md:flex gap-6 text-sm">
          {links.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:text-gray-300 transition-colors">
                {link.name}
              </Link>
            </li>
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

      {/* Mobile dropdown menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 mt-4 text-sm">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="block"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}