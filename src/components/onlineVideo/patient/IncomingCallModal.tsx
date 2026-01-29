import React, { useState } from "react";

import { notify } from "../../../shared/notification/toast";
import { respondConsultationApi } from "../../../api/apiService/patient/consultationOnline";

interface Props {
  consultationId: string;
  doctorId: string;
  onAccepted: () => void;
  onRejected: () => void;
}

const IncomingCallModal: React.FC<Props> = ({
  consultationId,
  doctorId,
  onAccepted,
  onRejected,
}) => {
  const [loading, setLoading] = useState(false);

  const respond = async (action: "ACCEPT" | "REJECT") => {
    try {
      setLoading(true);
      await respondConsultationApi({
        consultationId,
        action,
      });

      action === "ACCEPT" ? onAccepted() : onRejected();
    } catch (err: any) {
      notify.error(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[360px]">
        <h2 className="text-lg font-semibold mb-2">Doctor is calling</h2>
        <p className="text-sm text-gray-600 mb-4">
          Please respond to start the consultation
        </p>

        <div className="flex gap-4">
          <button
            disabled={loading}
            onClick={() => respond("ACCEPT")}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Accept
          </button>

          <button
            disabled={loading}
            onClick={() => respond("REJECT")}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallModal;
