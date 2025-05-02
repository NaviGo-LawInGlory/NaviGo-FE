"use client";

import { useAuth } from "@/context/AuthContext";
import PricingSection from "@/components/landing/PricingSection";
import FeatureSection from "./components/FeatureSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LawSection from "./components/LawSection";
import Navbar from "./components/Navbar/Navbar";

export default function Home() {
  const { user, token } = useAuth();

  return (
    <>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <LawSection />
      <PricingSection />
      <Footer />
    </>
  );
}