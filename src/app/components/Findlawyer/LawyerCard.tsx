import React from "react";
import { FaStar } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import Image from "next/image";

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
    name: "Elgin Brian",
    rating: 4.8,
    priceRange: "Rp1.000.000 - Rp1.200.000",
    location: "Malang",
    categories: ["Haki", "Pajak"],
    imageUrl: "/Profil/Elgin.jpg",
  },
  {
    name: "Rizqi Aditya",
    rating: 4.6,
    priceRange: "Rp700.000 - Rp1.200.000",
    location: "Banjarnegara",
    categories: ["Kontrak", "Perdata"],
    imageUrl: "/Profil/Rizqi.jpg",
  },
  {
    name: "Andreas Bagasgoro",
    rating: 4.6,
    priceRange: "Rp700.000 - Rp1.200.000",
    location: "Batam",
    categories: ["Kontrak", "Perdata"],
    imageUrl: "/Profil/Andre.jpg",
  },
  {
    name: "Gantang Satria",
    rating: 4.6,
    priceRange: "Rp700.000 - Rp1.200.000",
    location: "Surabaya",
    categories: ["Kontrak", "Perdata"],
    imageUrl: "/Profil/Rizqi.png",
  },
];

const LawyerCardList: React.FC = () => {
  return (
    <div className="w-full bg-gray-50 p-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lawyers.map((lawyer, idx) => (
          <div key={idx} className="rounded-2xl overflow-hidden shadow-md bg-white p-5">
            <div className="overflow-hidden rounded-xl relative h-[250px]">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                src={lawyer.imageUrl}
                alt={lawyer.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/placeholder-lawyer.png"; // Fallback image
                }}
              />
            </div>
            <div className="pt-4 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">{lawyer.name}</h2>
              <div className="flex items-center gap-1 bg-purple-50 text-purple-700 font-semibold px-3 py-1 rounded-full">
                {lawyer.rating}/5 <FaStar />
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span className="font-medium">{lawyer.priceRange}</span>
              <span className="flex items-center gap-1 text-purple-600">
                <HiLocationMarker />
                {lawyer.location}
              </span>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {lawyer.categories.map((category, catIdx) => (
                <button key={catIdx} className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium px-4 py-1.5 rounded-xl hover:shadow-md transition-all duration-200">
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
