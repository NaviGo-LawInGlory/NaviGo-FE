import React from 'react';
import { FaStar } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';

export interface LawyerCardProps {
  name: string;
  rating: number;
  priceRange: string;
  location: string;
  categories: string[];
  imageUrl: string;
}

const lawyers: LawyerCardProps[] = [
  {
    name: "Elgin Brian Wahyu B.",
    rating: 4.8,
    priceRange: "Rp500.000 - Rp1.000.000",
    location: "Malang",
    categories: ["Haki", "Pajak"],
    imageUrl: "Profil/ElginBrian.png",
  },
  {
    name: "Muhammad Rizqi",
    rating: 4.6,
    priceRange: "Rp700.000 - Rp1.200.000",
    location: "Surabaya",
    categories: ["Kontrak", "Perdata"],
    imageUrl: "Profil/Rizqi.png",
  },
  {
    name: "Muhammad Rizqi",
    rating: 4.6,
    priceRange: "Rp700.000 - Rp1.200.000",
    location: "Surabaya",
    categories: ["Kontrak", "Perdata"],
    imageUrl: "Profil/Rizqi.png",
  },
  {
    name: "Muhammad Rizqi",
    rating: 4.6,
    priceRange: "Rp700.000 - Rp1.200.000",
    location: "Surabaya",
    categories: ["Kontrak", "Perdata"],
    imageUrl: "Profil/Rizqi.png",
  },
];

const LawyerCardList: React.FC = () => {
  return (
    <div className="w-[90%] bg-gray-50 p-5 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 justify-start">
        {lawyers.map((lawyer, idx) => (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden shadow-lg border border-[#A31ABE]/20 bg-white p-4"
          >
            <img
              className="w-full h-[250px] object-cover rounded-xl"
              src={lawyer.imageUrl}
              alt={lawyer.name}
            />
            <div className="pt-4 flex justify-between items-center">
              <h2 className="text-lg font-bold text-black">{lawyer.name}</h2>
              <div className="flex items-center gap-1 text-[#A31ABE] font-semibold">
                {lawyer.rating}/5 <FaStar />
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>{lawyer.priceRange}</span>
              <span className="flex items-center gap-1 text-[#A31ABE]">
                <HiLocationMarker />
                {lawyer.location}
              </span>
            </div>
            <div className="flex gap-3 mt-4 flex-wrap">
              {lawyer.categories.map((category, catIdx) => (
                <button
                  key={catIdx}
                  className="bg-[#A31ABE] text-white font-semibold px-4 py-1 rounded-md hover:opacity-90 transition"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LawyerCardList;