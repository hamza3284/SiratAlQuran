import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import BaseLayout from '../../components/BaseLayout';

export default function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { label: 'Themes', path: '/admin/themes' },
    { label: 'Ayats', path: '/admin/ayats' },
    { label: 'Contacts', path: '/admin/contacts' },
  ];

  return (
    <BaseLayout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Admin Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6 text-[var(--primary)]">Admin Panel</h2>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      location.pathname.startsWith(item.path)
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                        : 'text-[var(--muted-foreground)] hover:bg-[var(--bg-main)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </BaseLayout>
  );
}
