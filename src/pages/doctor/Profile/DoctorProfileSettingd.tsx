import React from "react";
import Alert from "../../../components/common/Alert";
import Button from "../../../components/common/Button";
import InputField from "../../../components/common/InputField";
import Card from "../../../components/common/Card";
import { notify } from "../../../shared/notification/toast";
import ProfileImageUpload from "../../../components/common/ProfileImageUpload";
import { useDoctorProfile } from "../../../hooks/doctor/profile/useDoctorProfile";
import { useDoctorSecurity } from "../../../hooks/doctor/profile/useDoctorSecurity";

const DoctorProfileSettings: React.FC = () => {
  const {
    form,
    doctorProfile,
    editMode,
    setEditMode,
    showSuccess,
    setProfileImageFile,
    saveProfile,
    loading,
    isSaving,
  } = useDoctorProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const security = useDoctorSecurity();

  const { form: securityForm, changePassword } = security;

  const {
    register: registerSecurity,
    handleSubmit: handleSecuritySubmit,
    formState: { errors: securityErrors },
  } = securityForm;

  if (loading) return <div>Loading doctor profile</div>;

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
          {/* <Card title="Profile Information">
            
          </Card> */}

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
            <ProfileImageUpload
              imageUrl={doctorProfile?.profileImage}
              onFileSelect={setProfileImageFile}
            />
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
                <Button
                  onClick={handleSubmit(saveProfile)}
                  disabled={isSaving ? true : false}
                >
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
              <Button onClick={handleSecuritySubmit(changePassword)}>
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
