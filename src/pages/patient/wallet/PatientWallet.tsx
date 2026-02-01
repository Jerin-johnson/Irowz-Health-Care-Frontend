import React, { useState, useEffect } from "react";
import axios from "axios";
import type { Wallet } from "../../../types/PatientWallet";

export const WalletPatient: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet>({
    balance: 2450,
    transactions: [
      {
        _id: "txn_001",
        amount: 500,
        type: "CREDIT",
        reason: "Appointment Cancellation Refund",
        createdAt: new Date("2026-01-30T10:15:00.000Z"),
      },
      {
        _id: "txn_002",
        amount: 300,
        type: "DEBIT",
        reason: "Doctor Consultation Booking",
        createdAt: new Date("2026-01-29T14:30:00.000Z"),
      },
    ],
  });

  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterDate, setFilterDate] = useState<string>("");
  const [loading, setLoading] = useState(false);

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

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="ALL">All Transactions</option>
              <option value="CREDIT">Credits</option>
              <option value="DEBIT">Debits</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Date
            </label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <button
            onClick={() => {
              setFilterType("ALL");
              setFilterDate("");
            }}
            className="px-6 py-2.5 text-gray-700 font-medium hover:text-gray-900"
          >
            Clear Filters
          </button>
        </div>

        {/* Transaction List */}
        {loading ? (
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
