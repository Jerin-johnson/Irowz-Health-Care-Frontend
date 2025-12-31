import { useEffect, useState } from "react";
import FormModal from "../../../components/common/FormModel";
import type { FormField } from "../../../types/Form.types";
import { useNavigate } from "react-router-dom";
import {
  createDoctorAdminApi,
  getAllSpecialtNameApi,
  // createDoctorApi, // 🔜 you can enable later
} from "../../../api/apiService/hospitalAdmin/DoctorMangement";
import { notify } from "../../../shared/notification/toast";

/* =======================
   Types
======================= */

export interface DoctorFormData {
  fullName: string;
  email: string;
  phone: string;

  specialtyId: string; // ✅ backend _id

  medicalRegistrationNumber: string;
  medicalCouncil: "MCI" | "NMC" | "STATE_MEDICAL_COUNCIL";
  bio: string;
  consultationFee: number;
  experienceYears: number;
}

interface Specialty {
  _id: string;
  name: string;
}

const getDoctorFields = (specialties: Specialty[]): FormField[] => [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Dr. Sarah Johnson",
    required: true,
    validation: (value) => {
      if (!value || String(value).trim().length < 3) {
        return "Full name must be at least 3 characters";
      }
      return null;
    },
  },

  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "sarah.johnson@medicare.com",
    required: true,
    validation: (value) => {
      if (!value) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(String(value))) {
        return "Invalid email format";
      }
      return null;
    },
  },

  {
    name: "phone",
    label: "Mobile Number",
    type: "text",
    placeholder: "9876543210",
    required: true,
    validation: (value) => {
      const phone = String(value).replace(/\D/g, "");
      if (phone.length !== 10) {
        return "Mobile number must be 10 digits";
      }
      return null;
    },
  },

  {
    name: "specialtyId",
    label: "Specialty",
    type: "select",
    required: true,
    options: specialties.map((s) => ({
      label: s.name,
      value: s._id,
    })),
  },

  {
    name: "medicalRegistrationNumber",
    label: "Medical Registration Number",
    type: "text",
    placeholder: "MCI-12345 / SMC-98765",
    required: true,
    validation: (value) => {
      if (!value || String(value).trim().length < 5) {
        return "Enter a valid medical registration number";
      }
      return null;
    },
  },

  {
    name: "medicalCouncil",
    label: "Medical Council",
    type: "select",
    required: true,
    options: [
      { label: "Medical Council of India (MCI)", value: "MCI" },
      { label: "National Medical Commission (NMC)", value: "NMC" },
      { label: "State Medical Council", value: "STATE_MEDICAL_COUNCIL" },
    ],
  },

  {
    name: "bio",
    label: "Professional Bio",
    type: "textarea",
    placeholder:
      "Dr. Ananya Rao is a Senior Consultant Cardiologist with over 12 years of experience...",
    rows: 4,
    required: true,
    validation: (value) => {
      if (!value || String(value).trim().length < 50) {
        return "Bio must be at least 50 characters";
      }
      return null;
    },
  },

  {
    name: "consultationFee",
    label: "Consultation Price",
    type: "number",
    placeholder: "500",
    required: true,
    validation: (value) => {
      const price = Number(value);
      if (isNaN(price) || price <= 0) {
        return "Consultation price must be greater than 0";
      }
      return null;
    },
  },

  {
    name: "experienceYears",
    label: "Experience (Years)",
    type: "number",
    placeholder: "12",
    required: true,
    validation: (value) => {
      const years = Number(value);
      if (isNaN(years) || years < 0) {
        return "Experience must be a valid number";
      }
      if (years > 60) {
        return "Experience cannot exceed 60 years";
      }
      return null;
    },
  },
];

const AddDoctor = () => {
  const [isSpecialtyModalOpen, setIsSpecialtyModalOpen] = useState(true);
  const [specialtyNames, setSpecialtyNames] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function fetchSpecialty() {
    try {
      setLoading(true);
      const result = await getAllSpecialtNameApi();
      setSpecialtyNames(result.data);
    } catch (error) {
      console.error("Failed to fetch specialties", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSpecialty();
  }, []);

  async function handleSpecialtySubmit(data: DoctorFormData) {
    console.log("Final payload for backend:", data);

    // const{
    //   fullName,
    //   email,
    //   mobile,
    //   specialtyId, // Mongo _id
    //   medicalRegistrationNumber,
    //   medicalCouncil,
    //   bio,
    //   consultationPrice,
    //   experience,
    // } = data;

    try {
      setLoading(true);
      await createDoctorAdminApi(data);
      setLoading(false);
      setIsSpecialtyModalOpen(false);
      navigate("/hospital-admin/doctor");
      console.log(data);
      notify.success("doctor created successfully");
    } catch (error: any) {
      console.log(error);
      notify.error(error.response.data.message);
    }
  }

  return (
    <div>
      <FormModal
        isOpen={isSpecialtyModalOpen}
        onClose={() => {
          setIsSpecialtyModalOpen(false);
          navigate("/hospital-admin/doctor");
        }}
        onSubmit={handleSpecialtySubmit}
        title={"Add New Doctor"}
        subtitle={"Update Doctor details"}
        fields={getDoctorFields(specialtyNames)}
        submitButtonText={"Add Doctor"}
        loading={loading}
      />
    </div>
  );
};

export default AddDoctor;
