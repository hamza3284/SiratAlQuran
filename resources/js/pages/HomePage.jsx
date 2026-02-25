import React, { useState, useEffect } from 'react';
import BaseLayout from '../components/BaseLayout';
import { Link, useNavigate } from 'react-router-dom';
import { getThemes } from '../services/theme';

export default function HomePage() {
  const [themes, setThemes] = useState([
    { name: 'Patience & Hardship', count: 24, slug: 'patience' },
    { name: 'Gratitude', count: 18, slug: 'gratitude' },
    { name: 'Grief & Loss', count: 12, slug: 'grief' },
    { name: 'Decision Making', count: 16, slug: 'decision-making' },
    { name: 'Anxiety & Fear', count: 21, slug: 'anxiety' },
    { name: 'Relationships', count: 14, slug: 'relationships' },
  ]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getThemes()
      .then(res => {
        if (res.data && res.data.length > 0) {
          setThemes(res.data.slice(0, 6)); // Take top 6 themes
        }
      })
      .catch(err => console.error('Failed to fetch themes:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/guidance?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <BaseLayout>
      {/* HERO SECTION */}
      <section className="bg-[var(--background)] pt-12 pb-20 md:pt-20 md:pb-32">
        <div className="container mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="w-full lg:col-span-6 lg:col-start-1">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-semibold text-lg md:text-xl tracking-tight"><small>Welcome to</small></span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[var(--primary)]">
                SiratAlQuran
                <span className="block text-[var(--muted-foreground)] text-2xl md:text-4xl mt-2 font-normal">
                  Quranic Guidance for Life's Struggles
                </span>
              </h1>

              <p className="text-[var(--muted-foreground)] text-base md:text-lg mb-8 md:mb-10 max-w-lg leading-relaxed">
                Find the verses that speak to your situation. Not just reading, but understanding where to start when life gets complex.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/guidance" 
                  className="bg-[var(--primary)] text-[var(--primary-foreground)] px-8 py-3.5 rounded-lg font-medium hover:opacity-90 transition-opacity text-center"
                >
                  Get Guidance
                </Link>
                <Link 
                  to="/ayats" 
                  className="bg-transparent border border-[var(--border)] text-white px-8 py-3.5 rounded-lg font-medium hover:bg-[var(--card)] transition-colors text-center"
                >
                  Explore Verses
                </Link>
              </div>
            </div>

            {/* Right Content - Interactive Mockup */}
            <div className="w-full lg:col-span-5 lg:col-start-8 mt-8 lg:mt-0">
              <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                {/* Search Bar Mockup */}
                <div className="bg-[#1F2937] rounded-xl p-4 mb-6 flex items-center gap-3 border border-gray-700">
                  <iconify-icon icon="lucide:search" class="text-gray-400 text-xl"></iconify-icon>
                  <input
                    type="text"
                    placeholder="I feel lost..."
                    className="bg-transparent text-gray-300 text-base w-full focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                  />
                </div>

                {/* Result Card Mockup */}
                <div className="bg-[#1F2937] rounded-xl p-6 border border-gray-700">
                  <div className="text-gray-500 text-sm mb-3">Surah Al-Baqarah 2:286</div>
                  <p className="text-white text-lg md:text-xl leading-relaxed mb-6 font-medium font-translation">
                    "Allah does not burden a soul beyond that it can bear..."
                  </p>
                  <Link to="/ayats" className="w-full py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                    Reflect <iconify-icon icon="lucide:arrow-right" class="text-base"></iconify-icon>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TEXT SECTION */}
      <section className="py-20 md:py-32 bg-[#020617] border-t border-gray-900 md:-mx-8 lg:-mx-12 xl:-mx-16">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            Most Quran apps help you read.<br/>
            <span className="text-[var(--muted-foreground)]">They don't help you decide where to start.</span>
          </h2>
          <p className="text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-3xl mx-auto">
            When you're anxious, heartbroken, or confused, you don't need chapter 1, verse 1. 
            You need the verse that speaks to your situation right now. SiratAlQuran bridges that gap—connecting your emotions to the guidance already written for you.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-24 bg-[var(--background)]">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 md:mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 bg-[#111827] rounded-2xl border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="mb-6">
                <iconify-icon icon="lucide:message-square" class="text-5xl text-[var(--primary)]"></iconify-icon>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Describe Your Situation</h3>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                Share what you're going through in your own words. No judgement, just guidance.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 bg-[#111827] rounded-2xl border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="mb-6">
                <iconify-icon icon="lucide:book-open" class="text-5xl text-[var(--primary)]"></iconify-icon>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Relevant Quran Verses</h3>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                Get verses curated by humans, mapped to real struggles, not algorithms.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 bg-[#111827] rounded-2xl border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="mb-6">
                <iconify-icon icon="lucide:heart" class="text-5xl text-[var(--primary)]"></iconify-icon>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Reflect & Save</h3>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                Keep your reflections private. Revisit verses whenever you need them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SIRATALQURAN */}
      <section className="py-20 md:py-24 bg-[#020617] md:-mx-8 lg:-mx-12 xl:-mx-16">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 md:mb-16">Why SiratAlQuran</h2>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto px-8">
            {/* Left List */}
            <div className="space-y-6 md:space-y-8 w-full">
              {[
                'Situation-based guidance',
                'Human-curated mappings',
                'No distractions',
                'Private reflections'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-[var(--primary)] flex-shrink-0">
                    <iconify-icon icon="lucide:check" class="text-lg"></iconify-icon>
                  </div>
                  <span className="text-lg md:text-xl text-gray-200">{item}</span>
                </div>
              ))}
            </div>

            {/* Right Theme List */}
            <div className="bg-[#111827] rounded-2xl border border-gray-800 p-6 md:p-8 w-full">
              <h3 className="text-lg font-semibold text-gray-300 mb-6">Browse by Theme</h3>
              <div className="space-y-5">
                {themes.map((theme, i) => (
                  <div 
                    key={i} 
                    onClick={() => theme.slug && navigate(`/ayats?theme=${theme.slug}`)}
                    className="flex justify-between items-center text-gray-400 hover:text-[var(--primary)] transition-colors cursor-pointer group"
                  >
                    <span className="text-base md:text-lg group-hover:translate-x-1 transition-transform capitalize">{theme.name}</span>
                    <span className="text-sm opacity-60">
                      {theme.ayats_count !== undefined ? theme.ayats_count : theme.count} verses
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FIND GUIDANCE SCROLL */}
      <section className="py-20 md:py-32 bg-[var(--background)] overflow-hidden">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Guidance for Any Situation</h2>
          <p className="text-[var(--muted-foreground)] text-base md:text-lg">Explore themes that resonate with you</p>
        </div>

        {/* Scrolling Container */}
        <div className="relative w-full">
          <div className="flex gap-4 animate-scroll whitespace-nowrap overflow-x-auto pb-4 custom-scrollbar justify-start">
            {themes.concat(themes).map((theme, i) => (
              <Link 
                key={i}
                to={`/ayats?theme=${theme.slug}`}
                className={`px-6 py-2 md:px-8 md:py-3 rounded-full border text-base md:text-lg font-medium transition-all flex-shrink-0
                  ${i === 0 ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]' : 'bg-transparent border-gray-700 text-gray-300 hover:border-gray-500'}
                `}
              >
                <span className="capitalize">{theme.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ARABIC CALLIGRAPHY FOOTER */}
      <section className="py-16 md:py-20 bg-[#020617] border-t border-gray-900 text-center overflow-hidden md:-mx-8 lg:-mx-12 xl:-mx-16">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-7xl lg:text-8xl font-arabic text-gray-700 opacity-30 select-none leading-relaxed break-words">
            إلزم صراط القرآن هو طريق النجاح
          </h1>
        </div>
      </section>

    </BaseLayout>
  );
}
