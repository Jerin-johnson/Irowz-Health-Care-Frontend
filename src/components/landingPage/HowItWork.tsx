import React from "react";
import { Search, Calendar, FileText, CheckCircle } from "lucide-react";

// ==================== TYPES ====================
interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// ==================== STEP CARD COMPONENT ====================
const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-4">
      {/* Icon */}
      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// ==================== HOW IT WORKS SECTION ====================
const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <Search className="text-blue-500" size={24} />,
      title: "Search Doctor",
      description:
        "Search for a doctor based on specialization, location, or availability.",
    },
    {
      icon: <FileText className="text-blue-500" size={24} />,
      title: "Check Doctor Profile",
      description:
        "Explore detailed doctor profiles on our platform to make informed healthcare decisions.",
    },
    {
      icon: <Calendar className="text-blue-500" size={24} />,
      title: "Schedule Appointment",
      description:
        "After choose your preferred doctor, select a convenient time slot, & confirm your appointment.",
    },
    {
      icon: <CheckCircle className="text-blue-500" size={24} />,
      title: "Get Your Solution",
      description:
        "Discuss your health concerns with the doctor and receive personalized advice & solution.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative">
            <div className="relative rounded-full overflow-hidden">
              {/* Blue Background Circle */}
              <div className="absolute inset-0 bg-blue-200 rounded-full transform scale-95"></div>

              {/* Doctor Image Placeholder */}
              <div className="relative h-96 bg-gradient-to-b from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
                <div className="w-64 h-80 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-full"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Steps */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <p className="text-blue-500 font-medium mb-2">How it Works</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                4 easy steps to get your solution
                <span className="inline-block ml-2 text-blue-400">+</span>
              </h2>
            </div>

            {/* Steps Grid */}
            <div className="grid sm:grid-cols-2 gap-8">
              {steps.map((step, index) => (
                <StepCard key={index} {...step} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
