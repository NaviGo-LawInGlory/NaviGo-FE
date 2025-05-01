import PricingSection from "@/components/landing/PricingSection";
import FeatureSection from "./components/FeatureSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LawSection from "./components/LawSection";

export default function Home() {
  return (
    <>
    <HeroSection />
    <FeatureSection />
    <LawSection />
    <PricingSection />
    <Footer />
    </>
  );
}