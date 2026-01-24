import { Mail, MapPin, Phone } from "lucide-react";
import type { Patient } from "../../../../types/doctor/doctor.consulation.types";

interface Props {
  patient: Patient;
  notes: string;
  setNotes: (v: string) => void;
  handleSaveObservationNote: () => void;
}

const PatientOverviewTab = ({
  patient,
  notes,
  setNotes,
  handleSaveObservationNote,
}: Props) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Basic Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Basic Information
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Full Name</span>
            <span className="text-sm font-medium text-gray-900">
              {patient?.fullName}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Age</span>
            <span className="text-sm font-medium text-gray-900">
              {patient?.age} Years
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Gender</span>
            <span className="text-sm font-medium text-gray-900">
              {patient?.gender}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Blood Group</span>
            <span className="text-sm font-medium text-red-600">
              {patient?.bloodGroup}
            </span>
          </div>
        </div>
      </div>

      {/* Vitals */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Vitals</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Height</span>
            <span className="text-sm font-medium text-gray-900">
              {patient?.height} cm
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Weight</span>
            <span className="text-sm font-medium text-gray-900">
              {patient?.weight} kg
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">BMI</span>
            <span className="text-sm font-medium text-gray-900">
              {patient?.bmi}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">BP</span>
            <span className="text-sm font-medium text-gray-900">
              {patient?.bp}
            </span>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Contact</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <span className="text-sm text-gray-600 block">Phone</span>
              <span className="text-sm font-medium text-gray-900">
                {patient?.phone}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <span className="text-sm text-gray-600 block">Email</span>
              <span className="text-sm font-medium text-gray-900 break-all">
                {patient?.email}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <span className="text-sm text-gray-600 block">City</span>
              <span className="text-sm font-medium text-gray-900">
                {patient?.city}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Alerts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Allergies */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-red-800">
            Known Allergies
          </h3>
        </div>
        <ul className="space-y-2">
          {patient?.allergies.map((allergy, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-sm text-red-700"
            >
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {allergy}
            </li>
          ))}
        </ul>
      </div>

      {/* Chronic Conditions */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-amber-800">
            Chronic Conditions
          </h3>
        </div>
        <ul className="space-y-2">
          {patient?.chronicConditions.map((condition, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-sm text-amber-700"
            >
              <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
              {condition}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Quick Notes */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Quick Observation Notes
      </h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add quick notes about patient's current condition..."
        className="w-full min-h-24 p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      />
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          onClick={handleSaveObservationNote}
        >
          Save Notes
        </button>
        <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          + Add Vitals
        </button>
      </div>
    </div>
  </div>
);

export default PatientOverviewTab;
