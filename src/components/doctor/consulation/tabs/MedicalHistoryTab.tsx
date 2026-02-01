import { Calendar, FileText, Search } from "lucide-react";
import Card from "../common/Card";
import Input from "../common/Input";
import Badge from "../common/Badge.2";
import type { MedicalRecord } from "../../../../types/doctor/doctor.consulation.types";
import { useEffect } from "react";
import { notify } from "../../../../shared/notification/toast";
import { formatDate } from "../../../../utils/patientAppointment.listng";
import { Pagination } from "../../../common/Pagination";
import { useNavigate } from "react-router-dom";

interface Props {
  startDate: string;
  endDate: string;
  setStartDate: (v: string) => void;
  setEndDate: (v: string) => void;
  diagnosisKeyword: string;
  setDiagnosisKeyword: (v: string) => void;
  records: MedicalRecord[];

  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFetching: boolean;
}

const MedicalHistoryTab = ({
  startDate,
  setStartDate,
  diagnosisKeyword,
  endDate,
  setEndDate,
  setDiagnosisKeyword,
  records,
  currentPage,
  onPageChange,
  totalPages,
  isFetching,
}: Props) => {
  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      notify.error("Start date cannot be after end date");
      setEndDate("");
    }
  }, [startDate, endDate, onPageChange, setEndDate]);

  const navigate = useNavigate();

  useEffect(() => {
    onPageChange(1);
  }, [diagnosisKeyword, startDate, endDate, onPageChange]);

  function ResetFilter() {
    setStartDate("");
    setDiagnosisKeyword("");
    setEndDate("");
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              START DATE
            </label>
            <Input
              type="date"
              placeholder="select start date"
              value={startDate}
              onChange={setStartDate}
              icon={<Calendar className="w-4 h-4" />}
            />
          </div> */}

          {/* <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              END DATE
            </label>
            <Input
              type="date"
              placeholder="select end date"
              value={endDate}
              onChange={setEndDate}
              icon={<Calendar className="w-4 h-4" />}
            />
          </div> */}

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
        <button
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          onClick={ResetFilter}
        >
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
                  Hospital Name
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
                    {formatDate(record.date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {record.doctorName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {record.hospitalName}
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
                      <button
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                        onClick={() =>
                          navigate(`/doctor/prescription/view/${record.id}`)
                        }
                      >
                        <FileText className="w-4 h-4" />
                        Prescription
                      </button>
                      <button
                        className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                        onClick={() =>
                          navigate(`/doctor/lab-report/view/${record.id}`)
                        }
                      >
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
        {records.length > 0 && (
          <div className="flex justify-end p-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        )}
        {isFetching && (
          <span className="text-sm text-gray-500 ml-3">Loading…</span>
        )}
      </Card>
    </div>
  );
};

export default MedicalHistoryTab;
