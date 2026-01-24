import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "../../../socket/socket";

export function usePatientQueueSocket(
  userId: string | null,
  appointmentId: string,
) {
  const queryClient = useQueryClient();
  const socket = getSocket();

  useEffect(() => {
    if (!userId) return;

    const joinRoom = () => {
      console.log("The user joined", userId);
      socket.emit("join-user", userId);
    };

    const onQueueUpdated = () => {
      queryClient.invalidateQueries({
        queryKey: ["patient:live:queue", appointmentId],
      });
    };

    socket.on("connect", joinRoom);
    socket.on("queue-updated", onQueueUpdated);

    if (socket.connected) {
      joinRoom();
    }

    return () => {
      socket.off("connect", joinRoom);
      socket.off("queue-updated", onQueueUpdated);
    };
  }, [userId, appointmentId, queryClient, socket]);
}
