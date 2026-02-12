import { useState } from "react";
import { StatCard } from "../../../components/common/StatCard";
import {
  Check,
  ListOrderedIcon,
  LucideListOrdered,
} from "lucide-react";
import { Pagination } from "../../../components/common/Pagination";

import type {
  LabOrder,
  PaginationData,
} from "../../../types/hosptial/labOrder.types";
import { useHospitalLabOrders } from "../../../hooks/hospitalAdmin/labMangment/useHospitalLabOrders";
import { LabOrderViewModal } from "./LabOrderViewHosptialAdmin";

export default function LabOrdersPage() {
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "PENDING" | "RESULT_UPLOADED"
  >("ALL");

  const [selectedOrder, setSelectedOrder] = useState<LabOrder | null>(null);

  const { data, isPending } = useHospitalLabOrders(
    pagination.page,
    pagination.limit,
    statusFilter === "ALL" ? undefined : statusFilter,
  );

  const labOrders = data?.data.data || [];
  const paginationData = data?.data.pagination;

  const stats = {
    total: paginationData?.total || 0,
    pending: labOrders.filter((o) => o.status === "PENDING").length,
    completed: labOrders.filter((o) => o.status === "RESULT_UPLOADED").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Lab Orders</h1>
          <p className="text-gray-600 mt-1">
            Manage and upload lab test results
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard
            label="Total Orders"
            value={stats.total}
            variant="blue"
            icon={<LucideListOrdered className="w-6 h-6" />}
          />
          <StatCard
            label="Pending"
            value={stats.pending}
            variant="yellow"
            icon={<ListOrderedIcon className="w-6 h-6" />}
          />
          <StatCard
            label="Completed"
            value={stats.completed}
            variant="green"
            icon={<Check className="w-6 h-6" />}
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 flex justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Lab Orders Directory
            </h2>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as "ALL" | "PENDING" | "RESULT_UPLOADED",
                )
              }
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="RESULT_UPLOADED">Completed</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left">No</th>
                  <th className="px-6 py-3 text-left">order Id</th>
                  <th className="px-6 py-3 ">Patient Name</th>
                  <th className="px-6 py-3">Tests Count</th>
                  <th className="px-6 py-3">Clinical Reason</th>
                  <th className="px-6 py-3">Order Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {isPending ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : labOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      No lab orders found
                    </td>
                  </tr>
                ) : (
                  labOrders.map((order, index) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{order._id.slice(-8)}</td>
                      <td className="px-6 py-4">{order.patientId.name}</td>
                      <td className="px-6 py-4">{order.tests.length} tests</td>
                      <td className="px-6 py-4 truncate max-w-xs">
                        {order.clinicalReason}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            order.status === "PENDING"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {order.status === "PENDING" ? "Pending" : "Completed"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View & Upload
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200">
            <Pagination
              currentPage={paginationData?.page || 1}
              totalPages={paginationData?.totalPages || 1}
              onPageChange={(page) =>
                setPagination((prev) => ({ ...prev, page }))
              }
            />
          </div>
        </div>
      </div>

      {selectedOrder && (
        <LabOrderViewModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
