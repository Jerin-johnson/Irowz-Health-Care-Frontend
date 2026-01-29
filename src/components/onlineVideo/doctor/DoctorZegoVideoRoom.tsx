import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { api } from "../../../api/axios.config";

interface Props {
  consultationId: string;
}

const DoctorZegoVideoRoom: React.FC<Props> = ({ consultationId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const zpRef = useRef<any>(null);

  useEffect(() => {
    if (!consultationId || !containerRef.current) return;

    const initVideo = async () => {
      const res = await api.post("/doctor/video/token", { consultationId });
      const { roomId, userId, userName } = res.data.data;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        Number(import.meta.env.VITE_ZEGO_APP_ID),
        import.meta.env.VITE_ZEGO_SERVER_SECRET,
        roomId,
        `doctor_${userId}`,
        userName,
      );

      zpRef.current = ZegoUIKitPrebuilt.create(kitToken);

      zpRef.current.joinRoom({
        container: containerRef.current!,
        scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: true,
        showLeavingView: false,
        onLeaveRoom: async () => {
          await api.post("/doctor/consultation/online/end", {
            consultationId,
          });
        },
      });

      //  IMPORTANT: force resize after mount
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 300);
    };

    initVideo();

    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
        zpRef.current = null;
      }
    };
  }, [consultationId]);

  return <div ref={containerRef} className="w-full h-full bg-black" />;
};

export default DoctorZegoVideoRoom;
