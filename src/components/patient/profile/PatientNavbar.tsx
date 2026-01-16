import { Bell, Menu, X } from "lucide-react";
import { useState } from "react";

interface PatientNavbarProps {
  onMenuToggle: () => void;
}

const PatientNavbar = ({ onMenuToggle }: PatientNavbarProps) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: "Appointment reminder for tomorrow", time: "2h ago" },
    { id: 2, message: "New message from Dr. Smith", time: "5h ago" },
    { id: 3, message: "Lab results are ready", time: "1d ago" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-40 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Your Profile</h1>
        </div>

        <button
          onClick={() => setShowNotifications(true)}
          className="relative p-2 hover:bg-gray-100 rounded-lg"
        >
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </header>

      {/* Notifications Modal (Desktop + Mobile) */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold">Notifications</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                >
                  <p className="text-sm text-gray-900">{n.message}</p>
                  <p className="text-xs text-gray-500">{n.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientNavbar;
