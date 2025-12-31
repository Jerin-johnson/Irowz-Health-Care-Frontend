import { Building2, Check, X } from "lucide-react";
import { StatCard } from "../../../components/common/StatCard";
import { useEffect, useState } from "react";
import { Pagination } from "../../../components/common/Pagination";

import { confirmAction } from "../../../shared/notification/confirm";
import { notify } from "../../../shared/notification/toast";
import Button from "../../../components/common/Button";
import FormModal from "../../../components/common/FormModel";
import type { FormField } from "../../../types/Form.types";
import { useAppSelector } from "../../../store/hooks";
import {
  blockOrUnBlockSpecialty,
  createSpecialityApi,
  editSpecialityApi,
  getHospitalSpeicalityApi,
} from "../../../api/apiService/hospitalAdmin/specialitymangement";

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<HospitalSpeciality | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [specialitys, setspecialitys] = useState<HospitalSpeciality[]>([]);
  const [totalSpecialityCount, setTotalSpecialityCount] = useState(0);
  const [activeSpecialityCount, setActiveSpecialityCount] = useState(0);
  const [isSpecialtyModalOpen, setIsSpecialtyModalOpen] = useState(false);

  const auth = useAppSelector((state) => state.auth);

  console.log("The auth is ", auth);

  async function handleBlock(specialtyId: string) {
    const isConfirmed = await confirmAction({
      title: "Block the specialtyId?",
      description: "This Permantalley Block the Specialty",
      confirmText: "Block",
      type: "warning",
    });

    if (!isConfirmed) return;

    await blockOrUnBlockSpecialty({ specailtyId: specialtyId, status: false });
    setspecialitys((prev) => {
      return prev.map((pre) => {
        return pre._id != specialtyId ? pre : { ...pre, isActive: false };
      });
    });
    setActiveSpecialityCount((prev) => prev - 1);
    notify.error("Specialty blocked successfully");
  }

  async function handleUnBlock(specialtyId: string) {
    const isConfirmed = await confirmAction({
      title: "UnBlock the Speciality?",
      description: "This Permantalley UnBlock the Speciality",
      confirmText: "UnBlock",
      type: "warning",
    });

    if (!isConfirmed) return;
    await blockOrUnBlockSpecialty({ specailtyId: specialtyId, status: true });
    setspecialitys((prev) => {
      return prev.map((pre) => {
        return pre._id != specialtyId ? pre : { ...pre, isActive: true };
      });
    });
    setActiveSpecialityCount((prev) => prev + 1);
    notify.success("user Unblocked successfully");
  }

  async function fetch() {
    try {
      const res = await getHospitalSpeicalityApi({
        page: currentPage,
        limit: 10,
        search: searchTerm || undefined,
        isActive:
          statusFilter == "All Status"
            ? null
            : statusFilter == "blocked"
            ? false
            : true,
      });

      console.log("spelicaity", res);
      setspecialitys(res.data);
      setTotalSpecialityCount(res.totalSpecialityCount);
      setTotalPages(res.pagination.totalPages);
      setActiveSpecialityCount(res.activeSpecialityCount);
      setLoading(false);
    } catch (error) {
      console.log(error, "specialit");
    }
  }

  async function handleSpecialtySubmit(data: {
    name: string;
    description: string;
  }) {
    try {
      if (isEditMode && selectedSpecialty) {
        await editSpecialityApi(
          selectedSpecialty._id,
          data.name,
          data.description
        );

        setspecialitys((prev) =>
          prev.map((item) =>
            item._id === selectedSpecialty._id
              ? { ...item, name: data.name, description: data.description }
              : item
          )
        );

        notify.success("Specialty updated successfully");
      } else {
        await createSpecialityApi(data.name, data.description);
        notify.success("Specialty created successfully");
        await fetch();
      }

      // Reset modal state
      setIsSpecialtyModalOpen(false);
      setIsEditMode(false);
      setSelectedSpecialty(null);
    } catch (error) {
      console.error(error);
      notify.error("Something went wrong");
    }
  }

  function handleEdit(id: string) {
    const specialty = specialitys.find((s) => s._id === id);
    if (!specialty) return;

    setSelectedSpecialty(specialty);
    setIsEditMode(true);
    setIsSpecialtyModalOpen(true);
  }

  useEffect(() => {
    async function sampleFetch() {
      await fetch();
    }
    sampleFetch();
  }, [currentPage, searchTerm, statusFilter]);

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
            value={totalSpecialityCount}
            variant="blue"
            icon={<Building2 className="w-6 h-6 text-blue-600" />}
          />

          <StatCard
            label="Active speciality"
            value={activeSpecialityCount}
            variant="green"
            icon={<Check className="w-6 h-6 text-green-600" />}
          />

          <StatCard
            label="UnActive speciality"
            value={totalSpecialityCount - activeSpecialityCount}
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
                          {speciality.isActive ? (
                            <button
                              onClick={() => handleBlock(speciality._id)}
                              className="px-2 py-1 text-red-950 rounded-lg text-sm font-small hover:bg-red-400"
                            >
                              Block
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnBlock(speciality._id)}
                              className="px-2 py-1 text-green-950 rounded-lg text-sm font-small hover:bg-green-400"
                            >
                              UnBlock
                            </button>
                          )}
                          <button
                            onClick={() => handleEdit(speciality._id)}
                            className="px-2 py-1 text-green-950 rounded-lg text-sm font-small hover:bg-green-400"
                          >
                            Edit
                          </button>
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
        onClose={() => {
          setIsSpecialtyModalOpen(false);
          setIsEditMode(false);
          setSelectedSpecialty(null);
        }}
        onSubmit={handleSpecialtySubmit}
        title={isEditMode ? "Edit Specialty" : "Add New Specialty"}
        subtitle={
          isEditMode
            ? "Update medical specialty details"
            : "Create a new medical specialty"
        }
        fields={specialtyFields}
        submitButtonText={isEditMode ? "Update Specialty" : "Add Specialty"}
        defaultValues={
          isEditMode && selectedSpecialty
            ? {
                name: selectedSpecialty.name,
                description: selectedSpecialty.description,
              }
            : undefined
        }
      />
    </div>
  );
};

export default SpecialityListing;
