import React from 'react';

export default function ThemeRow({ themes, active, onSelect }) {
  return (
    <div className="flex gap-3 py-2 overflow-x-auto custom-scrollbar flex-wrap md:flex-nowrap">
      {themes.map(theme => {
        const isActive = (typeof theme === 'string' ? theme : theme.slug) === active;
        const label = typeof theme === 'string' ? theme : theme.name;
        const value = typeof theme === 'string' ? theme : theme.slug;
        
        return (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm border cursor-pointer transition-colors ${
              isActive
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                : 'bg-transparent border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)]'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
