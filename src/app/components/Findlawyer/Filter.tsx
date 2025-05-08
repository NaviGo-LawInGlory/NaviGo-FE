import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { LawyerSearchParams } from "@/types/models/lawyer";

interface FilterProps {
  onFilter: (filters: Partial<LawyerSearchParams>) => void;
}

const specializations = ["Haki", "Pidana", "Pajak", "Bisnis"];

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState<number>(0);

  const toggleSpec = (spec: string) => {
    setSelectedSpecs((prev) => (prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]));
  };

  const handleApplyFilter = () => {
    const filters: Partial<LawyerSearchParams> = {};

    if (selectedSpecs.length > 0) {
      filters.specialization = selectedSpecs;
    }

    if (location) {
      filters.location = location;
    }

    if (rating > 0) {
      filters.rating = rating;
    }

    onFilter(filters);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full">
      <h2 className="text-xl font-bold text-purple-700 mb-5">Filter</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700">Specialization</h3>
        {specializations.map((spec) => (
          <label key={spec} className="flex items-center gap-3 mb-2 cursor-pointer">
            <input type="checkbox" checked={selectedSpecs.includes(spec)} onChange={() => toggleSpec(spec)} className="rounded text-purple-600 focus:ring-purple-500" />
            <span className="text-gray-700">{spec}</span>
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700">Price Range</h3>
        <label className="text-sm text-gray-500 mb-1 block">Minimum</label>
        <input
          type="text"
          placeholder="Rp."
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full mb-3 border-0 bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition duration-200"
        />
        <label className="text-sm text-gray-500 mb-1 block">Maximum</label>
        <input
          type="text"
          placeholder="Rp."
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full mb-3 border-0 bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition duration-200"
        />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700">Location</h3>
        <input
          type="text"
          placeholder="Search Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border-0 bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition duration-200"
        />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700">Rating</h3>
        <div className="flex gap-2 flex-wrap justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(rating === star ? 0 : star)}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl ${rating === star ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              {Array.from({ length: star }, (_, i) => (
                <FaStar key={i} className="text-sm" />
              ))}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleApplyFilter} className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 px-4 rounded-xl mt-4 hover:shadow-md transition-all duration-200">
        Apply Filter
      </button>
    </div>
  );
};

export default Filter;

