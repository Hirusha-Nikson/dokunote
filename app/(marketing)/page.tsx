"use client";

import Header from "./_components/header";
import CompanyMarque from "./_screens/company-marque";
import HeroSection from "./_screens/hero-section";
import SolutionsBento from "./_screens/solutions-bento";

const MarketingPage = () => {



  return (
    <div className="flex flex-col min-h-screen w-full will-change-transform">
      <Header />
      <HeroSection />
      <CompanyMarque />
      <SolutionsBento />
    </div>
  );
};

export default MarketingPage;