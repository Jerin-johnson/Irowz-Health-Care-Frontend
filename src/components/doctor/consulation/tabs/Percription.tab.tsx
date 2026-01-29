import { Plus, Trash2 } from "lucide-react";
import Button from "../common/Button";
import Card from "../common/Card";
import Input from "../common/Input";
import Select from "../common/Select";
import type { Medication } from "../../../../types/doctor/doctor.consulation.types";

interface Props {
  primaryDiagnosis: string;
  setPrimaryDiagnosis: (v: string) => void;
  clinicalObservations: string;
  setClinicalObservations: (v: string) => void;
  medications: Medication[];
  addMedication: () => void;
  updateMedication: (id: string, field: keyof Medication, value: any) => void;
  removeMedication: (id: string) => void;
  generalAdvice: string;
  setGeneralAdvice: (v: string) => void;
  followUpDate: string;
  setFollowUpDate: (v: string) => void;
}

const PrescriptionTab = ({
  primaryDiagnosis,
  setPrimaryDiagnosis,
  clinicalObservations,
  setClinicalObservations,
  medications,
  addMedication,
  updateMedication,
  removeMedication,
  generalAdvice,
  setGeneralAdvice,
  followUpDate,
  setFollowUpDate,
}: Props) => (
  <div className="space-y-6">
    {/* Primary Diagnosis */}
    <Card className="p-6">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Primary Diagnosis <span className="text-red-500">*</span>
      </label>
      <Input
        placeholder="Enter primary diagnosis"
        value={primaryDiagnosis}
        onChange={setPrimaryDiagnosis}
      />
      <p className="text-xs text-gray-500 mt-1">Min 200 characters</p>
    </Card>

    {/* Clinical Observations */}
    <Card className="p-6">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Clinical Observations
      </label>
      <textarea
        value={clinicalObservations}
        onChange={(e) => setClinicalObservations(e.target.value)}
        placeholder="Enter any physical or clinical observations..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        rows={4}
      />
    </Card>

    {/* Medicine Prescription */}
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">
          Medicine Prescription
        </h3>
        <Button onClick={addMedication} icon={<Plus className="w-4 h-4" />}>
          Add Medicine
        </Button>
      </div>

      {medications.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-3 text-xs font-medium text-gray-700 pb-2 border-b">
            <div className="col-span-3">Medicine Name</div>
            <div className="col-span-2">Dosage</div>
            <div className="col-span-2">Duration</div>
            <div className="col-span-3">Instructions</div>
            <div className="col-span-2">Remove</div>
          </div>
          {medications.map((med) => (
            <div key={med.id} className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-3">
                <Select
                  value={med.name}
                  onChange={(val) => updateMedication(med.id, "name", val)}
                  options={[
                    { value: "", label: "Select Medicine" },
                    { value: "Metformin", label: "Metformin" },
                    { value: "Lisinopril", label: "Lisinopril" },
                  ]}
                  placeholder="Select Medicine"
                />
              </div>
              <div className="col-span-2 flex gap-2">
                <Input
                  type="number"
                  placeholder="1"
                  value={med.dosage}
                  onChange={(val) => updateMedication(med.id, "dosage", val)}
                />
                <Select
                  value={med.dosageUnit}
                  onChange={(val) =>
                    updateMedication(med.id, "dosageUnit", val)
                  }
                  options={[
                    { value: "M", label: "M" },
                    { value: "A", label: "A" },
                    { value: "N", label: "N" },
                  ]}
                />
              </div>
              <div className="col-span-2 flex gap-2">
                <Input
                  type="number"
                  placeholder="7"
                  value={med.duration.toString()}
                  onChange={(val) =>
                    updateMedication(med.id, "duration", parseInt(val) || 0)
                  }
                />
                <Select
                  value={med.durationUnit}
                  onChange={(val) =>
                    updateMedication(med.id, "durationUnit", val)
                  }
                  options={[
                    { value: "Days", label: "Days" },
                    { value: "Weeks", label: "Weeks" },
                  ]}
                />
              </div>
              <div className="col-span-3">
                <Select
                  value={med.instructions}
                  onChange={(val) =>
                    updateMedication(med.id, "instructions", val)
                  }
                  options={[
                    { value: "After food", label: "After food" },
                    { value: "Before food", label: "Before food" },
                  ]}
                />
              </div>
              <div className="col-span-2">
                <button
                  onClick={() => removeMedication(med.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-8">
          No medications added yet
        </p>
      )}
    </Card>

    {/* General Advice */}
    <Card className="p-6">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        General Advice
      </label>
      <textarea
        value={generalAdvice}
        onChange={(e) => setGeneralAdvice(e.target.value)}
        placeholder="Enter lifestyle, diet, rest, or precaution advice..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        rows={4}
      />
    </Card>

    {/* Follow-up Date */}
    <Card className="p-6">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Follow-up Date
      </label>
      <Input
        type="date"
        placeholder="mm/dd/yyyy"
        value={followUpDate}
        onChange={setFollowUpDate}
      />
    </Card>

    {/* Actions */}
    <div className="flex gap-3">
      <Button variant="secondary">Save Draft</Button>
    </div>
  </div>
);

export default PrescriptionTab;
