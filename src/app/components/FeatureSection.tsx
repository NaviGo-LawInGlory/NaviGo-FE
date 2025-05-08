"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

type FeatureCardProps = {
  src: string;
  title: string;
  subtitle: string;
};

const FeatureCard = ({ src, title, subtitle }: FeatureCardProps) => {
  return (
    <div className="outline outline-1 outline-[#E250CE] bg-[#FCF2FF] rounded-xl px-6 py-8 mx-1 w-64">
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-row items-center">
          <img src={`/FeatureSection/${src}`} alt={title} className="w-12 h-12 mr-3" />
          <h3 className="text-[#61008D] font-bold">{title}</h3>
        </div>
        <p className="text-black text-sm font-medium">{subtitle}</p>
      </div>
    </div>
  );
};

const features = [
  {
    src: "document.png",
    title: "Legal Document Generator",
    subtitle: "Genarate legal document easily for you",
  },
  {
    src: "search.png",
    title: "MOU Document Analyzer",
    subtitle: "Analyze MOU documents with clarity and precision",
  },
  {
    src: "AI.png",
    title: "AI Law Chatbot",
    subtitle: "Ask legal questions and get AI-powered answers instantly",
  },
  {
    src: "lawyer.png",
    title: "Find Lawyer",
    subtitle: "Connect with certified lawyers tailored to your needs",
  },
];

const FeatureSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section ref={sectionRef} className="bg-[#FCF2FF] pt-12 sm:pt-16 md:pt-20 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8" id="features">
      <motion.h1 className="text-[#61008D] font-bold text-xl sm:text-2xl text-center" initial={{ opacity: 0, y: -20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
        Our Feature
      </motion.h1>

      <motion.h1
        className="text-[#3D3F40] font-bold text-center text-2xl sm:text-3xl md:text-4xl mt-3 sm:mt-5"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Empowering Your Legal Needs, <br className="hidden sm:inline" />
        Faster Than Ever
      </motion.h1>

      <motion.div className="flex flex-row flex-wrap justify-center gap-4 px-4 sm:px-8 py-8 sm:py-12 md:py-16" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        {features.map((feature, index) => (
          <motion.div key={index} variants={itemVariants}>
            <FeatureCard src={feature.src} title={feature.title} subtitle={feature.subtitle} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeatureSection;
