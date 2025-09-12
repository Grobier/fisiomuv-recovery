import React from 'react';
import { Hero } from '../components/Hero';
import { Benefits } from '../components/Benefits';
import { ScientificBenefits } from '../components/ScientificBenefits';
import { Pricing } from '../components/Pricing';
import { PreSaleForm } from '../components/PreSaleForm';
import { Faq } from '../components/Faq';
import { Footer } from '../components/Footer';
import { analytics } from '../lib/analytics';

export const Home: React.FC = () => {
  const handleCtaClick = () => {
    document.getElementById('preventa-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Track page view on mount
  React.useEffect(() => {
    analytics.trackPageView('home');
  }, []);

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main>
        <Hero onCtaClick={handleCtaClick} />
        <Benefits />
        <ScientificBenefits />
        <Pricing />
        <PreSaleForm />
        <Faq />
      </main>
      
      <Footer />
    </div>
  );
};

