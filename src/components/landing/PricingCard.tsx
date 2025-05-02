'use client'

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: number;
  features: string[];
  onGetStarted: () => void;
}

export default function PricingCard({ title, price, features, onGetStarted }: PricingCardProps) {
  return (
    <div className="relative flex flex-col p-6 bg-white rounded-3xl border-2 border-purple-500 shadow-lg">
      <h3 className="text-4xl font-bold bg-gradient-to-r from-[#A31ABE] to-[#E250CE] text-transparent bg-clip-text mb-4">{title}</h3>
      <div className="flex flex-col mb-6">
        <div className="flex items-baseline">
          <span className="text-lg font-medium text-gray-600">Rp</span>
          <span className="text-5xl font-bold text-gray-900">{price}</span>
          <span className="text-lg font-medium text-gray-600">/month</span>
        </div>
      </div>
      
      <button
        onClick={onGetStarted}
        className="flex items-center justify-around gap-2 w-full py-3 px-4 bg-gradient-to-r from-[#A31ABE] to-[#E250CE] text-white rounded-2xl hover:opacity-90 transition-opacity mb-6"
      >
        Get Started
        <ArrowRight className="w-8 h-6" />
      </button>

      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <div className="w-full h-4 bg-gray-200 rounded-2xl"></div>
          </li>
        ))}
      </ul>
    </div>
  );
} 