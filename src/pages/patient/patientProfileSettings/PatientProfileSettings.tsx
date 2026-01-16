import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { notify } from "../../../shared/notification/toast";
import ProfileImageUpload from "../../../components/common/ProfileImageUpload";
import InputField from "../../../components/common/InputField";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  editPatientProfileApi,
  getPatientProfileAPi,
} from "../../../api/apiService/patient/patientProfile";
import { patientProfileSchema } from "../../../validators/patient/patientProfie.Schema";
import { setProfileImage } from "../../../store/slice/Auth/auth.slice";

type PatientProfileInput = z.input<typeof patientProfileSchema>;
type PatientProfileOutput = z.output<typeof patientProfileSchema>;

const PatientProfileSettings: React.FC = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const queryClient = useQueryClient();

  const [profileImageFile, setProfileImageFile] = useState<
    File | string | null
  >(null);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PatientProfileInput>({
    resolver: zodResolver(patientProfileSchema),
  });

  const { data } = useQuery({
    queryKey: ["patient:profile:setting", userId],
    queryFn: getPatientProfileAPi,
    enabled: !!userId,
  });

  useEffect(() => {
    if (!data) return;

    dispatch(setProfileImage({ profileImage: data.profileImage }));

    reset({
      fullName: data.fullName,
      mobile: data.mobile,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      bloodGroup: data.bloodGroup,
      height: data.height,
      weight: data.weight,
      state: data.state,
      city: data.city,
      pincode: data.pincode,
      address: data.address,
      email: data.email,
    });

    setProfileImageFile((data.profileImage as string) ?? null);
  }, [data, reset]);

  const editProfileMutateFn = useMutation({
    mutationFn: editPatientProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patient:profile:setting", userId],
      });
      notify.success("The patient profile updated successfully");
    },
    onError: (data: any) => {
      console.log("The error data is", data);
      if (data.response.data.message) {
        notify.error(data.response.data.message);
        return;
      }
      notify.error(
        data.response.errors.fieldErrors.body[0] ||
          "faild to update the profile"
      );
    },
  });

  const saveProfile: SubmitHandler<PatientProfileInput> = (formValues) => {
    const parsedData: PatientProfileOutput =
      patientProfileSchema.parse(formValues);

    const formData = new FormData();

    Object.entries(parsedData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    if (profileImageFile instanceof File) {
      formData.append("profileImage", profileImageFile);
    }

    editProfileMutateFn.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(saveProfile)}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Profile Settings
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Information Section */}
        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-6">
            Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <InputField
              label="Full Name"
              placeholder="Enter full name"
              register={register("fullName")}
              error={errors.fullName?.message}
            />

            <InputField
              label="Weight kg"
              type="number"
              register={register("weight")}
              error={errors.weight?.message}
            />

            <InputField
              label="Mobile Number"
              register={register("mobile")}
              error={errors.mobile?.message}
            />

            <InputField
              label="Height cm"
              type="number"
              register={register("height")}
              error={errors.height?.message}
            />

            <InputField
              label="Email Address"
              register={register("email")}
              disabled
            />

            <InputField
              label="Date of Birth"
              type="date"
              register={register("dateOfBirth")}
              error={errors.dateOfBirth?.message}
            />

            <InputField
              label="Blood Group"
              placeholder="O+"
              register={register("bloodGroup")}
              error={errors.bloodGroup?.message}
            />

            <InputField
              label="Gender"
              register={register("gender")}
              error={errors.gender?.message}
            />
          </div>
        </div>

        {/* Location Section */}
        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-6">
            Location
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <InputField
              label="State"
              register={register("state")}
              error={errors.state?.message}
            />

            <InputField
              label="Address"
              register={register("address")}
              error={errors.address?.message}
            />

            <InputField
              label="City"
              register={register("city")}
              error={errors.city?.message}
            />

            <InputField
              label="Pincode"
              register={register("pincode")}
              error={errors.pincode?.message}
            />
          </div>
        </div>

        {/* Profile Photo Section */}
        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-6">
            Profile Photo
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <ProfileImageUpload
              imageUrl={data && profileImageFile}
              onFileSelect={setProfileImageFile}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={editProfileMutateFn.isPending}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editProfileMutateFn.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PatientProfileSettings;
