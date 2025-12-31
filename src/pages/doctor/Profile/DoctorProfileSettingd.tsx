import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "../../../components/common/Alert";
import Button from "../../../components/common/Button";
import { z } from "zod";
import { doctorProfileSchema } from "../../../validators/DoctorProfileSchema";
import { securitySchema } from "../../../validators/SecurityPasswordChangeSchema";
import InputField from "../../../components/common/InputField";
import Card from "../../../components/common/Card";
import { notify } from "../../../shared/notification/toast";
import { getDoctorProfile } from "../../../api/apiService/hosptial/doctorProfile";
import type { DoctorProfile } from "../../../types/doctor/doctorProfile.type";

type ProfileForm = z.infer<typeof doctorProfileSchema>;
type SecurityForm = z.infer<typeof securitySchema>;

const DoctorProfileSettings: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset: resetProfile,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(doctorProfileSchema),
    defaultValues: {
      fullName: "name",
      mobile: "9946009319",
      bio: "Dr. Ananya Rao is a senior cardiologist with over 12 years of experience in treating complex heart conditions.",
      experienceYears: 12,
      consultationFee: 600,
    },
  });

  async function fetchData() {
    const data = await getDoctorProfile();
    setDoctorProfile(data.data);
    resetProfile({
      fullName: data.data.fullName,
      mobile: data.data.phone,
      bio: data.data.bio,
      experienceYears: data.data.experienceYears,
      consultationFee: data.data.consultationFee,
    });

    console.log("the data from the frontedn", data);
  }

  useEffect(() => {
    async function fetch() {
      await fetchData();
    }
    fetch();
  }, []);

  const {
    register: registerSecurity,
    handleSubmit: handleSecuritySubmit,
    formState: { errors: securityErrors },
    reset,
  } = useForm<SecurityForm>({
    resolver: zodResolver(securitySchema),
  });

  const onProfileSave = (data: ProfileForm) => {
    console.log("Profile Update Payload:", data);
    setShowSuccess(true);
    setEditMode(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const onPasswordChange = (data: SecurityForm) => {
    console.log("Password Change Payload:", data);
    reset();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Profile & Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your personal profile and account preferences
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6">
            <Alert message="Changes saved successfully!" type="success" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Profile Information">
            {!editMode && (
              <div className="lg:col-span-2 flex justify-end">
                <button
                  onClick={() => {
                    setEditMode(true);
                    notify.success("turned on edit mode");
                  }}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  Edit Profile
                </button>
              </div>
            )}
            <InputField
              label="Full Name"
              register={register("fullName")}
              error={errors.fullName?.message}
            />

            <InputField
              label="Email Address"
              value={doctorProfile?.email}
              disabled
            />

            <InputField
              label="Mobile Number"
              register={register("mobile")}
              error={errors.mobile?.message}
            />

            <InputField
              label="Specialty"
              value={doctorProfile?.specialtyName}
              disabled
            />

            <InputField
              label="Medical Registration Number"
              value={doctorProfile?.medicalRegistrationNumber}
              disabled
            />

            <InputField
              label="Medical Council"
              value={doctorProfile?.medicalCouncil}
              disabled
            />

            <InputField
              label="Bio"
              register={register("bio")}
              error={errors.bio?.message}
            />

            <InputField
              label="Experience (Years)"
              type="number"
              register={register("experienceYears", { valueAsNumber: true })}
              error={errors.experienceYears?.message}
            />

            <InputField
              label="Consultation Fee"
              type="number"
              register={register("consultationFee", { valueAsNumber: true })}
              error={errors.consultationFee?.message}
            />

            {editMode && (
              <div className="mt-6">
                <Button onClick={handleSubmit(onProfileSave)}>
                  Save Changes
                </Button>
              </div>
            )}
          </Card>

          <Card title="Security Settings">
            <InputField
              label="Current Password"
              type="password"
              register={registerSecurity("currentPassword")}
              error={securityErrors.currentPassword?.message}
            />

            <InputField
              label="New Password"
              type="password"
              register={registerSecurity("newPassword")}
              error={securityErrors.newPassword?.message}
            />

            <InputField
              label="Confirm New Password"
              type="password"
              register={registerSecurity("confirmPassword")}
              error={securityErrors.confirmPassword?.message}
            />

            <div className="mt-6 mb-4">
              <Button onClick={handleSecuritySubmit(onPasswordChange)}>
                Change Password
              </Button>
            </div>

            <Alert
              message="Password must be at least 8 characters with uppercase, lowercase, and numbers"
              type="info"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileSettings;
