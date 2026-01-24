import { Bell, Menu, X, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { usePatientNotificationSocket } from "../../../hooks/patient/notification/usePatientNotifcation";
import { fetchNotificationsPatientApi } from "../../../api/apiService/patient/notification";
// import { usePatientNotificationSocket } from "../../hooks/socket/usePatientNotificationSocket";
// import { fetchNotifications } from "../../api/notification.api";

interface PatientNavbarProps {
  onMenuToggle: () => void;
  userId: string;
}

interface Notification {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
}

const PatientNavbar = ({ onMenuToggle, userId }: PatientNavbarProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);

  // Initial fetch
  useEffect(() => {
    fetchNotificationsPatientApi().then((data) => {
      setNotifications(data);
      setUnread(data.length);
    });
  }, []);

  // 2️ Realtime socket notifications
  usePatientNotificationSocket(userId, (notification) => {
    setNotifications((prev) => [notification, ...prev]);
    setUnread((prev) => prev + 1);
  });

  const clearNotifications = () => {
    setNotifications([]);
    setUnread(0);
    // Optional: API call to mark all as read
    // await fetch("/api/patient/notifications/clear", { method: "POST" })
  };

  return (
    <>
      {/* Navbar */}
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
          onClick={() => {
            setShowNotifications(true);
            setUnread(0);
          }}
          className="relative p-2 hover:bg-gray-100 rounded-lg"
        >
          <Bell className="w-6 h-6 text-gray-700" />
          {unread > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>
      </header>

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold">Notifications</h3>
              <div className="flex gap-2">
                <button
                  onClick={clearNotifications}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  title="Clear all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-4 text-sm text-gray-500 text-center">
                  No notifications
                </p>
              ) : (
                notifications.map((n) => (
                  <div key={n._id} className="p-4 border-b hover:bg-gray-50">
                    <p className="text-sm font-medium text-gray-900">
                      {n.title}
                    </p>
                    <p className="text-sm text-gray-700">{n.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientNavbar;
