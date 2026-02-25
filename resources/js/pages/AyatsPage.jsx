import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from '../components/BaseLayout';
import ThemeSidebar from '../components/ThemeSidebar';
import { getThemes, getThemeAyats, getExternalThemeAyats } from '../services/theme';

export default function AyatsPage() {
  const [themes, setThemes] = useState([]);
  const [activeTheme, setActiveTheme] = useState(null);
  const [ayats, setAyats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [externalLoading, setExternalLoading] = useState(false);
  const [externalPage, setExternalPage] = useState(1);
  const [hasMoreExternal, setHasMoreExternal] = useState(true);

  // Fetch themes on mount
  useEffect(() => {
    getThemes()
      .then(res => {
        setThemes(res.data);
        const params = new URLSearchParams(window.location.search);
        const urlTheme = params.get('theme');
        
        if (urlTheme && res.data.some(t => t.slug === urlTheme)) {
          setActiveTheme(urlTheme);
        } else if (res.data.length > 0) {
          setActiveTheme(res.data[0].slug);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Fetch ayats when activeTheme changes
  useEffect(() => {
    if (!activeTheme) return;

    // Reset external pagination
    setExternalPage(1);
    setHasMoreExternal(true);

    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('theme', activeTheme);
    window.history.pushState({}, '', url);

    setLoading(true);
    getThemeAyats(activeTheme)
      .then(async (res) => {
        const localAyats = res.data.ayats || [];
        setAyats(localAyats);

        // If no local ayats, fetch external automatically
        if (localAyats.length === 0) {
          await fetchExternalAyats(activeTheme, 1);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [activeTheme]);

  const fetchExternalAyats = async (slug, page) => {
    setExternalLoading(true);
    try {
      const res = await getExternalThemeAyats(slug, page);
      const newAyats = res.data.ayats || [];
      
      if (page === 1) {
        setAyats(newAyats);
      } else {
        setAyats(prev => [...prev, ...newAyats]);
      }

      setHasMoreExternal(page < res.data.total_pages);
      setExternalPage(page);
    } catch (err) {
      console.error('Failed to fetch external ayats:', err);
    } finally {
      setExternalLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchExternalAyats(activeTheme, externalPage + 1);
  };

  return (
    <BaseLayout>
      <section className="container mx-auto py-12" id="ayats">
        <h2 className="text-4xl font-bold mb-10 text-center lg:text-left">Explore Quranic Ayats</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            {themes.length > 0 ? (
              <ThemeSidebar 
                themes={themes} 
                active={activeTheme} 
                onSelect={setActiveTheme} 
              />
            ) : (
              <div className="text-[var(--muted-foreground)]">Loading themes...</div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="grid gap-6">
              {ayats.length > 0 ? (
                ayats.map(ayat => (
                  <div key={ayat.id} className="p-6 border border-[var(--border)] rounded-lg bg-[var(--card)] hover:border-[var(--primary)] transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-[var(--primary)] text-[var(--primary-foreground)] text-xs px-2 py-1 rounded">
                        {ayat.surah}:{ayat.ayat}
                      </span>
                      <Link 
                        to={`/ayats/${ayat.id}`}
                        className="text-[var(--muted-foreground)] hover:text-[var(--primary)] text-sm font-medium flex items-center gap-1 transition-colors"
                      >
                        <iconify-icon icon="lucide:pen-tool" width="14"></iconify-icon> Reflect
                      </Link>
                    </div>
                    
                    <p className="text-3xl text-right font-quran mb-6 leading-[2.5]" dir="rtl">
                      {ayat.text_ar}
                    </p>
                    
                    <p className="text-[var(--foreground)] text-xl leading-relaxed font-translation">
                      {ayat.text_en}
                    </p>
                    
                    {ayat.pivot?.explanation && (
                      <p className="mt-4 text-[var(--muted-foreground)] text-sm italic border-t border-[var(--border)] pt-4">
                        {ayat.pivot.explanation}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-[var(--card)] border border-[var(--border)] rounded-lg">
                  <p className="text-[var(--muted-foreground)]">Select a theme to view ayats.</p>
                </div>
              )}

              {/* Load More Button */}
              {activeTheme && (
                <div className="flex justify-center mt-6">
                  {hasMoreExternal ? (
                    <button
                      onClick={handleLoadMore}
                      disabled={externalLoading}
                      className="px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                    >
                      {externalLoading ? (
                        <>
                          <iconify-icon icon="lucide:loader-2" class="animate-spin"></iconify-icon>
                          Loading...
                        </>
                      ) : (
                        <>
                          <iconify-icon icon="lucide:plus-circle"></iconify-icon>
                          Load More Verses
                        </>
                      )}
                    </button>
                  ) : (
                    <p className="text-[var(--muted-foreground)] text-sm">No more verses to load.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}