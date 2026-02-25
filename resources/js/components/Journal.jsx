import React, { useEffect, useState } from 'react';
import { getJournal, createJournalEntry } from '../services/journal';
import { useAuth } from '../context/AuthContext';
import BaseLayout from '../components/BaseLayout';

export default function Journal() {
  const { token, user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJournal = async () => {
    try {
      const res = await getJournal(token);
      setEntries(res.data);
    } catch (error) {
      console.error('Failed to fetch journal', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchJournal();
  }, [token]);

  if (!user) {
    return (
      <BaseLayout>
        <div className="container mx-auto py-20 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Please login to view your journal</h2>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className="container mx-auto py-12 max-w-4xl">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-3">My Journal</h1>
          <p className="text-[var(--muted-foreground)] text-lg">Record your reflections and thoughts on the Quran.</p>
        </div>

        {/* Entries List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Past Reflections</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
              <p className="text-[var(--muted-foreground)]">Loading your journal...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12 bg-[var(--card)] border border-[var(--border)] rounded-2xl border-dashed">
              <p className="text-[var(--muted-foreground)]">You haven't written any reflections yet.</p>
              <p className="text-sm text-gray-500 mt-2">Start by writing your first reflection above.</p>
            </div>
          ) : (
            entries.map(entry => (
              <div key={entry.id} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 hover:border-gray-700 transition-colors">
                {entry.ayat && (
                  <div className="mb-6 border-b border-gray-800 pb-4">
                     <p className="text-right font-quran text-2xl md:text-3xl leading-loose mb-3 text-[var(--foreground)]" dir="rtl">
                       {entry.ayat.text_ar}
                     </p>
                     {entry.ayat.text_en && (
                       <p className="text-[var(--muted-foreground)] italic text-sm md:text-base font-translation">
                         "{entry.ayat.text_en}"
                       </p>
                     )}
                  </div>
                )}
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">{entry.reflection_text}</p>
                </div>
                
                <div className="mt-4 pt-4 flex justify-between items-center text-xs text-gray-500 border-t border-gray-800/50">
                  <span>{entry.created_at ? new Date(entry.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Just now'}</span>
                  {entry.ayat && <span>Surah {entry.ayat.surah}: {entry.ayat.ayat}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </BaseLayout>
  );
}
