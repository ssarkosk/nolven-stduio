/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { InteractiveWorkspace } from './components/InteractiveWorkspace';
import { HowItWorks } from './components/HowItWorks';
import { ProductCapabilities } from './components/ProductCapabilities';
import { UseCases } from './components/UseCases';
import { VisionSection } from './components/VisionSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToWorkspace = () => {
    const el = document.getElementById('interactive-workspace');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-[#E4E6EB] flex flex-col font-sans selection:bg-violet-600/40 selection:text-white">
      {/* Top sticky navigation */}
      <Navigation onOpenDemo={scrollToWorkspace} />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero 
          onExploreDemo={scrollToWorkspace} 
          onExploreHowItWorks={scrollToHowItWorks} 
        />

        {/* 2. Interactive Product Workspace Prototype */}
        <InteractiveWorkspace />

        {/* 3. How It Works Pipeline */}
        <HowItWorks />

        {/* 4. Product Capabilities */}
        <ProductCapabilities />

        {/* 5. Use Cases */}
        <UseCases onSelectCase={scrollToWorkspace} />

        {/* 6. Vision & Ethical Voice Consent Charter */}
        <VisionSection />

        {/* 7. Comprehensive FAQ */}
        <FAQSection />
      </main>

      {/* 8. Final CTA & Footer */}
      <Footer onExploreConcept={scrollToWorkspace} />
    </div>
  );
}
