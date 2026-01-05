import React from "react";

export type DoctorProfileTab = "overview" | "location" | "reviews";

interface DoctorProfileTabsProps {
  activeTab: DoctorProfileTab;
  onChange: (tab: DoctorProfileTab) => void;
}

const DoctorProfileTabs: React.FC<DoctorProfileTabsProps> = ({
  activeTab,
  onChange,
}) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex">
        {/* Overview Tab */}
        <button
          type="button"
          onClick={() => onChange("overview")}
          className={`px-8 py-4 font-medium transition-colors ${
            activeTab === "overview"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Overview
        </button>

        {/* Location Tab */}
        <button
          type="button"
          onClick={() => onChange("location")}
          className={`px-8 py-4 font-medium transition-colors ${
            activeTab === "location"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Location
        </button>

        {/* Reviews Tab */}
        <button
          type="button"
          onClick={() => onChange("reviews")}
          className={`px-8 py-4 font-medium transition-colors ${
            activeTab === "reviews"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Reviews
        </button>
      </div>
    </div>
  );
};

export default DoctorProfileTabs;
