"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PricingCard from "./PricingCard";
import { FaCheck } from "react-icons/fa";

const pricingPlans = [
  {
    title: "Basic",
    price: 0,
    isPopular: false,
    features: [
      { text: "Limited document generation (3/month)", available: true },
      { text: "Basic document analysis", available: true },
      { text: "Access to AI Chatbot (10 queries/day)", available: true },
      { text: "Search lawyer directory", available: true },
      { text: "Basic legal templates", available: true },
      { text: "Email support", available: true },
      { text: "Priority support", available: false },
      { text: "Advanced legal templates", available: false },
      { text: "Unlimited documents", available: false },
      { text: "Personal legal assistant", available: false },
    ],
  },
  {
    title: "Premium",
    price: 16500,
    isPopular: true,
    features: [
      { text: "Extended document generation (20/month)", available: true },
      { text: "Advanced document analysis", available: true },
      { text: "Access to AI Chatbot (100 queries/day)", available: true },
      { text: "Search lawyer directory", available: true },
      { text: "Advanced legal templates", available: true },
      { text: "Email & chat support", available: true },
      { text: "Priority support", available: true },
      { text: "Legal document review", available: true },
      { text: "Unlimited documents", available: false },
      { text: "Personal legal assistant", available: false },
    ],
  },
  {
    title: "Enterprise",
    price: 82500,
    isPopular: false,
    features: [
      { text: "Unlimited document generation", available: true },
      { text: "Premium document analysis", available: true },
      { text: "Unlimited AI Chatbot queries", available: true },
      { text: "Premium lawyer directory access", available: true },
      { text: "All legal templates", available: true },
      { text: "Priority 24/7 support", available: true },
      { text: "Dedicated account manager", available: true },
      { text: "Custom legal templates", available: true },
      { text: "API access", available: true },
      { text: "Personal legal assistant", available: true },
    ],
  },
];

export default function PricingSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section ref={sectionRef} className="bg-[#FCF2FF] py-10 sm:py-12 md:py-16 px-4" id="pricing">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-8 sm:mb-12" initial={{ opacity: 0, y: -20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
          <h2 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-[#A31ABE] to-[#E250CE] inline-block text-transparent bg-clip-text">Pricing</h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Select Plan that Fits your Needs!</h3>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {pricingPlans.map((plan, index) => (
            <motion.div key={index} className="mb-6 md:mb-0" variants={itemVariants} custom={index}>
              <PricingCard title={plan.title} price={plan.price} features={plan.features} isPopular={plan.isPopular} onGetStarted={() => console.log(`Get started with ${plan.title}`)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
