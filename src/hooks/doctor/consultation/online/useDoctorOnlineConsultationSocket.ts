import { useEffect, useState } from "react";
import { getSocket } from "../../../../socket/socket";
import { api } from "../../../../api/axios.config";

export const useDoctorOnlineConsultationSocket = (doctorId: string) => {
  const socket = getSocket();

  const [consultationId, setConsultationId] = useState<string | null>(null);

  const [status, setStatus] = useState<"IDLE" | "CALLING" | "IN_PROGRESS">(
    "IDLE",
  );

  useEffect(() => {
    if (!doctorId) return;

    const fetchActive = async () => {
      try {
        const res = await api.get("/doctor/consultation/active/online");
        if (res.data?.data.consultationId) {
          setConsultationId(res.data.data.consultationId);
          setStatus(res.data.data.status);
        }
      } catch {}
    };

    fetchActive();
  }, [doctorId]);

  useEffect(() => {
    if (!doctorId) return;
    const onInitiated = (payload: {
      consultationId: string;
      appointmentId: string;
    }) => {
      setConsultationId(payload.consultationId);
      setStatus("CALLING");
      console.log("To check is this called");
    };

    const onAccepted = (payload: {
      consultationId: string;
      appointmentId: string;
    }) => {
      console.log("does the accepted called actually");
      setStatus("IN_PROGRESS");
    };

    const onRejected = () => {
      setStatus("IDLE");
      setConsultationId(null);
    };

    socket.on("ONLINE_CONSULTATION_INITIATED", onInitiated);
    socket.on("ONLINE_CONSULTATION_ACCEPTED", onAccepted);
    socket.on("ONLINE_CONSULTATION_REJECTED", onRejected);

    return () => {
      socket.off("ONLINE_CONSULTATION_INITIATED", onInitiated);
      socket.off("ONLINE_CONSULTATION_ACCEPTED", onAccepted);
      socket.off("ONLINE_CONSULTATION_REJECTED", onRejected);
    };
  }, [socket]);

  return { consultationId, status };
};
