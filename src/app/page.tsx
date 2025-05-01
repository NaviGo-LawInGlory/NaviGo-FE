import FeatureSection from "./components/FeatureSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LawSection from "./components/LawSection";
import Navbar from "./components/Navbar/Navbar";


export default function Home() {
  return (
    <>
    <Navbar />
    <HeroSection />
    <FeatureSection />
    <LawSection />
    <Footer />
    </>
  );
}