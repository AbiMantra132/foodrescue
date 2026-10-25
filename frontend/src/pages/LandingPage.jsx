import React from 'react';
import { Hero } from '../features/landing/components/Hero.jsx';
import { ForPengelola } from '../features/landing/components/ForPengelola.jsx';
import { ForProviders } from '../features/landing/components/ForProviders.jsx';
import { Insights } from '../features/landing/components/Insights.jsx';
import { Stats } from '../features/landing/components/Stats.jsx';

export function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <ForPengelola />
      <ForProviders />
      <Insights />
      <Stats />
    </main>
  );
}

export default LandingPage;
