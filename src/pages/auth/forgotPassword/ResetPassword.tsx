import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import InputField from "../../../components/common/InputField";
import { resetPasswordApi } from "../../../api/apiService/auth/auth.service";
import UserRoles from "../../../constants/UserRole";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordForm>();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or expired reset link");
    }
  }, [token]);

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) return;

    try {
      setLoading(true);
      setMessage(null);

      const res = await resetPasswordApi({
        token: token,
        newPassword: data.password,
      });

      if (!res.success) {
        throw new Error(res.message || "Reset failed");
      }

      setMessage("Password reset successful. Redirecting to login...");

      switch (res.data) {
        case UserRoles.PATIENT: {
          setTimeout(() => {
            navigate("/user/login");
          }, 1300);
          break;
        }
        case UserRoles.DOCTOR: {
          setTimeout(() => {
            navigate("/doctor/login");
          }, 1300);
          break;
        }
        case UserRoles.SUPER_ADMIN: {
          setTimeout(() => {
            navigate("/superadmin/login");
          }, 1300);
          break;
        }
        case UserRoles.HOSPITAL_ADMIN: {
          setTimeout(() => {
            navigate("/hospital/login");
          }, 1300);
          break;
        }
      }
    } catch (error: any) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Reset Password
        </h2>

        <InputField
          type="password"
          label="New Password"
          placeholder="Enter new password"
          register={register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          error={errors.password?.message}
        />

        <InputField
          type="password"
          label="Confirm Password"
          placeholder="Confirm new password"
          register={register("confirmPassword", {
            required: "Confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          error={errors.confirmPassword?.message}
        />

        <button
          type="submit"
          disabled={loading || !token}
          className="w-full bg-blue-600 text-white py-2 rounded-lg
          hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {message && (
          <p className="text-sm text-center mt-4 text-green-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
