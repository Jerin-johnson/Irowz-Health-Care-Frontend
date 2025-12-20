import React from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

// ==================== TYPES ====================
interface DoctorCardProps {
  name: string;
  specialty: string;
  price: number;
  rating: number;
  reviewCount: number;
  image?: string;
}

// ==================== DOCTOR CARD COMPONENT ====================
const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  specialty,
  price,
  rating,
  reviewCount,
  image,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      {/* Image Section */}
      <div className="relative h-64 bg-gray-100">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-md shadow-md">
          <span className="text-sm font-semibold text-gray-800">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-3">{specialty}</p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-yellow-400 px-2 py-1 rounded">
            <Star size={14} fill="white" stroke="white" />
            <span className="text-xs font-semibold text-white">
              {rating.toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>
      </div>
    </div>
  );
};

// ==================== DOCTORS SECTION ====================
const DoctorsSection: React.FC = () => {
  const doctors: DoctorCardProps[] = [
    {
      name: "Saeed Tamer",
      specialty: "Cardiologist",
      image: "/image-2.png",
      price: 0.0,
      rating: 4.5,
      reviewCount: 0,
    },
    {
      name: "Dr Ruby Perrin",
      specialty: "Cardiologist",
      image: "/image-2.png",
      price: 200.0,
      rating: 4.8,
      reviewCount: 85,
    },
    {
      name: "Darren Elder",
      specialty: "Cardiologist",
      image: "/image-2.png",
      price: 0.0,
      rating: 4.7,
      reviewCount: 124,
    },
    {
      name: "Dr James Amen",
      specialty: "Cardiologist",
      image: "/image-2.png",
      price: 120.0,
      rating: 4.9,
      reviewCount: 203,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Best Doctors
            <span className="inline-block ml-2 text-blue-400">+</span>
          </h2>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <DoctorCard key={index} {...doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsSection;
