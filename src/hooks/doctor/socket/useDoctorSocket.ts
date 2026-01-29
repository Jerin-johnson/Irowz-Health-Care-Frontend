import { useEffect } from "react";
import { getSocket } from "../../../socket/socket";

export const useDoctorSocket = (doctorId?: string | null) => {
  useEffect(() => {
    if (!doctorId) return;

    const socket = getSocket();

    const joinRoom = () => {
      console.log("Doctor joined room:", doctorId);
      socket.emit("join-doctor", doctorId);
    };

    socket.on("connect", joinRoom);

    if (socket.connected) {
      joinRoom();
    }

    return () => {
      socket.off("connect", joinRoom);
    };
  }, [doctorId]);
};
