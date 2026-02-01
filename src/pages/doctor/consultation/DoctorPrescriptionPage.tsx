import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import PrescriptionView from "../../../components/ReuseableComponets/Percriptionview";
import { fetchPrescriptionDoctorApi } from "../../../api/apiService/doctor/doctor.consultation";

const DoctorPrescriptionViewPage = () => {
  const { id: recordId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["medical-record", recordId],
    queryFn: () => fetchPrescriptionDoctorApi(recordId!),
    enabled: !!recordId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;

  return (
    <PrescriptionView
      medicalRecord={data.medicalRecord}
      doctorInfo={data.doctorInfo}
      onClose={() => navigate(-1)}
      onDownload={() => console.log("Download PDF")}
    />
  );
};

export default DoctorPrescriptionViewPage;
