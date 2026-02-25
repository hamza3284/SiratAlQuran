import React from 'react';
import BaseLayout from '../components/BaseLayout';

export default function AboutPage() {
  return (
    <BaseLayout>
      <section className="container mx-auto py-24" id="about">
        <h2 className="text-4xl font-bold mb-6">About SiratAlQuran</h2>
        <p className="text-[var(--muted-foreground)] mb-4">
          SiratAlQuran is designed to provide personal guidance through the Quran. We map life situations to verses for clarity, reflection, and personal growth.
        </p>
        <p className="text-[var(--muted-foreground)] mb-4">
          Every verse recommendation is curated to match the emotional and spiritual context of the user’s situation.
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-[var(--card)] rounded-lg border border-[var(--border)] text-center">
            <div className="text-3xl mb-3 text-[var(--primary)]">📖</div>
            <h3 className="font-semibold mb-2">Guided Verses</h3>
            <p className="text-[var(--muted-foreground)] text-sm">Receive verses tailored to your current situation.</p>
          </div>
          <div className="p-6 bg-[var(--card)] rounded-lg border border-[var(--border)] text-center">
            <div className="text-3xl mb-3 text-[var(--primary)]">💡</div>
            <h3 className="font-semibold mb-2">Clarity</h3>
            <p className="text-[var(--muted-foreground)] text-sm">Reflect with clarity and gain insights from Quranic teachings.</p>
          </div>
          <div className="p-6 bg-[var(--card)] rounded-lg border border-[var(--border)] text-center">
            <div className="text-3xl mb-3 text-[var(--primary)]">🛡️</div>
            <h3 className="font-semibold mb-2">Privacy</h3>
            <p className="text-[var(--muted-foreground)] text-sm">All reflections are private and stored securely.</p>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}