"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, BookOpen, FileText, Scale } from "lucide-react";

const legalCategories = [
  { icon: <BookOpen className="w-6 h-6" />, title: "Civil Law", count: 268 },
  { icon: <FileText className="w-6 h-6" />, title: "Criminal Law", count: 152 },
  { icon: <Scale className="w-6 h-6" />, title: "Commercial Law", count: 325 },
  { icon: <BookOpen className="w-6 h-6" />, title: "Constitutional Law", count: 94 },
];

const LawSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-white" id="law">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
          <motion.div className="w-full md:w-1/2 flex flex-col items-start" initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }} transition={{ duration: 0.7 }}>
            <h2 className="text-[#61008D] font-bold text-xl sm:text-2xl mb-3">Indonesian Law</h2>
            <h3 className="text-[#3D3F40] font-bold text-2xl sm:text-3xl md:text-4xl mb-6">Comprehensive Reference to Indonesian Legal System</h3>
            <p className="text-[#707375] mb-8 lg:pr-12">
              Explore comprehensive resources on Indonesian legal frameworks, statutes, and regulations. Our platform offers reliable references to help you navigate the complexities of Indonesian law with confidence and clarity, all
              available at your fingertips.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              {legalCategories.map((category, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="text-purple-700">{category.icon}</div>
                  <div>
                    <p className="font-medium text-gray-800">{category.title}</p>
                    <p className="text-sm text-gray-500">{category.count} documents</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div className="relative w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.5, delay: 0.8 }}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search legal documents"
                  className="w-full h-12 pl-12 pr-4 text-black bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#61008D] to-[#A31ABE] text-white rounded-full px-4 py-1.5 text-sm font-medium">Search</button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="w-full md:w-1/2 mt-10 md:mt-0" initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }} transition={{ duration: 0.7 }}>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-purple-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-100 rounded-full opacity-50"></div>

              <img src="justice.png" alt="Indonesian Law Reference" className="w-auto h-120 rounded-2xl shadow-xl relative z-10" />

              <div className="absolute top-6 right-6 bg-white py-2 px-4 rounded-full shadow-lg z-20">
                <p className="text-sm font-bold text-purple-700">3,000+ Legal Documents</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LawSection;
