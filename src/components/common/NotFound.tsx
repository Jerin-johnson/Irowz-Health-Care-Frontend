import React, { useState, useEffect, useRef, useMemo } from "react";

interface VitalSign {
  label: string;
  value: string;
  status: "critical" | "warning" | "normal";
}

interface Position {
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

const NotFoundPage: React.FC = () => {
  const [heartRate, setHeartRate] = useState<number>(0);
  const [diagnosis, setDiagnosis] = useState<string>("Analyzing...");
  const [eyesFollowMouse, setEyesFollowMouse] = useState<Position>({
    x: 0,
    y: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const vitalSigns: VitalSign[] = [
    { label: "Error Code", value: "404", status: "critical" },
    { label: "Page Pulse", value: "0 BPM", status: "critical" },
    { label: "Link Status", value: "BROKEN", status: "warning" },
    { label: "Patient Mood", value: "Confused", status: "warning" },
  ];

  const diagnoses: string[] = [
    "Acute URL-itis detected",
    "Chronic Page-Not-Found Syndrome",
    "Severe Link Deficiency",
    "404 Fever - highly contagious",
    "Broken Link Syndrome",
    "Digital Navigation Disorder",
  ];

  // Generate particles once using useMemo to fix purity issue
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
    }));
  }, []);

  useEffect(() => {
    // Simulate heartbeat
    const heartbeatInterval = setInterval(() => {
      setHeartRate((prev) => {
        if (prev === 0) return 120;
        if (prev === 120) return 0;
        return prev;
      });
    }, 600);

    // Rotate diagnoses
    const diagnosisInterval = setInterval(() => {
      setDiagnosis(diagnoses[Math.floor(Math.random() * diagnoses.length)]);
    }, 3000);

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(diagnosisInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + 200;

        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const distance = Math.min(
          8,
          Math.hypot(e.clientX - centerX, e.clientY - centerY) / 50,
        );

        setEyesFollowMouse({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden"
    >
      {/* Floating medical symbols */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-2xl opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {["💊", "🩺", "💉", "🏥", "⚕️"][particle.id % 5]}
        </div>
      ))}

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Hospital Monitor Header */}
        <div className="bg-slate-800 rounded-t-2xl border-4 border-slate-700 p-4 w-full max-w-4xl">
          <div className="flex justify-between items-center text-green-400 font-mono text-sm">
            <span>PATIENT MONITOR v4.04</span>
            <span className="animate-pulse">● REC</span>
          </div>
        </div>

        {/* Main Monitor Display */}
        <div className="bg-black border-4 border-slate-700 border-t-0 rounded-b-2xl p-8 w-full max-w-4xl shadow-2xl">
          {/* Vital Signs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {vitalSigns.map((vital, index) => (
              <div
                key={index}
                className="bg-slate-900 rounded-lg p-4 border-2 border-slate-700"
              >
                <div className="text-xs text-slate-500 mb-1">{vital.label}</div>
                <div
                  className={`text-2xl font-bold font-mono ${
                    vital.status === "critical"
                      ? "text-red-500 animate-pulse"
                      : vital.status === "warning"
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  {vital.value}
                </div>
              </div>
            ))}
          </div>

          {/* Doctor Character */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <svg width="200" height="200" viewBox="0 0 200 200">
                {/* Doctor's coat */}
                <path
                  d="M 70 80 Q 70 70 80 70 L 120 70 Q 130 70 130 80 L 130 160 Q 130 170 120 170 L 80 170 Q 70 170 70 160 Z"
                  fill="#e0f2fe"
                  stroke="#0369a1"
                  strokeWidth="2"
                />

                {/* Pocket with red cross */}
                <rect
                  x="85"
                  y="120"
                  width="30"
                  height="35"
                  rx="3"
                  fill="#bfdbfe"
                />
                <path
                  d="M 95 130 L 95 145 M 88 137.5 L 102 137.5"
                  stroke="#dc2626"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Head */}
                <circle
                  cx="100"
                  cy="55"
                  r="25"
                  fill="#fcd34d"
                  stroke="#0369a1"
                  strokeWidth="2"
                />

                {/* Doctor's mirror headband */}
                <ellipse cx="100" cy="45" rx="28" ry="8" fill="#94a3b8" />
                <circle
                  cx="100"
                  cy="35"
                  r="8"
                  fill="#cbd5e1"
                  stroke="#475569"
                  strokeWidth="2"
                />

                {/* Eyes that follow mouse */}
                <g>
                  <ellipse cx="90" cy="55" rx="6" ry="8" fill="white" />
                  <circle
                    cx={90 + eyesFollowMouse.x}
                    cy={55 + eyesFollowMouse.y}
                    r="3"
                    fill="#1e293b"
                  />
                </g>
                <g>
                  <ellipse cx="110" cy="55" rx="6" ry="8" fill="white" />
                  <circle
                    cx={110 + eyesFollowMouse.x}
                    cy={55 + eyesFollowMouse.y}
                    r="3"
                    fill="#1e293b"
                  />
                </g>

                {/* Confused mouth */}
                <path
                  d="M 90 65 Q 100 68 110 65"
                  stroke="#1e293b"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Stethoscope */}
                <path
                  d="M 65 90 Q 60 100 60 110"
                  stroke="#475569"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle
                  cx="60"
                  cy="115"
                  r="6"
                  fill="#64748b"
                  stroke="#1e293b"
                  strokeWidth="2"
                />
                <path
                  d="M 65 90 Q 75 85 85 85"
                  stroke="#475569"
                  strokeWidth="3"
                  fill="none"
                />

                {/* Arms */}
                <rect
                  x="50"
                  y="90"
                  width="20"
                  height="50"
                  rx="10"
                  fill="#e0f2fe"
                  stroke="#0369a1"
                  strokeWidth="2"
                />
                <rect
                  x="130"
                  y="90"
                  width="20"
                  height="50"
                  rx="10"
                  fill="#e0f2fe"
                  stroke="#0369a1"
                  strokeWidth="2"
                />

                {/* Clipboard in hand */}
                <rect
                  x="135"
                  y="120"
                  width="25"
                  height="35"
                  rx="2"
                  fill="#fbbf24"
                  stroke="#92400e"
                  strokeWidth="2"
                />
                <rect x="138" y="125" width="19" height="25" fill="white" />
                <line
                  x1="141"
                  y1="130"
                  x2="154"
                  y2="130"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
                <line
                  x1="141"
                  y1="135"
                  x2="154"
                  y2="135"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
                <line
                  x1="141"
                  y1="140"
                  x2="151"
                  y2="140"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Heartbeat line */}
            <div className="w-full max-w-md h-16 bg-slate-950 rounded-lg border-2 border-green-900 p-2 mb-4 overflow-hidden">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 60"
                preserveAspectRatio="none"
              >
                <polyline
                  points="0,30 50,30 60,10 70,50 80,30 400,30"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  className="heartbeat-line"
                  style={{
                    transform: `translateX(${heartRate}px)`,
                    transition: "transform 0.6s linear",
                  }}
                />
              </svg>
            </div>
          </div>

          {/* Diagnosis Box */}
          <div className="bg-red-950 border-2 border-red-500 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🚨</div>
              <div className="flex-1">
                <h2 className="text-red-400 font-bold text-xl mb-2 font-mono">
                  DIAGNOSIS
                </h2>
                <p className="text-red-300 text-lg font-mono">{diagnosis}</p>
                <p className="text-red-400 text-sm mt-2 italic">
                  The page you're looking for has flatlined. No vital signs
                  detected.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/")}
              className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50"
              type="button"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-xl">🏥</span>
                <span>EMERGENCY EXIT (Home)</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              onClick={() => window.history.back()}
              className="group relative px-8 py-4 bg-slate-700 text-white font-bold rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:bg-slate-600 border-2 border-slate-500"
              type="button"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-xl">↩️</span>
                <span>Second Opinion (Go Back)</span>
              </span>
            </button>
          </div>

          {/* Footer disclaimer */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-xs text-slate-500 text-center font-mono">
              * This is not real medical advice. For actual 404 errors, please
              consult your IT department.
              <br />
              No pages were harmed in the making of this error.
            </p>
          </div>
        </div>
      </div>

      {/* Inline Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam&display=swap');
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(5deg);
          }
          66% {
            transform: translateY(-10px) rotate(-5deg);
          }
        }
        
        .font-cursive {
          font-family: 'Kalam', cursive;
        }
        
        .heartbeat-line {
          animation: heartbeat-scroll 2s linear infinite;
        }
        
        @keyframes heartbeat-scroll {
          0% {
            transform: translateX(-400px);
          }
          100% {
            transform: translateX(0px);
          }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
