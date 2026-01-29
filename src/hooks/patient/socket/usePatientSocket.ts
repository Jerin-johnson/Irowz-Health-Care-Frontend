import { useEffect } from "react";
import { getSocket } from "../../../socket/socket";

export const usePatientSocket = (userId?: string | null) => {
  useEffect(() => {
    if (!userId) return;

    const socket = getSocket();

    const joinRoom = () => {
      console.log("Patient joined room:", userId);
      socket.emit("join-user", userId);
    };

    socket.on("connect", joinRoom);

    if (socket.connected) {
      joinRoom();
    }

    return () => {
      // DO NOT disconnect socket here
      socket.off("connect", joinRoom);
    };
  }, [userId]);
};
