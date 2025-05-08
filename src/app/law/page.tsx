"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import { Search, Filter, FileText, ArrowRight, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingIndicators";

const legalCategories = [
  { id: "civil", name: "Civil Law", count: 268 },
  { id: "criminal", name: "Criminal Law", count: 152 },
  { id: "commercial", name: "Commercial Law", count: 325 },
  { id: "constitutional", name: "Constitutional Law", count: 94 },
  { id: "employment", name: "Employment Law", count: 183 },
  { id: "tax", name: "Tax Law", count: 127 },
  { id: "intellectual", name: "Intellectual Property", count: 86 },
  { id: "international", name: "International Law", count: 72 },
];

const mockDocuments = Array(20)
  .fill(null)
  .map((_, i) => ({
    id: `doc-${i + 1}`,
    title: `Legal Document ${i + 1}${i % 3 === 0 ? ": Extended Version with Longer Title for Testing UI" : ""}`,
    category: legalCategories[i % legalCategories.length].id,
    categoryName: legalCategories[i % legalCategories.length].name,
    date: `${2020 + Math.floor(i / 5)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    summary: `This document covers important legal aspects related to ${legalCategories[i % legalCategories.length].name.toLowerCase()}. It provides guidance on regulatory compliance and legal frameworks.`,
    downloadCount: Math.floor(Math.random() * 1000),
  }));

const LawSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [documents, setDocuments] = useState(mockDocuments);
  const [filteredDocuments, setFilteredDocuments] = useState(mockDocuments);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const documentsPerPage = 6;

  useEffect(() => {
    setLoading(true);

    const timeoutId = setTimeout(() => {
      let results = [...documents];

      if (searchQuery) {
        results = results.filter((doc) => doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || doc.summary.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      if (selectedCategories.length > 0) {
        results = results.filter((doc) => selectedCategories.includes(doc.category));
      }

      setFilteredDocuments(results);
      setCurrentPage(1);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategories, documents]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) => (prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]));
  };

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);
  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />


      <section className="w-full bg-[#FCF2FF] py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1 className="text-3xl md:text-4xl font-bold text-black mb-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Search Legal Documents
          </motion.h1>
          <motion.p className="text-black text-lg mb-8 max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            Access comprehensive resources on Indonesian legal frameworks, statutes, and regulations to navigate with confidence.
          </motion.p>

          <motion.form onSubmit={handleSearch} className="relative max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <input
              type="text"
              placeholder="Search for legal documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-14 pr-20 bg-white rounded-full border-none shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-purple-700" size={20} />
            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#61008D] to-[#A31ABE] text-white rounded-full px-6 py-2.5 font-medium hover:shadow-lg transition-all duration-200">
              Search
            </button>
          </motion.form>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-6">

          <div className="md:hidden mb-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium" onClick={() => setShowFilters(!showFilters)}>
              <Filter size={18} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>


          <motion.aside className={`w-full md:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden md:block"}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="font-bold text-lg text-gray-800 mb-4">Filter by Category</h2>

              <div className="space-y-2">
                {legalCategories.map((category) => (
                  <label key={category.id} className="flex items-center gap-3 cursor-pointer py-1.5">
                    <input type="checkbox" checked={selectedCategories.includes(category.id)} onChange={() => toggleCategory(category.id)} className="rounded text-purple-600 focus:ring-purple-500" />
                    <span className="text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-500 ml-auto">({category.count})</span>
                  </label>
                ))}
              </div>

              {selectedCategories.length > 0 && (
                <button onClick={() => setSelectedCategories([])} className="mt-4 text-sm text-purple-600 hover:text-purple-800 font-medium">
                  Clear filters
                </button>
              )}
            </div>
          </motion.aside>


          <motion.div className="flex-grow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">{loading ? "Searching..." : `${filteredDocuments.length} results found`}</h2>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500">
                  <option>Relevance</option>
                  <option>Date (Newest)</option>
                  <option>Date (Oldest)</option>
                  <option>Most Downloaded</option>
                </select>
              </div>
            </div>


            {loading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : currentDocuments.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="text-purple-400 mb-4">
                  <FileText size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No documents found</h3>
                <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {currentDocuments.map((doc) => (
                  <motion.div
                    key={doc.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-gray-800 pr-4">{doc.title}</h3>
                        <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">{doc.categoryName}</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4">{doc.summary}</p>

                      <div className="flex flex-wrap justify-between items-center">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>Published: {doc.date}</span>
                          <span>•</span>
                          <span>{doc.downloadCount} downloads</span>
                        </div>

                        <div className="flex gap-2 mt-3 md:mt-0">
                          <button className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center gap-1.5">
                            Preview <ArrowRight size={14} />
                          </button>
                          <button className="bg-gradient-to-r from-[#61008D] to-[#A31ABE] text-white text-sm font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <Download size={14} />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}


            {!loading && filteredDocuments.length > documentsPerPage && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-1">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md text-gray-600 hover:bg-purple-50 hover:text-purple-700 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-600"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => {
                    if (number === 1 || number === totalPages || (number >= currentPage - 1 && number <= currentPage + 1)) {
                      return (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`w-8 h-8 flex items-center justify-center rounded-md ${currentPage === number ? "bg-gradient-to-r from-[#61008D] to-[#A31ABE] text-white" : "text-gray-700 hover:bg-purple-50"}`}
                        >
                          {number}
                        </button>
                      );
                    }

                    if ((number === currentPage - 2 && currentPage > 3) || (number === currentPage + 2 && currentPage < totalPages - 2)) {
                      return (
                        <span key={number} className="px-1">
                          ...
                        </span>
                      );
                    }

                    return null;
                  })}

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md text-gray-600 hover:bg-purple-50 hover:text-purple-700 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-600"
                  >
                    <ChevronRight size={20} />
                  </button>
                </nav>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LawSearchPage;

