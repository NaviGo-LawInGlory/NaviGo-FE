"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative h-screen w-full bg-white" id="hero">

      <div className="object-cover p-4 sm:p-8 md:p-12 rounded-2xl inset-0 absolute">
        <img src="HeroSection/hero.svg" alt="Hero" className="object-cover w-full h-full rounded-4xl" />
      </div>


      <div className="relative z-10 flex flex-col items-center justify-center h-full container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center max-w-4xl mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-white">Integrated Legal Advice Solution for You</h1>


          <motion.p className="text-white/90 text-lg sm:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            Navigate complex legal matters with ease using our AI-powered platform designed to make law accessible for everyone.
          </motion.p>


          <motion.div className="flex flex-wrap justify-center gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <Link href="/dashboard/me">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-black/30 hover:bg-black/60 outline-1 outline-[#E250CE] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-duration-300 flex items-center gap-2">
                <span>Try Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </motion.div>


        <motion.div className="absolute top-1/4 right-10 hidden lg:block" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 0.8, x: 0 }} transition={{ duration: 1, delay: 0.8 }}>
          <img
            src="/HeroSection/document-icon.svg"
            alt="Document"
            className="w-16 h-16 opacity-80"
            onError={(e) => {
              e.currentTarget.src = "/HeroSection/file-icon.svg";
              e.currentTarget.onerror = null;
            }}
          />
        </motion.div>

        <motion.div className="absolute bottom-1/4 left-10 hidden lg:block" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 0.8, x: 0 }} transition={{ duration: 1, delay: 0.9 }}>
          <img
            src="/HeroSection/chat-icon.svg"
            alt="Chat"
            className="w-16 h-16 opacity-80"
            onError={(e) => {
              e.currentTarget.src = "/HeroSection/message-icon.svg";
              e.currentTarget.onerror = null;
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

