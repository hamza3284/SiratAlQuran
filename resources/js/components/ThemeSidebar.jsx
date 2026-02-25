import React from 'react';

export default function ThemeSidebar({ themes, active, onSelect }) {
  return (
    <div className="bg-[#111827] rounded-2xl border border-gray-800 p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-300 mb-6">Browse by Theme</h3>
      <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar px-1">
        {themes.map((theme) => {
          const isActive = active === theme.slug;
          return (
            <div 
              key={theme.id} 
              onClick={() => onSelect(theme.slug)}
              className={`flex justify-between items-center cursor-pointer group transition-colors
                ${isActive ? 'text-[var(--primary)]' : 'text-gray-400 hover:text-[var(--primary)]'}
              `}
            >
              <span className={`text-base font-medium transition-transform ${!isActive && 'group-hover:translate-x-1'}`}>
                {theme.name}
              </span>
              <span className="text-sm opacity-60">
                {theme.ayats_count || 0} ayats
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
