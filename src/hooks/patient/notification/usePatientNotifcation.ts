import { useEffect } from "react";
import { getSocket } from "../../../socket/socket";

interface Notification {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
}

export function usePatientNotificationSocket(
  userId: string | null,
  onNewNotification: (notification: Notification) => void,
) {
  const socket = getSocket();

  useEffect(() => {
    if (!userId) return;

    // const joinRoom = () => {
    //   socket.emit("join-user", userId);
    // };

    const onNotification = (notification: Notification) => {
      onNewNotification(notification);
    };

    // socket.on("connect", joinRoom);
    socket.on("notification", onNotification);

    // if (socket.connected) {
    //   joinRoom();
    // }

    return () => {
      // socket.off("connect", joinRoom);
      socket.off("notification", onNotification);
    };
  }, [userId, onNewNotification, socket]);
}
