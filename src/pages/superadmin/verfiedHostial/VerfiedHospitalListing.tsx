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

interface Hospital {
  _id: string;
  userId: string;
  name: string;
  officialEmail?: string;
  hospitalAddress: string;
  city: string;
  state: string;
  registrationNumber: string;
  submittedAt: string;
  isVerfied: boolean;
  isActive: boolean;
  verifiedAt: string;
  isBlocked: boolean;
}

const VerfiedHospitalListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [totalHospitals, setTotalHospital] = useState(0);
  const [IsActiveHospitalCount, setIsActiveHospitalCount] = useState(0);

  async function handleBlock(userId: string) {
    const isConfirmed = await confirmAction({
      title: "Block the User?",
      description: "This Permantalley Block the User",
      confirmText: "Block",
      type: "warning",
    });

    if (!isConfirmed) return;

    await blockOrUnBlockHospital({ userId, status: true });
    setHospitals((prev) => {
      return prev.map((pre) => {
        return pre.userId != userId ? pre : { ...pre, isBlocked: true };
      });
    });
    setIsActiveHospitalCount((prev) => prev - 1);
    notify.error("Hospital blocked successfully");
  }

  async function handleUnBlock(userId: string) {
    const isConfirmed = await confirmAction({
      title: "UnBlock the Hospital?",
      description: "This Permantalley UnBlock the Hosptial",
      confirmText: "UnBlock",
      type: "warning",
    });

    if (!isConfirmed) return;

    await blockOrUnBlockHospital({ userId, status: false });
    setHospitals((prev) => {
      return prev.map((pre) => {
        return pre.userId != userId ? pre : { ...pre, isBlocked: false };
      });
    });
    setIsActiveHospitalCount((prev) => prev + 1);
    notify.success("Hospital Unblocked successfully");
  }

  async function fetch() {
    const res = await getHospitalRequestsActual({
      page: currentPage,
      limit: 10,
      search: searchTerm || undefined,
      city: cityFilter !== "All Cities" ? cityFilter : undefined,
      isActive: statusFilter == "Suspended" ? false : true,
    });
    setHospitals(res.data);
    setTotalHospital(res.totalHospitals);
    setTotalPages(res.pagination.totalPages);
    setIsActiveHospitalCount(res.IsActiveHospitalCount);
    setLoading(false);
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
          <h1 className="text-2xl font-bold text-gray-900">Verfied Hospital</h1>
          <p className="text-gray-600 text-sm mt-1">Manage Approved Hospital</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Total Hospitals"
            value={totalHospitals}
            variant="blue"
            icon={<Building2 className="w-6 h-6 text-blue-600" />}
          />

          <StatCard
            label="Active Hospitals"
            value={IsActiveHospitalCount}
            variant="green"
            icon={<Check className="w-6 h-6 text-green-600" />}
          />

          <StatCard
            label="Suspended hospital"
            value={totalHospitals - IsActiveHospitalCount}
            variant="red"
            icon={<X className="w-6 h-6 text-red-600" />}
          />
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          {/* Filters Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Verfied Hospital Directory
              </h2>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search hospitals..."
                  className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />

                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option>All Cities</option>
                  <option>anganmaly</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Suspended</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Hospital Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Reg-No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Verfied At
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
                  hospitals.map((hospital) => (
                    <tr key={hospital._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {hospital.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {hospital.hospitalAddress}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{hospital.city}</td>
                      <td className="px-6 py-4 text-sm">
                        {hospital.officialEmail}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {hospital.registrationNumber}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(hospital.verifiedAt).toDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {hospital.isBlocked ? (
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
                          {hospital.isBlocked ? (
                            <button
                              onClick={() => handleUnBlock(hospital.userId)}
                              className="px-2 py-1 text-green-950 rounded-lg text-sm font-small hover:bg-green-400"
                            >
                              UnBlock
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBlock(hospital.userId)}
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
    </div>
  );
};

export default VerfiedHospitalListing;
