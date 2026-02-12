import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

import { usePatientSocket } from "../hooks/patient/socket/usePatientSocket";
import { useIncomingConsultationCall } from "../hooks/patient/consultation/useIncomingConsultationCall";

import IncomingCallModal from "../components/onlineVideo/patient/IncomingCallModal";
import PatientZegoVideoRoom from "../components/onlineVideo/patient/PatientZegoVideoRoom";
import { useRingtone } from "../hooks/sound/RingTone";

const PatientSessionBoundary = () => {
  const { isAuthenticated, role, userId } = useAppSelector(
    (state) => state.auth,
  );

  console.log(isAuthenticated, role);

  // //  connect socket ONLY if logged-in PATIENT
  // const shouldConnect = isAuthenticated && role === "PATIENT";

  usePatientSocket(userId);

  const { incomingCall, clearIncomingCall } = useIncomingConsultationCall();

  useRingtone(!!incomingCall);

  const [activeConsultationId, setActiveConsultationId] = useState<
    string | null
  >(null);

  return (
    <>
      {/*  This renders child routes */}
      <Outlet />

      {/*  Incoming call modal */}
      {incomingCall && (
        <IncomingCallModal
          consultationId={incomingCall.consultationId}
          doctorId={incomingCall.doctorId}
          onAccepted={() => {
            setActiveConsultationId(incomingCall.consultationId);
            clearIncomingCall();
          }}
          onRejected={clearIncomingCall}
        />
      )}

      {/*  Video call */}
      {activeConsultationId && (
        <div className="fixed inset-0 z-50 bg-black">
          <PatientZegoVideoRoom consultationId={activeConsultationId} />
        </div>
      )}
    </>
  );
};

export default PatientSessionBoundary;
