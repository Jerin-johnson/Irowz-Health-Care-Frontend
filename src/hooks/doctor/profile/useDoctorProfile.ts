import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { doctorProfileSchema } from "../../../validators/DoctorProfileSchema";
import {
  editDoctorProfileApi,
  getDoctorProfile,
} from "../../../api/apiService/doctor/doctorProfile";
import type { DoctorProfile } from "../../../types/doctor/doctorProfile.type";
import { notify } from "../../../shared/notification/toast";
import { useAppDispatch } from "../../../store/hooks";
import { setProfileImage } from "../../../store/slice/Auth/auth.slice";

export type ProfileForm = z.infer<typeof doctorProfileSchema>;

export function useDoctorProfile() {
  const [editMode, setEditMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const form = useForm<ProfileForm>({
    resolver: zodResolver(doctorProfileSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      bio: "",
      experienceYears: 0,
      consultationFee: 0,
    },
  });

  // React Query for fetching
  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctor-profile"],
    queryFn: getDoctorProfile,
  });

  const queryClient = useQueryClient();

  const editProfileMutation = useMutation({
    mutationFn: editDoctorProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-profile"] });
      setShowSuccess(true);
      setEditMode(false);
      setProfileImageFile(null);
      setShowSuccess(false);
      notify.success("profile updated successfully");
    },
    onError: (error) => {
      notify.error(error.message);
    },
  });

  // Sync query data → form
  useEffect(() => {
    if (!data?.data) return;
    console.log("the data is ", data);
    const profile: DoctorProfile = data.data;
    if (data.data?.profileImage)
      dispatch(setProfileImage({ profileImage: data.data.profileImage }));

    form.reset({
      fullName: profile.fullName,
      mobile: profile.phone,
      bio: profile.bio,
      experienceYears: profile.experienceYears,
      consultationFee: profile.consultationFee,
    });
  }, [data, form, dispatch]);

  const saveProfile = (formValues: ProfileForm) => {
    console.log("is this called", formValues);
    const formData = new FormData();

    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }

    console.log(formData);

    editProfileMutation.mutate(formData);
  };

  return {
    doctorProfile: data?.data ?? null,
    editMode,
    setEditMode,
    showSuccess,
    setShowSuccess,
    profileImageFile,
    setProfileImageFile,
    saveProfile,
    form,
    loading: isLoading,
    isError,
    isSaving: editProfileMutation.isPending,
  };
}
