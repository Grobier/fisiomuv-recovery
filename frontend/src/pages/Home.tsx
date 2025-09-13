import React from 'react';
import { Hero } from '../components/Hero';
import { Benefits } from '../components/Benefits';
import { ScientificBenefits } from '../components/ScientificBenefits';
import { Pricing } from '../components/Pricing';
import { PreSaleForm } from '../components/PreSaleForm';
import { Faq } from '../components/Faq';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { contactConfig } from '../config/contact';
import { analytics } from '../lib/analytics';

export const Home: React.FC = () => {
  const [selectedService, setSelectedService] = React.useState<string | undefined>(undefined);

  const handleCtaClick = (serviceId?: string) => {
    if (serviceId) {
      setSelectedService(serviceId);
    }
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
        <Hero onCtaClick={() => handleCtaClick()} />
        <Benefits onCtaClick={() => handleCtaClick()} />
        <ScientificBenefits />
        <Pricing onServiceSelect={handleCtaClick} />
        <PreSaleForm preselectedService={selectedService} />
        <Faq />
      </main>
      
      <Footer />
      
      {/* WhatsApp Float Button */}
      <WhatsAppButton 
        phoneNumber={contactConfig.whatsapp.number}
        message={contactConfig.whatsapp.message}
        businessName={contactConfig.whatsapp.businessName}
      />
    </div>
  );
};

