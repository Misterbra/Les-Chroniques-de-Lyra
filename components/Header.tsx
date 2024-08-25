"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Accueil' },
    { href: '/quest', label: 'Ta Quête' },
    { href: '/profile', label: 'Profil' },
    { href: '/history', label: 'Histoire' },
    { href: '/pathanalyzer', label: 'Analyseur de Parcours' }, // Nouvel élément ajouté
  ];

  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Les Chroniques de Lyra
        </Link>

        {/* Navigation pour desktop */}
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-blue-300 transition-colors ${
                pathname === item.href ? 'text-blue-300 font-semibold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bouton menu pour mobile */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-2 px-4 hover:bg-gray-800 ${
                pathname === item.href ? 'bg-gray-800 font-semibold' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}