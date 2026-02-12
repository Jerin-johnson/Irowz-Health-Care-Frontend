import React, { useState } from "react";
import type { Wallet } from "../../../types/PatientWallet";
import { useQuery } from "@tanstack/react-query";
import { GetWalletApi } from "../../../api/apiService/patient/Wallet";

const WalletPatient: React.FC = () => {
  const [filterType] = useState<string>("ALL");
  const [filterDate] = useState<string>("");

  const { data: wallet, isPending } = useQuery<Wallet>({
    queryKey: ["patient:wallet"],
    queryFn: GetWalletApi,
  });

  if (isPending) {
    return <div>Loading</div>;
  }

  if (!wallet) {
    return <div>Sorry something went wrong</div>;
  }

  console.log("The wallet is ", wallet);

  const filteredTransactions = wallet.transactions.filter((t) => {
    const typeMatch = filterType === "ALL" || t.type === filterType;
    const dateMatch =
      !filterDate ||
      new Date(t.createdAt).toLocaleDateString() ===
        new Date(filterDate).toLocaleDateString();
    return typeMatch && dateMatch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
        <p className="text-sm text-gray-600 mt-1">
          View and manage your wallet balance and transactions
        </p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md p-6 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium mb-1">
              Available Balance
            </p>
            <h2 className="text-4xl font-bold">
              {formatCurrency(wallet.balance)}
            </h2>
          </div>
          <div className="bg-blue-500 bg-opacity-40 rounded-full p-4">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Transaction History
        </h2>

        {/* Transaction List */}
        {isPending ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <svg
              className="w-24 h-24 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Transactions Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or make your first transaction
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction, index) => {
              const isCredit = transaction.type === "CREDIT";
              return (
                <div
                  key={transaction._id || index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full ${
                        isCredit ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {isCredit ? (
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.reason}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {formatDate(transaction.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-semibold ${isCredit ? "text-green-600" : "text-red-600"}`}
                    >
                      {isCredit ? "+" : "-"}{" "}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <span
                      className={`inline-block mt-1 px-2.5 py-0.5 text-xs font-medium rounded-full ${
                        isCredit
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPatient;
