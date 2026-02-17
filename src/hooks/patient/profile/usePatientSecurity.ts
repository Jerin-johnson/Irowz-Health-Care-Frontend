import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { securitySchema } from "../../../validators/SecurityPasswordChangeSchema";
import { notify } from "../../../shared/notification/toast";
import { resetPatientPasswordApi } from "../../../api/apiService/patient/patientProfile";

export type SecurityForm = z.infer<typeof securitySchema>;

export function usePatientSecurity() {
  const form = useForm<SecurityForm>({
    resolver: zodResolver(securitySchema),
  });

  const changePassword = async (data: SecurityForm) => {
    try {
      console.log("the data reciveed is ", data);
      await resetPatientPasswordApi(data.currentPassword, data.newPassword);
      form.reset();
      notify.success("Password changed successfully");
    } catch (error: any) {
      console.log("the errror us", error);
      notify.error(
        error?.response?.data?.message || "Failed to reset password",
      );
    }
  };

  return {
    form,
    changePassword,
  };
}
