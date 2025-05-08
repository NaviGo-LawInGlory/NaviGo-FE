"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Feature {
  text: string;
  available: boolean;
}

interface PricingCardProps {
  title: string;
  price: number;
  features: Feature[];
  isPopular?: boolean;
  onGetStarted: () => void;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("id-ID").format(price);
};

export default function PricingCard({ title, price, features, isPopular = false, onGetStarted }: PricingCardProps) {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push(`/payment?plan=${encodeURIComponent(title)}&price=${price}`);
    onGetStarted();
  };

  return (
    <motion.div
      className={`relative flex flex-col p-4 sm:p-6 bg-white rounded-3xl shadow-lg h-full ${isPopular ? "border-2 border-purple-500 z-10" : "border border-gray-200"}`}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }}
    >
      {isPopular && (
        <motion.div className="absolute -top-4 inset-x-0 flex justify-center" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
          <span className="px-4 py-1 text-xs font-semibold tracking-wide text-white rounded-full bg-gradient-to-r from-[#A31ABE] to-[#E250CE] shadow-md">MOST POPULAR</span>
        </motion.div>
      )}

      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#A31ABE] to-[#E250CE] text-transparent bg-clip-text mb-3 sm:mb-4">{title}</h3>

      <div className="flex flex-col mb-4 sm:mb-6">
        <div className="flex items-baseline">
          <span className="text-base sm:text-lg font-medium text-gray-600">Rp</span>
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{formatPrice(price)}</span>
          {price > 0 && <span className="text-base sm:text-lg font-medium text-gray-600">/month</span>}
        </div>
        {price === 0 && <span className="text-sm text-gray-500">Free forever</span>}
      </div>

      <motion.button
        onClick={handleGetStarted}
        className={`flex items-center justify-around gap-2 w-full py-2 sm:py-3 px-3 sm:px-4 text-white rounded-2xl hover:opacity-90 transition-opacity mb-4 sm:mb-6 ${
          isPopular ? "bg-gradient-to-r from-[#A31ABE] to-[#E250CE]" : "bg-gray-700 hover:bg-gray-800"
        }`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        Get Started
        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>

      <div className="space-y-3 sm:space-y-4 flex-grow">
        <h4 className="font-medium text-gray-800">Features include:</h4>

        {features.map((feature, index) => (
          <motion.div key={index} className="flex items-start gap-3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * index, duration: 0.3 }}>
            <div className={`flex-shrink-0 mt-0.5 ${feature.available ? "text-purple-600" : "text-gray-400"}`}>{feature.available ? <FaCheck className="h-4 w-4" /> : <FaTimes className="h-4 w-4" />}</div>
            <span className={feature.available ? "text-gray-700" : "text-gray-400"}>{feature.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
