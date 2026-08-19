import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { HeroSection } from '../components/sections/HeroSection';
import { TrustStats } from '../components/sections/TrustStats';
import { ServicesGrid } from '../components/sections/ServicesGrid';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { CurriculumBadges } from '../components/sections/CurriculumBadges';
import { ReviewCarousel } from '../components/sections/ReviewCarousel';
import { BottomFeatureBar } from '../components/sections/BottomFeatureBar';

export const HomePage: React.FC = () => {
  return (
    <PageLayout>
      <HeroSection />
      <TrustStats />
      <ServicesGrid />
      <WhyChooseUs />
      <CurriculumBadges />
      <ReviewCarousel />
      <BottomFeatureBar />
    </PageLayout>
  );
};
