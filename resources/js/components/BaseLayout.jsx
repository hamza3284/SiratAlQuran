import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const BaseLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <main className="flex-1 px-4 md:px-8 lg:px-12 xl:px-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] mt-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 py-12 flex flex-col md:grid md:grid-cols-3 items-center gap-6 md:gap-0">
          <div className="flex items-center gap-4 text-[var(--muted-foreground)] font-semibold order-2 md:order-1 md:justify-self-start">
            <div className="bg-[var(--card)] rounded-2xl flex items-center gap-6 p-6 border border-[var(--border)] pr-12 shadow-xl">
              <div className="w-20 h-20 flex-shrink-0 bg-[var(--primary)] rounded-xl p-1.5 shadow-lg shadow-[var(--primary)]/10">
                <img src="/SiratAlQuranLogo.png" alt="SiratAlQuran Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">SiratAlQuran</span>
            </div>
          </div>
          <div className="flex gap-6 order-1 md:order-2 md:justify-self-center">
            <Link to="/about" className="hover:text-[var(--primary)]">Privacy</Link>
            <Link to="/contact" className="hover:text-[var(--primary)]">Contact</Link>
            <Link to="/about" className="hover:text-[var(--primary)]">About</Link>
          </div>
          <div className="text-[var(--muted-foreground)] text-sm order-3 md:justify-self-end">© SiratAlQuran</div>
        </div>
      </footer>
    </div>
  );
};

export default BaseLayout;
