import React from 'react';
import { Hero } from '../features/landing/components/Hero';
import { Katalog } from '../features/landing/components/Katalog';
import { CaraKerja } from '../features/landing/components/CaraKerja';
import { KomitmenHigienitas } from '../features/landing/components/KomitmenHigienitas';

export function LandingPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFA]">
      <Hero />
      <Katalog />
      <CaraKerja />
      <KomitmenHigienitas />
    </main>
  );
}

export default LandingPage;
