'use client';

import React from 'react';
import PricingCard from './PricingCard';

const pricingPlans = [
  {
    title: 'Gratis',
    price: 0,
    features: Array(10).fill(''), 
  },
  {
    title: 'Gratis',
    price: 0,
    features: Array(10).fill(''), 
  },
  {
    title: 'Gratis',
    price: 0,
    features: Array(10).fill(''), 
  },
];

export default function PricingSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#A31ABE] to-[#E250CE] inline-block text-transparent bg-clip-text">Pricing</h2>
          <h3 className="text-4xl font-bold text-gray-900">Select Plan that Fits your Needs!</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              onGetStarted={() => console.log(`Get started with ${plan.title}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
