import React from "react";
import { FaStar } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { Lawyer } from "@/types/models/lawyer";

interface LawyerCardProps {
  lawyer: Lawyer;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer }) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col">

      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
        <img
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          src={lawyer.image_url}
          alt={lawyer.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/placeholder-lawyer.png";
          }}
        />
        <div className="absolute top-3 right-3 z-20">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-purple-700 font-semibold px-3 py-1 rounded-full shadow-sm">
            {lawyer.rating}/5 <FaStar className="text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <h2 className="text-lg font-bold text-gray-800 line-clamp-1">{lawyer.name}</h2>
          <div className="flex justify-between items-center mt-1.5 text-sm text-gray-600">
            <span className="font-medium">{lawyer.experience_years} years experience</span>
            <span className="flex items-center gap-1 text-purple-600">
              <HiLocationMarker />
              <span className="line-clamp-1">{lawyer.location}</span>
            </span>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mt-4 max-h-20 overflow-y-auto scrollbar-hide">
          {lawyer.specialization.map((specialty, index) => (
            <span key={index} className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium px-3 py-1 rounded-xl text-xs shadow-sm">
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;

