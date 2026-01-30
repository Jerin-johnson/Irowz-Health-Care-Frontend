import { Calendar, FileText, Search } from "lucide-react";
import Card from "../common/Card";
import Input from "../common/Input";
import Badge from "../common/Badge.2";
import type { MedicalRecord } from "../../../../types/doctor/doctor.consulation.types";

interface Props {
  dateRange: string;
  setDateRange: (v: string) => void;
  selectedDoctor: string;
  setSelectedDoctor: (v: string) => void;
  diagnosisKeyword: string;
  setDiagnosisKeyword: (v: string) => void;
  records: MedicalRecord[];
}

const MedicalHistoryTab = ({
  dateRange,
  setDateRange,
  diagnosisKeyword,
  setDiagnosisKeyword,
  records,
}: Props) => (
  <div className="space-y-6">
    {/* Filters */}
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            DATE RANGE
          </label>
          <Input
            type="date"
            placeholder="Select date range"
            value={dateRange}
            onChange={setDateRange}
            icon={<Calendar className="w-4 h-4" />}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            DIAGNOSIS KEYWORD
          </label>
          <Input
            placeholder="Search diagnosis..."
            value={diagnosisKeyword}
            onChange={setDiagnosisKeyword}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>
      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Reset Filters
      </button>
    </Card>

    {/* Records Table */}
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                Visit Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                Doctor Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                Diagnosis Summary
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                Visit Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {record.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {record.doctorName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {record.diagnosisSummary}
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant={
                      record.visitType === "OPD Visit" ? "blue" : "purple"
                    }
                  >
                    {record.visitType}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Prescription
                    </button>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Lab Reports
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

export default MedicalHistoryTab;
