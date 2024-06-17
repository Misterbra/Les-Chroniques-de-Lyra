"use client";

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link href="/">Accueil</Link>
        <Link href="/quest">Votre Quête</Link>
        <Link href="/profile">Profil</Link>
        <Link href="/history">Histoire</Link>
      </nav>
    </header>
  );
}
