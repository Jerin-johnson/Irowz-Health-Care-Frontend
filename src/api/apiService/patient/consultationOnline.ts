import { api } from "../../axios.config";

export const respondConsultationApi = async ({
  consultationId,
  action,
}: {
  consultationId: string;
  action: "ACCEPT" | "REJECT";
}) => {
  const res = await api.post("/patient/consultation/respond", {
    consultationId,
    action,
  });

  return res.data;
};
