import { ShieldCheck, UserX, UserCheck, Users } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pagination } from "../../../components/common/Pagination";
import { StatCard } from "../../../components/common/StatCard";

import {
  fetchUsersAdmin,
  blockUserAdmin,
  unblockUserAdmin,
  verifyUserAdmin,
  type UsersApiResponse,
  type User,
} from "../../../api/apiService/superAdmin/userManagement";

import { confirmAction } from "../../../shared/notification/confirm";
import { notify } from "../../../shared/notification/toast";

/* ---------------- Types ---------------- */

type UserRole = "PATIENT" | "DOCTOR" | "HOSPITAL_ADMIN";
type UserStatus = "ALL" | "VERIFIED" | "UNVERIFIED" | "BLOCKED";

const PAGE_SIZE = 10;

const SuperAdminUserManagement = () => {
  const [search] = useState("");
  const [role, setRole] = useState<UserRole | "ALL">("ALL");
  const [status, setStatus] = useState<UserStatus>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<UsersApiResponse>({
    queryKey: ["users", currentPage, role, status, search],
    queryFn: () =>
      fetchUsersAdmin({
        page: currentPage,
        limit: PAGE_SIZE,
        role: role !== "ALL" ? role : undefined,
        status: status !== "ALL" ? status : undefined,
        search: search || undefined,
      }),
  });

  const users: User[] = data?.data.items ?? [];
  const meta = data?.data.meta;

  const totalUsers = meta?.totalItems || 0;
  const verifiedCount = users.filter(
    (u) => u.isVerified && !u.isBlocked,
  ).length;
  const blockedCount = users.filter((u) => u.isBlocked).length;
  const unverifiedCount = users.filter(
    (u) => !u.isVerified && !u.isBlocked,
  ).length;

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["users"] });

  const blockMutation = useMutation({
    mutationFn: blockUserAdmin,

    onSuccess: (_, userId) => {
      queryClient.setQueryData(
        ["users", currentPage, role, status, search],
        (old: UsersApiResponse | undefined) => {
          if (!old) return old;

          return {
            ...old,
            data: {
              ...old.data,
              items: old.data.items.map((u) =>
                u._id === userId ? { ...u, isBlocked: true } : u,
              ),
            },
          };
        },
      );

      notify.success("User blocked");
    },
  });

  const unblockMutation = useMutation({
    mutationFn: unblockUserAdmin,
    onSuccess: () => {
      notify.success("User unblocked successfully");
      refresh();
    },
  });

  const verifyMutation = useMutation({
    mutationFn: verifyUserAdmin,
    onSuccess: () => {
      notify.success("User verified successfully");
      refresh();
    },
  });

  async function confirmAndRun(action: () => Promise<void>, message: string) {
    const ok = await confirmAction({
      title: "Confirm Action",
      description: message,
      confirmText: "Proceed",
      type: "warning",
    });

    if (!ok) return;
    await action();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage platform users, verification and access control
          </p>
        </div>

        {/* ---------- Stats ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Total Users"
            value={totalUsers}
            variant="blue"
            icon={<Users className="w-6 h-6 text-blue-600" />}
          />

          <StatCard
            label="Verified Users"
            value={verifiedCount}
            variant="green"
            icon={<ShieldCheck className="w-6 h-6 text-green-600" />}
          />

          <StatCard
            label="Blocked Users"
            value={blockedCount}
            variant="red"
            icon={<UserX className="w-6 h-6 text-red-600" />}
          />

          <StatCard
            label="Unverified Users"
            value={unverifiedCount}
            variant="yellow"
            icon={<UserCheck className="w-6 h-6 text-yellow-600" />}
          />
        </div>

        {/* ---------- Card Container ---------- */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-lg font-semibold text-gray-900">
                User Directory
              </h2>

              <div className="flex items-center gap-3">
                {/* <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users..."
                  className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
                /> */}

                <select
                  value={role}
                  onChange={(e) => {
                    setCurrentPage(1);
                    setRole(e.target.value as UserRole | "ALL");
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="ALL">All Roles</option>
                  <option value="PATIENT">Patient</option>
                  <option value="DOCTOR">Doctor</option>
                  <option value="HOSPITAL_ADMIN">Hospital Admin</option>
                </select>

                <select
                  value={status}
                  onChange={(e) => {
                    setCurrentPage(1);
                    setStatus(e.target.value as UserStatus);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="ALL">All Status</option>
                  <option value="VERIFIED">Verified</option>
                  <option value="UNVERIFIED">Unverified</option>
                  <option value="BLOCKED">Blocked</option>
                </select>
              </div>
            </div>
          </div>

          {/* ---------- Table ---------- */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
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
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {u.name}
                      </td>

                      <td className="px-6 py-4 text-sm">{u.email}</td>

                      <td className="px-6 py-4 text-sm">{u.phone}</td>

                      <td className="px-6 py-4 text-sm">{u.role}</td>

                      <td className="px-6 py-4">
                        {u.isBlocked ? (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Blocked
                          </span>
                        ) : u.isVerified ? (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Verified
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Unverified
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 space-x-2">
                        {!u.isVerified && !u.isBlocked && (
                          <button
                            className="px-2 py-1 rounded-lg text-sm hover:bg-green-100 text-green-700"
                            onClick={() =>
                              confirmAndRun(
                                () => verifyMutation.mutateAsync(u._id),
                                "Verify this user?",
                              )
                            }
                          >
                            Verify
                          </button>
                        )}

                        {!u.isBlocked ? (
                          <button
                            className="px-2 py-1 rounded-lg text-sm hover:bg-red-100 text-red-700"
                            onClick={() =>
                              confirmAndRun(
                                () => blockMutation.mutateAsync(u._id),
                                "Block this user?",
                              )
                            }
                          >
                            Block
                          </button>
                        ) : (
                          <button
                            className="px-2 py-1 rounded-lg text-sm hover:bg-blue-100 text-blue-700"
                            onClick={() =>
                              confirmAndRun(
                                () => unblockMutation.mutateAsync(u._id),
                                "Unblock this user?",
                              )
                            }
                          >
                            Unblock
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ---------- Pagination ---------- */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {meta?.totalPages}
            </p>

            <Pagination
              currentPage={currentPage}
              totalPages={meta?.totalPages || 1}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminUserManagement;
