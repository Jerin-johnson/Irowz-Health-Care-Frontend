import { Plus, Search } from "lucide-react";
import type { LabTest } from "../../../../types/doctor/doctor.consulation.types";
import Button from "../common/Button";
import Card from "../common/Card";
import Badge from "../common/Badge.2";
import Input from "../common/Input";

interface Props {
  selectedTests: LabTest[];
  availableTests: LabTest[];
  testSearch: string;
  setTestSearch: (v: string) => void;
  action: "Hospital" | "Outside";
  setAction: (v: "Hospital" | "Outside") => void;
  clinicalReason: string;
  setClinicalReason: (v: string) => void;

  addTest: (test: LabTest) => void;
  removeTest: (id: string) => void;

  handleCreateLabOrder: () => void;
  isCreating: boolean;
}

const LabTestsTab = ({
  selectedTests,
  availableTests,
  testSearch,
  setTestSearch,
  action,
  setAction,
  clinicalReason,
  setClinicalReason,
  addTest,
  removeTest,
  handleCreateLabOrder,
  isCreating,
}: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Side - Test Selection */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6">
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Select Lab Tests <span className="text-red-500">*</span>
          </label>

          <Input
            placeholder="Search and select tests..."
            value={testSearch}
            onChange={setTestSearch}
            icon={<Search className="w-4 h-4" />}
          />

          {/* Selected Tests */}
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedTests.map((test) => (
              <Badge
                key={test.id}
                variant="blue"
                onRemove={() => removeTest(test.id)}
              >
                {test.name}
              </Badge>
            ))}
          </div>

          {/* Quick Select */}
          <div className="mt-4">
            <p className="text-xs font-medium text-gray-700 mb-2">
              Quick Select:
            </p>
            <div className="flex flex-wrap gap-2">
              {availableTests.slice(0, 6).map((test) => (
                <button
                  key={test.id}
                  onClick={() => addTest(test)}
                  className="px-3 py-1 text-xs border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {test.name}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Priority */}
        <Card className="p-6">
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Action <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setAction("Hospital")}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                action === "Hospital"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    action === "Hospital"
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {action === "Hospital" && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                  )}
                </div>
                <span className="font-medium text-sm">Hosptial</span>
              </div>
              <p className="text-xs text-gray-600">Result Auto Upload</p>
            </button>

            <button
              onClick={() => setAction("Outside")}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                action === "Outside"
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    action === "Outside"
                      ? "border-red-500 bg-red-500"
                      : "border-gray-300"
                  }`}
                >
                  {action === "Outside" && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                  )}
                </div>
                <span className="font-medium text-sm">Outside</span>
                <span className="text-red-500 text-xs">⚠</span>
              </div>
              <p className="text-xs text-gray-600">Patient Manullay Upload</p>
            </button>
          </div>
        </Card>

        {/* Clinical Reason */}
        <Card className="p-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Clinical Reason / Notes for Lab{" "}
            <span className="text-gray-500 text-xs">(Optional)</span>
          </label>

          <textarea
            value={clinicalReason}
            onChange={(e) => setClinicalReason(e.target.value)}
            placeholder="Enter any special instructions for the lab technician..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
          />

          <p className="text-xs text-gray-500 mt-2">
            This will be visible to lab technicians
          </p>
        </Card>
      </div>

      {/* Right Side - Order Preview */}
      <div className="lg:col-span-1">
        <Card className="p-6 sticky top-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Order Preview
          </h3>

          <div className="space-y-3 mb-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Selected Tests</p>
              {selectedTests.map((test) => (
                <div
                  key={test.id}
                  className="flex items-center gap-2 text-sm text-gray-900 mb-1"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  {test.name}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Priority</span>
                <span className="font-medium capitalize">{action}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Laboratory</span>
                <span className="font-medium">In-house Lab</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Est. Report Time</span>
                <span className="font-medium">24 hours</span>
              </div>
            </div>
          </div>

          <Button
            variant="success"
            fullWidth
            icon={<Plus className="w-4 h-4" />}
            onClick={handleCreateLabOrder}
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : "Create Lab Order"}
          </Button>

          <p className="text-xs text-center text-gray-500 mt-2">
            Order will be sent to lab immediately
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LabTestsTab;
