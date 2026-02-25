import React from 'react';
import BaseLayout from '../components/BaseLayout';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <BaseLayout>
      <section className="bg-transparent" id="landing">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-28">
          <div className="grid grid-cols-12 gap-x-10 items-center min-h-[70vh]">

            {/* Left: Text */}
            <div className="col-span-12 lg:col-span-5">
              <h1 className="text-5xl font-bold mb-4">Welcome to SiratAlQuran</h1>
              <p className="text-lg text-[var(--muted-foreground)] mb-6text-[var(--muted-foreground)] mb-8 max-w-xl">
                Discover Quranic verses that guide your daily life and personal reflection.
              </p>
              <div className="flex gap-4">
                <Link to="/guidance" className="bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-3 rounded hover:opacity-90 transition-opacity">Get Guidance</Link>
                <Link to="/ayats" className="border border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors">Explore Ayats</Link>
              </div>
            </div>

            {/* Right: App Mockup */}
            {/* <div className="flex justify-center">
              <div className="w-80 h-[480px] bg-[var(--input)] rounded-3xl overflow-hidden border border-[var(--border)]">
                <img src="https://storage.googleapis.com/banani-generated-images/generated-images/04cb0086-33e5-4597-bdc6-5aa8206a2b32.jpg" alt="Landing" className="w-full h-full object-cover"/>
              </div>
            </div> */}

            
            {/* Right Content - Interactive Mockup */}
            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Search Bar Mockup */}
                <div className="bg-[#1F2937] rounded-xl p-4 mb-6 flex items-center gap-3 border border-gray-700">
                  <iconify-icon icon="lucide:search" class="text-gray-400 text-xl"></iconify-icon>
                  <input
                    type="text"
                    placeholder="I feel lost"
                    className="bg-transparent text-gray-300 text-base w-full focus:outline-none"
                  />
                </div>

                {/* Result Card Mockup */}
                <div className="bg-[#1F2937] rounded-xl p-6 border border-gray-700">
                  <div className="text-gray-500 text-sm mb-3">Surah Al-Baqarah 2:286</div>
                  <p className="text-white text-xl leading-relaxed mb-6 font-medium font-translation">
                    "Allah does not burden a soul beyond that it can bear..."
                  </p>
                  <button className="w-full py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                    Reflect <iconify-icon icon="lucide:arrow-right" class="text-base"></iconify-icon>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </BaseLayout>
  );
}