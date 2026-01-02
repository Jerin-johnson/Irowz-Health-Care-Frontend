import { Building2, Check, X } from "lucide-react";
import { StatCard } from "../../../components/common/StatCard";
import { useEffect, useState } from "react";
import { Pagination } from "../../../components/common/Pagination";
import { confirmAction } from "../../../shared/notification/confirm";
import { notify } from "../../../shared/notification/toast";
import Button from "../../../components/common/Button";
import { useNavigate } from "react-router-dom";
import type { Doctor } from "../../../types/DoctorListingAdmin.type";
import {
  getAllSpecialtNameApi,
  getHospitalDoctorPaginatedApi,
  toggleDoctorStatusApi,
} from "../../../api/apiService/hospitalAdmin/DoctorMangement";

interface specailty {
  _id: string;
  name: string;
}

const DoctorListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("0");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [totalHospitals, setTotalHospital] = useState(0);
  const [IsActiveHospitalCount, setIsActiveHospitalCount] = useState(0);
  const [specailtyNames, setSpecailtyNames] = useState<specailty[]>([]);
  const navigate = useNavigate();

  async function handleBlock(doctorId: string) {
    const isConfirmed = await confirmAction({
      title: "Block the Doctor?",
      description: "This will suspend the doctor",
      confirmText: "Block",
      type: "warning",
    });

    if (!isConfirmed) return;

    await toggleDoctorStatusApi({
      doctorId,
      isActive: false,
    });

    setDoctors((prev) =>
      prev.map((doc) =>
        doc._id !== doctorId ? doc : { ...doc, isActive: false }
      )
    );

    setIsActiveHospitalCount((prev) => prev - 1);
    notify.error("Doctor blocked successfully");
  }

  async function handleUnBlock(doctorId: string) {
    const isConfirmed = await confirmAction({
      title: "UnBlock the Doctor?",
      description: "This will activate the doctor",
      confirmText: "UnBlock",
      type: "warning",
    });

    if (!isConfirmed) return;

    await toggleDoctorStatusApi({
      doctorId,
      isActive: true,
    });

    setDoctors((prev) =>
      prev.map((doc) =>
        doc._id !== doctorId ? doc : { ...doc, isActive: true }
      )
    );

    setIsActiveHospitalCount((prev) => prev + 1);
    notify.success("Doctor unblocked successfully");
  }

  async function fetch() {
    setLoading(true);

    const res = await getHospitalDoctorPaginatedApi({
      page: currentPage,
      limit: 5,
      search: searchTerm || undefined,
      isActive:
        statusFilter === "Suspended"
          ? false
          : statusFilter === "Active"
          ? true
          : undefined,
      specialtyId: specialtyFilter !== "0" ? specialtyFilter : undefined,
    });

    console.log(specialtyFilter);
    setDoctors(res.data);
    setTotalHospital(res.stats.totalDoctorCount);
    setIsActiveHospitalCount(res.stats.activeDoctorCount);
    setTotalPages(res.pagination.totalPages);
    setLoading(false);

    await fetchSpecialty();
  }

  async function fetchSpecialty() {
    const result = await getAllSpecialtNameApi();
    console.log(result);
    setSpecailtyNames(result.data);
  }

  useEffect(() => {
    async function fetchData() {
      await fetch();
    }
    fetchData();
  }, [specialtyFilter, currentPage, searchTerm, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Verfied Doctor</h1>
          <p className="text-gray-600 text-sm mt-1">Manage Approved Doctor</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Total Doctors"
            value={totalHospitals}
            variant="blue"
            icon={<Building2 className="w-6 h-6 text-blue-600" />}
          />

          <StatCard
            label="Active Doctors"
            value={IsActiveHospitalCount}
            variant="green"
            icon={<Check className="w-6 h-6 text-green-600" />}
          />

          <StatCard
            label="Suspended Doctor"
            value={totalHospitals - IsActiveHospitalCount}
            variant="red"
            icon={<X className="w-6 h-6 text-red-600" />}
          />
        </div>

        <div className="flex justify-end">
          <Button
            className="my-3"
            variant="primary"
            onClick={() => navigate("/hospital-admin/doctor/add")}
          >
            Add Doctor
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          {/* Filters Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Verfied Doctor Directory
              </h2>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search doctor..."
                  className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />

                <select
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value.valueOf())}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value={0}>Speciality</option>
                  {specailtyNames.map((val) => {
                    return <option value={val._id}>{val.name}</option>;
                  })}
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
                  <th className="px-6 py-3 text-left text-xs font-medium">
                    Doctor Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium">
                    Specialty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium">
                    Reg-No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  doctors.map((doctor) => (
                    <tr key={doctor._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {doctor.user.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {doctor.user.phone}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm">{doctor.user.email}</td>

                      <td className="px-6 py-4 text-sm">
                        {doctor.specialty.name}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {doctor.medicalRegistrationNumber}
                      </td>

                      <td className="px-6 py-4">
                        {doctor.isActive ? (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Blocked
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-between w-full">
                          {doctor.isActive ? (
                            <button
                              onClick={() => handleBlock(doctor._id)}
                              className="px-2 py-1 text-red-950 rounded-lg text-sm font-small hover:bg-red-400"
                            >
                              Block
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnBlock(doctor._id)}
                              className="px-2 py-1 text-green-950 rounded-lg text-sm font-small hover:bg-green-400"
                            >
                              UnBlock
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

export default DoctorListing;
