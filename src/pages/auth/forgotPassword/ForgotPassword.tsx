import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/common/InputField";
import { forgotPasswordApi } from "../../../api/apiService/auth/auth.service";

interface ForgotPasswordForm {
  email: string;
}

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      setLoading(true);
      setMessage(null);

      const res = await forgotPasswordApi(data.email);

      setMessage(
        res.message || "If the email exists, a reset link has been sent",
      );
    } catch (error: any) {
      console.log("The errror is", error);
      setMessage(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
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
          Forgot Password
        </h2>

        <InputField
          label="Email"
          placeholder="Enter your email"
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
          error={errors.email?.message}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg
          hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && (
          <p className="text-sm text-center text-green-600 mt-4">{message}</p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
