import { Building2, Check, X } from "lucide-react";
import { StatCard } from "../../../components/common/StatCard";
import { useEffect, useState } from "react";
import { Pagination } from "../../../components/common/Pagination";
import {
  blockOrUnBlockHospital,
  getHospitalRequestsActual,
} from "../../../api/apiService/superAdmin/hosptialMangment";
import { confirmAction } from "../../../shared/notification/confirm";
import { notify } from "../../../shared/notification/toast";
import Button from "../../../components/common/Button";
import FormModal from "../../../components/common/FormModel";
import type { FormField } from "../../../types/Form.types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

interface HospitalSpeciality {
  _id: string;
  hosptialId: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
}

const specialtyFields: FormField[] = [
  {
    name: "name",
    label: "Specialty Name",
    type: "text",
    placeholder: "Cardiology",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter specialty description...",
    required: true,
    rows: 4,
  },
];

const SpecialityListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [specialitys, setspecialitys] = useState<HospitalSpeciality[]>([]);
  const [totalHospitals, setTotalHospital] = useState(0);
  const [IsActiveHospitalCount, setIsActiveHospitalCount] = useState(0);
  const [isSpecialtyModalOpen, setIsSpecialtyModalOpen] = useState(false);

  const auth = useAppSelector((state) => state.auth);

  console.log("The auth is ", auth);

  async function handleBlock(userId: string) {
    const isConfirmed = await confirmAction({
      title: "Block the User?",
      description: "This Permantalley Block the User",
      confirmText: "Block",
      type: "warning",
    });

    if (!isConfirmed) return;

    await blockOrUnBlockHospital({ userId, status: true });
    await fetch();
    notify.error("user blocked successfully");
  }

  async function handleUnBlock(userId: string) {
    const isConfirmed = await confirmAction({
      title: "UnBlock the User?",
      description: "This Permantalley UnBlock the User",
      confirmText: "UnBlock",
      type: "warning",
    });

    if (!isConfirmed) return;

    await blockOrUnBlockHospital({ userId, status: false });
    await fetch();
    notify.success("user Unblocked successfully");
  }

  async function fetch() {
    const res = await getHospitalRequestsActual({
      page: currentPage,
      limit: 10,
      search: searchTerm || undefined,
      city: cityFilter !== "All Cities" ? cityFilter : undefined,
      isActive: statusFilter == "Suspended" ? false : true,
    });
    setspecialitys(res.data);
    setTotalHospital(res.totalHospitals);
    setTotalPages(res.pagination.totalPages);
    setIsActiveHospitalCount(res.IsActiveHospitalCount);
    setLoading(false);
  }

  async function handleSpecialtySubmit(data: {
    description: string;
    name: string;
  }) {
    console.log(data);
  }

  useEffect(() => {
    async function sampleFetch() {
      await fetch();
    }
    sampleFetch();
  }, [cityFilter, currentPage, searchTerm, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Speciality Mangement
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage speciality Hospital
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Total speciality"
            value={totalHospitals}
            variant="blue"
            icon={<Building2 className="w-6 h-6 text-blue-600" />}
          />

          <StatCard
            label="Active speciality"
            value={IsActiveHospitalCount}
            variant="green"
            icon={<Check className="w-6 h-6 text-green-600" />}
          />

          <StatCard
            label="UnActive speciality"
            value={totalHospitals - IsActiveHospitalCount}
            variant="red"
            icon={<X className="w-6 h-6 text-red-600" />}
          />
        </div>

        <div className="flex justify-end">
          <Button
            className="my-3"
            variant="primary"
            onClick={() => setIsSpecialtyModalOpen(true)}
          >
            Add Speciality{" "}
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          {/* Filters Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Verfied Hospital speciality
              </h2>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search speciality..."
                  className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />

                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option>speciality</option>
                  <option>cardiologist</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>blocked</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Speciality Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Speciality description
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  specialitys.map((speciality) => (
                    <tr key={speciality._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {speciality.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {/* {hospital.hospitalAddress} */}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {speciality.description}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {new Date(speciality.createdAt).toDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {speciality.isActive ? (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Blocked
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-between w-full">
                          {speciality.isActive ? (
                            <button
                              onClick={() => handleUnBlock(speciality._id)}
                              className="px-2 py-1 text-green-950 rounded-lg text-sm font-small hover:bg-green-400"
                            >
                              UnBlock
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBlock(speciality._id)}
                              className="px-2 py-1 text-red-950 rounded-lg text-sm font-small hover:bg-red-400"
                            >
                              Block
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
      <FormModal
        isOpen={isSpecialtyModalOpen}
        onClose={() => setIsSpecialtyModalOpen(false)}
        onSubmit={handleSpecialtySubmit}
        title="Add New Specialty"
        subtitle="Create a new medical specialty"
        fields={specialtyFields}
        submitButtonText="Add Specialty"
      />
    </div>
  );
};

export default SpecialityListing;
