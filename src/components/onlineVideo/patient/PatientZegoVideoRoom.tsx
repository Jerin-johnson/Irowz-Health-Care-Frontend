import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { api } from "../../../api/axios.config";
import { useNavigate } from "react-router-dom";

interface Props {
  consultationId: string;
}

const PatientZegoVideoRoom: React.FC<Props> = ({ consultationId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const startVideo = async () => {
      const res = await api.post("/patient/video/token", {
        consultationId,
      });

      const { roomId, userId, userName } = res.data.data;

      console.log("The respone to data is", res.data);

      console.log({
        appId: import.meta.env.VITE_ZEGO_APP_ID,
        serverSecret: !!import.meta.env.VITE_ZEGO_SERVER_SECRET,
        roomId,
        userId,
      });

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        Number(import.meta.env.VITE_ZEGO_APP_ID),
        import.meta.env.VITE_ZEGO_SERVER_SECRET,
        roomId,
        `patient_${userId}`,
        userName,
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: containerRef.current!,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: true,
        showLeavingView: false,
        onLeaveRoom: async () => {
          // await api.post("/consultation/end", {
          //   consultationId,
          // });
          navigate("/");
        },
      });
    };

    startVideo();
  }, [consultationId]);

  return <div ref={containerRef} className="h-full w-full" />;
};

export default PatientZegoVideoRoom;
