"use client";

import CompanyMarque from "./_screens/company-marque";
import HeroSection from "./_screens/hero-section";

import SolutionsBentoGrid from "./_screens/solutions-bento";
import DemoScreen from "./_screens/demo-screen";
import Testimonial from "./_screens/testimonial";
import CallToActionScreen from "./_screens/cta-screen";
import AboutDeveloper from "./_screens/about-developer";
// import HowItWorks from "./_screens/how-it-works";
import Features from "./_screens/features";
import { useEffect } from "react";
import Lenis from "lenis";
import { FadeUp } from "@/components/fade-up";
import DetailsScreen  from "./_screens/details-screen";
import { useIsMobile } from "@/hooks/use-mobile";
import FeaturesMobile from "./_screens/features-mobile";


// import { TextReveal } from "@/components/magicui/text-reveal";
// import ScrollWordReveal from "./_screens/text-reveal";



const MarketingPage = () => {

  const isMobile = useIsMobile();

  useEffect(() => {
    const lenis = new Lenis();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function raf(time: any){
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div>

      <HeroSection />
      <CompanyMarque />

      {isMobile ? (
        <FadeUp duration={0.5} delay={0.6}>
        <FeaturesMobile />
        </FadeUp>
      ): (
        <FadeUp duration={0.5} delay={0.6}>
        <Features />
        </FadeUp>
      )}

      <FadeUp duration={0.5} delay={0.6}>
        <DetailsScreen />
      </FadeUp>

      <FadeUp duration={0.5} delay={0.6}>
      <DemoScreen />
      </FadeUp>
      <SolutionsBentoGrid />

      <FadeUp duration={0.5} delay={0.6}>
      <Testimonial/>
      </FadeUp>

      <CallToActionScreen />
      <AboutDeveloper />
    </div>
  );
};

export default MarketingPage;
