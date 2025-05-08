import React from "react";
import { FaStar } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { Lawyer } from "@/types/models/lawyer";

interface LawyerCardProps {
  lawyer: Lawyer;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden mb-4 hover:shadow-lg transition-shadow duration-200">
      <div className="p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4 relative h-40 md:h-auto overflow-hidden rounded-lg">
            <img
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              src={lawyer.image_url}
              alt={lawyer.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/placeholder-lawyer.png";
              }}
            />
          </div>
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{lawyer.name}</h2>
              <div className="flex items-center gap-1 bg-purple-50 text-purple-700 font-semibold px-3 py-1 rounded-full">
                {lawyer.rating}/5 <FaStar />
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span className="font-medium">{lawyer.experience_years} years experience</span>
              <span className="flex items-center gap-1 text-purple-600">
                <HiLocationMarker />
                {lawyer.location}
              </span>
            </div>

            <p className="mt-3 text-gray-700">{lawyer.available ? "Available for consultation" : "Currently unavailable"}</p>

            <div className="flex gap-2 mt-4 flex-wrap">
              {lawyer.specialization.map((specialty, index) => (
                <span key={index} className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium px-3 py-1 rounded-xl text-sm">
                  {specialty}
                </span>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <button className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg transition-colors">Contact Lawyer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;
