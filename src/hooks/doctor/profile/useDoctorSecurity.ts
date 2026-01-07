import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { securitySchema } from "../../../validators/SecurityPasswordChangeSchema";
import { resetDoctorPasswordApi } from "../../../api/apiService/doctor/doctorProfile";
import { notify } from "../../../shared/notification/toast";
import { useAppDispatch } from "../../../store/hooks";
import { logoutThunk } from "../../../store/slice/Auth/auth.thunks";

export type SecurityForm = z.infer<typeof securitySchema>;

export function useDoctorSecurity() {
  const dispatch = useAppDispatch();

  const form = useForm<SecurityForm>({
    resolver: zodResolver(securitySchema),
  });

  const changePassword = async (data: SecurityForm) => {
    try {
      await resetDoctorPasswordApi(data.currentPassword, data.newPassword);

      notify.success("Password changed successfully");
      notify.success("Please login again");

      form.reset();
      dispatch(logoutThunk());
    } catch (error: any) {
      notify.error(error?.data?.data?.message || "Failed to reset password");
    }
  };

  return {
    form,
    changePassword,
  };
}
