import { useState } from "react";
import { FaStar } from "react-icons/fa";

const specializations = ["Haki", "Pidana", "Pajak", "Bisnis"];

const Filter: React.FC = () => {
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [minPrize, setMinPrize] = useState("");
  const [maxPrize, setMaxPrize] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState<number>(0);

  const toggleSpec = (spec: string) => {
    setSelectedSpecs((prev) => (prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]));
  };

  return (
    <div className="bg-white px-5 py-5 rounded-2xl shadow-lg w-full">
      <h2 className="text-xl font-bold text-purple-700 mb-4">Filter</h2>

      <div className="mb-5">
        <h3 className="font-semibold mb-2">Specialization</h3>
        {specializations.map((spec) => (
          <label key={spec} className="flex items-center gap-2 mb-1 ">
            <input type="checkbox" checked={selectedSpecs.includes(spec)} onChange={() => toggleSpec(spec)} />
            <span>{spec}</span>
          </label>
        ))}
      </div>

      <div className="mb-5">
        <h3 className="font-semibold mb-1">Prize</h3>
        <label htmlFor="">Minimum</label>
        <input
          type="text"
          placeholder="Rp."
          value={minPrize}
          onChange={(e) => setMinPrize(e.target.value)}
          className="w-full mb-2 border border-gray-300 rounded-[0.5rem] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61008D] transition duration-200"
        />
        <label htmlFor="">Maksimal</label>
        <input
          type="text"
          placeholder="Rp."
          value={maxPrize}
          onChange={(e) => setMaxPrize(e.target.value)}
          className="w-full border border-gray-300 rounded-[0.5rem] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61008D] transition duration-200"
        />
      </div>

      <div className="mb-5">
        <h3 className="font-semibold mb-1">Location</h3>
        <input
          type="text"
          placeholder="Search Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded-[0.5rem] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61008D] transition duration-200"
        />
      </div>

      <div className="mb-5">
        <h3 className="font-semibold mb-2">Rating</h3>
        <div className="flex gap-2 flex-wrap justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star)} className={`flex items-center gap-1 px-2 py-1 rounded border ${rating === star ? "bg-purple-500 text-white" : "border-gray-300 text-gray-500"}`}>
              {Array.from({ length: star }, (_, i) => (
                <FaStar key={i} className="text-sm" />
              ))}
            </button>
          ))}
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-2 rounded-md mt-4 hover:opacity-90 transition">Apply</button>
    </div>
  );
};

export default Filter;
