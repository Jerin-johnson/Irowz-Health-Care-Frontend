import { useEffect, useState } from "react";
import { getSocket } from "../../../socket/socket";

interface IncomingCallPayload {
  consultationId: string;
  doctorId: string;
}

export const useIncomingConsultationCall = () => {
  const socket = getSocket();
  const [incomingCall, setIncomingCall] = useState<IncomingCallPayload | null>(
    null,
  );

  useEffect(() => {
    const onIncomingCall = (payload: IncomingCallPayload) => {
      setIncomingCall(payload);
    };

    socket.on("incoming-call", onIncomingCall);

    return () => {
      socket.off("incoming-call", onIncomingCall);
    };
  }, [socket]);

  return {
    incomingCall,
    clearIncomingCall: () => setIncomingCall(null),
  };
};
