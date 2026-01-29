import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "../../../socket/socket";

export function useDoctorQueueSocket(doctorId: string | null, date: string) {
  const queryClient = useQueryClient();
  const socket = getSocket();

  useEffect(() => {
    if (!doctorId) return;

    // const joinRoom = () => {
    //   console.log("The doctor joined", doctorId);
    //   socket.emit("join-doctor", doctorId);
    // };

    const onQueueUpdated = (payload?: { date?: string }) => {
      console.log("The queu updadte involed", payload);

      queryClient.invalidateQueries({
        queryKey: ["doctor:queue", doctorId, date],
      });
    };

    // socket.on("connect", joinRoom);
    socket.on("queue-updated", onQueueUpdated);

    // if (socket.connected) {
    //   joinRoom();
    // }

    return () => {
      // socket.off("connect", joinRoom);
      socket.off("queue-updated", onQueueUpdated);
    };
  }, [doctorId, date, queryClient, socket]);
}
