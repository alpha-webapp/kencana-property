"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">
              Kencana<span className="text-emerald-600">Property</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/properti?transaction=dijual"
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Beli
            </Link>
            <Link
              href="/properti?transaction=disewa"
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Sewa
            </Link>
            <Link
              href="/jual"
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Jual Properti
            </Link>
            <Link
              href="/tentang"
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Tentang
            </Link>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Login
            </Link>
            <Link
              href="/daftar"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 font-medium"
            >
              Daftar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/properti?transaction=dijual"
                className="text-gray-700 hover:text-emerald-600 font-medium"
              >
                Beli
              </Link>
              <Link
                href="/properti?transaction=disewa"
                className="text-gray-700 hover:text-emerald-600 font-medium"
              >
                Sewa
              </Link>
              <Link
                href="/jual"
                className="text-gray-700 hover:text-emerald-600 font-medium"
              >
                Jual Properti
              </Link>
              <Link
                href="/tentang"
                className="text-gray-700 hover:text-emerald-600 font-medium"
              >
                Tentang
              </Link>
              <Link
                href="/kontak"
                className="text-gray-700 hover:text-emerald-600 font-medium"
              >
                Kontak
              </Link>
              <hr className="border-gray-200" />
              <Link
                href="/login"
                className="text-gray-700 hover:text-emerald-600 font-medium"
              >
                Login
              </Link>
              <Link
                href="/daftar"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 font-medium text-center"
              >
                Daftar
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
