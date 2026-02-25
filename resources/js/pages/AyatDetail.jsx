import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import BaseLayout from '../components/BaseLayout';
import { getAyatPublic } from '../services/ayat';
import { createJournalEntry } from '../services/journal';
import { useAuth } from '../context/AuthContext';

export default function AyatDetail() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [ayat, setAyat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reflection, setReflection] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAyatPublic(id)
      .then(res => {
        setAyat(res.data);
        if (res.data.user_reflection) {
          setReflection(res.data.user_reflection);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!user) {
        navigate('/login');
        return;
    }

    if (!reflection.trim()) return;

    setSubmitting(true);
    setMessage('');
    try {
      await createJournalEntry(token, {
        ayat_id: id,
        reflection_text: reflection
      });
      setMessage('Reflection saved to your journal!');
      setReflection('');
    } catch (error) {
      console.error(error);
      setMessage('Failed to save reflection.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <BaseLayout>
        <div className="container mx-auto py-20 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
          <p className="text-[var(--muted-foreground)]">Loading Ayat...</p>
        </div>
      </BaseLayout>
    );
  }

  if (!ayat) {
    return (
      <BaseLayout>
        <div className="container mx-auto py-20 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Ayat not found</h2>
          <Link to="/ayats" className="text-[var(--primary)] mt-4 inline-block hover:underline">Browse Ayats</Link>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation Back */}
          <Link to="/ayats" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-8 inline-flex items-center gap-2">
            <iconify-icon icon="lucide:arrow-left"></iconify-icon> Back to Ayats
          </Link>

          {/* Ayat Display */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 md:p-12 mb-12 shadow-sm">
            <div className="flex justify-between items-start mb-8 border-b border-gray-800 pb-4">
              <span className="bg-[var(--primary)] text-[var(--primary-foreground)] px-3 py-1 rounded text-sm font-medium">
                Surah {ayat.surah}, Ayat {ayat.ayat}
              </span>
              <div className="flex gap-2">
                 {ayat.themes && ayat.themes.map(t => (
                   <span key={t.id} className="text-[var(--muted-foreground)] text-xs border border-gray-700 px-2 py-1 rounded-full">
                     {t.name}
                   </span>
                 ))}
              </div>
            </div>

            <p className="text-3xl md:text-5xl text-right font-quran leading-[2.5] mb-10 text-[var(--foreground)]" dir="rtl">
              {ayat.text_ar}
            </p>
            
            <p className="text-xl md:text-2xl font-translation leading-relaxed text-[var(--muted-foreground)]">
              {ayat.text_en}
            </p>
          </div>

          {/* Reflection Form */}
          <div className="bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                 <iconify-icon icon="lucide:pen-tool" width="20"></iconify-icon>
               </div>
               <h3 className="text-xl font-bold text-[var(--foreground)]">Reflect on this Ayat</h3>
            </div>

            <form onSubmit={handleSave}>
              <textarea
                className="w-full bg-[#020617] border border-gray-800 rounded-xl p-4 text-white mb-4 focus:outline-none focus:border-[var(--primary)] transition-colors min-h-[150px]"
                placeholder="What does this verse mean to you? How does it apply to your life?"
                value={reflection}
                onChange={e => setReflection(e.target.value)}
              />
              
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className={`text-sm ${message.includes('saved') ? 'text-green-500' : 'text-red-500'}`}>
                  {message}
                </span>
                
                <button
                  type="submit"
                  disabled={submitting || !reflection.trim()}
                  className="bg-[var(--primary)] text-[var(--primary-foreground)] px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  {submitting ? 'Saving...' : 'Save to Journal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
