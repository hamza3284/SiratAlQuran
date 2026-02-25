import React from 'react';

const StepCard = ({ icon, title, desc }) => {
  return (
    <div className="p-8 bg-[var(--card)] border border-[var(--border)] rounded-lg flex flex-col items-center text-center gap-4">
      <div className="w-12 h-12 bg-[var(--input)] rounded-md flex items-center justify-center text-[var(--primary)] text-xl">
        <iconify-icon icon={icon} />
      </div>
      <div className="font-semibold text-lg">{title}</div>
      <p className="text-[var(--muted-foreground)] text-sm">{desc}</p>
    </div>
  );
};

export default StepCard;