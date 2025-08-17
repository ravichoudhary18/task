// src/components/Header.jsx
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import LogoutButton from "../LogoutButton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Left: Brand */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            TODO
          </span>
        </a>

        {/* Right: Desktop controls */}
        <div className="hidden items-center gap-2 md:flex">
          <LogoutButton />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-xl p-2 md:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="block border-t border-gray-200 px-4 py-3 md:hidden dark:border-gray-800 space-y-2">
          <LogoutButton className="w-full justify-center" />
        </div>
      )}
    </header>
  );
}
