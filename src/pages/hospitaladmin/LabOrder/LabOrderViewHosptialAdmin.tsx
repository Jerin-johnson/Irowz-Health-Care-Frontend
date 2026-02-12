import { useState } from "react";
import type { LabOrder } from "../../../types/hosptial/labOrder.types";
import { useUploadHospitalLabResult } from "../../../hooks/hospitalAdmin/labMangment/useUploadLabResult";
import { notify } from "../../../shared/notification/toast";

interface Props {
  order: LabOrder;
  onClose: () => void;
}

export function LabOrderViewModal({ order, onClose }: Props) {
  const uploadMutation = useUploadHospitalLabResult();

  const [files, setFiles] = useState<Record<string, File>>({});

  function selectFile(testName: string, file: File) {
    setFiles((prev) => ({ ...prev, [testName]: file }));
  }

  function upload(testName: string) {
    const file = files[testName];
    if (!file) return;

    const formData = new FormData();
    formData.append("orderId", order._id);
    formData.append("appointmentId", order.appointmentId);
    formData.append("testName", testName);
    formData.append("file", file);

    uploadMutation.mutate(formData, {
      onSuccess: () => {
        notify.success("result uploaded successfully");
      },
    });
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between">
          <h2 className="text-2xl font-bold">Lab Order Details</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="px-6 py-4 space-y-4 overflow-y-auto">
          {order.tests.map((test) => (
            <div
              key={test._id}
              className="border border-gray-200 rounded-lg p-4 flex justify-between"
            >
              <div>
                <h4 className="font-semibold">{test.testName}</h4>
                <p className="text-sm text-gray-600">{test.category}</p>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) =>
                    e.target.files &&
                    selectFile(test.testName, e.target.files[0])
                  }
                />

                {files[test.testName] && (
                  <button
                    onClick={() => upload(test.testName)}
                    disabled={uploadMutation.isPending}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    {uploadMutation.isPending ? "Uploading..." : "Upload"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border rounded-lg bg-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
