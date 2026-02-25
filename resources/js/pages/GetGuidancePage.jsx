import React, { useState, useEffect } from 'react';
import BaseLayout from '../components/BaseLayout';
import { getGuidance } from '../services/classifier';
import { Link } from 'react-router-dom';

export default function GetGuidancePage() {
  const [userText, setUserText] = useState('');
  const [primaryAyat, setPrimaryAyat] = useState(null);
  const [supportingAyats, setSupportingAyats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for query parameter on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
      setUserText(query);
      fetchGuidance(query);
    }
  }, []);

  const fetchGuidance = async (text = userText) => {
    if (!text.trim()) return;
    
    // Simple frontend validation
    if (text.trim().length < 5) {
      setError('Please enter at least 5 characters.');
      return;
    }

    setLoading(true);
    setError(null);
    setPrimaryAyat(null);
    setSupportingAyats([]);

    try {
      const data = await getGuidance(text);
      
      if (data.primary_ayat) {
        setPrimaryAyat(data.primary_ayat);
      }
      
      if (data.supporting_ayats) {
        setSupportingAyats(data.supporting_ayats);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to get guidance. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseLayout>
      <section className="container mx-auto py-24">
        <h2 className="text-4xl font-bold mb-6">Get Guidance</h2>
        <div className="flex flex-col gap-4 mb-8">
            <textarea
                value={userText}
                onChange={(e) => {
                  setUserText(e.target.value);
                  if (error) setError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    fetchGuidance();
                  }
                }}
                placeholder="What are you struggling with? (e.g., I feel overwhelmed by work, minimum 5 characters)"
                className={`w-full p-4 border rounded bg-[var(--input)] text-[var(--foreground)] h-32 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${error ? 'border-red-500' : 'border-[var(--border)]'}`}
            />
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button 
                onClick={() => fetchGuidance()}
                disabled={loading || !userText.trim()}
                className="bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-3 rounded self-start hover:opacity-90 transition-opacity disabled:opacity-50"
            >
                {loading ? 'Analyzing...' : 'Get Guidance'}
            </button>
        </div>

        {primaryAyat && (
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--primary)]">Primary Guidance</h2>
            <div className="p-8 border border-[var(--border)] rounded-lg bg-[var(--card)] shadow-lg">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-[var(--primary)] text-[var(--primary-foreground)] text-sm px-3 py-1 rounded-full">
                  Surah {primaryAyat.surah}:{primaryAyat.ayat}
                </span>
                <Link 
                  to={`/ayats/${primaryAyat.id}`}
                  className="text-[var(--muted-foreground)] hover:text-[var(--primary)] text-sm font-medium flex items-center gap-1 transition-colors"
                >
                  <iconify-icon icon="lucide:pen-tool" width="14"></iconify-icon> Reflect
                </Link>
              </div>
              <p className="text-3xl font-bold mb-6 text-right font-quran leading-loose" dir="rtl">{primaryAyat.text_ar}</p>
              <p className="mb-4 text-xl leading-relaxed text-[var(--foreground)]">{primaryAyat.text_en}</p>
              {primaryAyat.explanation && (
                <div className="mt-6 pt-6 border-t border-[var(--border)]">
                  <p className="italic text-[var(--muted-foreground)]">"{primaryAyat.explanation}"</p>
                </div>
              )}
            </div>
          </div>
        )}

        {supportingAyats.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--muted-foreground)]">Additional Wisdom</h2>
            <div className="grid gap-6">
              {supportingAyats.map(ayat => (
                <div key={ayat.id} className="p-6 border border-[var(--border)] rounded-lg bg-[var(--card)] hover:border-[var(--primary)] transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-medium text-[var(--muted-foreground)] border border-[var(--border)] px-2 py-1 rounded">
                      {ayat.surah}:{ayat.ayat}
                    </span>
                    <Link 
                      to={`/ayats/${ayat.id}`}
                      className="text-[var(--muted-foreground)] hover:text-[var(--primary)] text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      <iconify-icon icon="lucide:pen-tool" width="14"></iconify-icon> Reflect
                    </Link>
                  </div>
                  <div className="flex flex-col gap-4">
                      <span className="text-2xl font-bold text-right font-quran leading-loose" dir="rtl">{ayat.text_ar}</span>
                      <span className="text-lg text-[var(--foreground)]">{ayat.text_en}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </BaseLayout>
  );
}
