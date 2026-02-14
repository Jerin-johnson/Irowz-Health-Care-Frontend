import React from "react";
// import { Pagination } from "../../../components/common/Pagination";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletePlan,
  fetchPlans,
  togglePlanStatus,
} from "../../../api/apiService/superAdmin/subcription";
import { confirmAction } from "../../../shared/notification/confirm";
import toast from "react-hot-toast";

interface Plan {
  _id: string;
  name: string;
  price: number;

  durationInDays: number;
  // maxPatients: number;
  doctorLimit: number;
  isActive: boolean;
  createdAt: string;
}

const PlanListingPage: React.FC = () => {
  const { data: plans = [], isLoading } = useQuery<Plan[]>({
    queryKey: ["subscription-plans"],
    queryFn: fetchPlans,
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: togglePlanStatus,

    onMutate: async ({ id, isActive }) => {
      await queryClient.cancelQueries({ queryKey: ["subscription-plans"] });

      const previousPlans = queryClient.getQueryData<Plan[]>([
        "subscription-plans",
      ]);

      //  Optimistically update UI
      queryClient.setQueryData<Plan[]>(
        ["subscription-plans"],
        (old) => old?.map((p) => (p._id === id ? { ...p, isActive } : p)) || [],
      );

      return { previousPlans };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["subscription-plans"], context?.previousPlans);
      toast.error("action failed");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePlan,

    onMutate: async (planId) => {
      await queryClient.cancelQueries({ queryKey: ["subscription-plans"] });

      const previousPlans = queryClient.getQueryData<Plan[]>([
        "subscription-plans",
      ]);

      //  Optimistically remove from UI
      queryClient.setQueryData<Plan[]>(
        ["subscription-plans"],
        (old) => old?.filter((p) => p._id !== planId) || [],
      );

      return { previousPlans };
    },

    onError: (_err, _planId, context) => {
      if (context?.previousPlans) {
        queryClient.setQueryData(["subscription-plans"], context.previousPlans);
      }
      toast.error("Delete failed");
    },
  });

  async function deletePlans(id: string) {
    const result = await confirmAction({
      title: "Are You Sure ",
      description: "This will permentally delete the plan",
      type: "warning",
    });

    if (!result) return;

    deleteMutation.mutate(id);
  }

  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = 1;

  if (isLoading) return <p className="p-6">Loading plans...</p>;

  console.log(plans);

  // if (!plans.length) return <div>No data</div>;
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Subscription Management
            </h1>
            <p className="text-gray-600">
              Create and manage hospital subscription plans
            </p>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            onClick={() => navigate("/super-admin/plan/create")}
          >
            <span className="text-xl">+</span>
            Create New Plan
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Plan Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Duration
                </th>
                {/* <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Max patients
                </th> */}
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Max Doctors
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Created Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {plans.map((plan: Plan) => (
                <tr key={plan._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {plan.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    ${plan.price}/month
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {plan.durationInDays} days
                  </td>
                  {/* <td className="px-6 py-4 text-sm text-gray-600">
                    {plan.maxPatients.toLocaleString()}
                  </td> */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {plan.doctorLimit}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        plan.isActive === true
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {plan.isActive ? "Active" : "InActive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {plan.createdAt}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* <button className="text-blue-600 hover:text-blue-800">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button> */}

                      <button
                        onClick={() =>
                          toggleMutation.mutate({
                            id: plan._id,
                            isActive: plan.isActive ? false : true,
                          })
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          plan.isActive === true ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            plan.isActive === true
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>

                      <button
                        className="text-red-700"
                        disabled={toggleMutation.isPending}
                        onClick={() => deletePlans(plan._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!plans.length && (
            <p className="text-center bg-gray-100 text-gray-800 ">
              no plan created yet
            </p>
          )}
        </div>

        {/* Pagination */}
        {/* <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div> */}
      </div>
    </div>
  );
};

export default PlanListingPage;
