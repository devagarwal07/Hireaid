// src/components/Topbar.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationDropdown from "@/components/ui/NotificationDropdown";

type Props = {
  userName?: string;
  initials?: string;
  fullName?: string;
  role?: string;
  notificationsCount?: number;
  onNotifications?: () => void;
  onProfile?: () => void;
};

export default function Topbar({
  userName = "John",
  initials = "JD",
  fullName,
  role = "Superadmin",
  notificationsCount = 9,
  onNotifications,
  onProfile,
}: Props) {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleToggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    onNotifications?.();
  };

  const handleProfileClick = () => {
    navigate("/companies");
    onProfile?.();
  };

  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening";
  const greeting = `Good ${timeOfDay}, ${userName}`;

  const displayName = fullName ?? `${userName} Doe`;

  return (
    <div className="w-full px-6 pt-5 pb-4">
      <div className="flex items-center justify-between rounded-2xl bg-white shadow-card px-6 py-4">
        <div className="text-lg font-medium text-text-primary">{greeting}</div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <button
              type="button"
              onClick={handleToggleNotifications}
              aria-label="notifications"
              className="relative p-2 rounded-full hover:bg-primary-light text-text-muted transition-colors duration-200"
            >
              {/* bell icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.6 14.2V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.2c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0h6z"
                />
              </svg>

              {/* unread badge */}
              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-0.5 flex h-4 min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
                  {notificationsCount > 9 ? "9+" : notificationsCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 z-20">
                <NotificationDropdown />
              </div>
            )}
          </div>

          <button
            onClick={handleProfileClick}
            className="flex items-center gap-3 rounded-full px-3 py-1.5 hover:bg-primary-light cursor-pointer transition-colors duration-200"
            type="button"
          >
            <div className="w-9 h-9 rounded-full bg-primary overflow-hidden flex items-center justify-center text-sm font-semibold text-white">
              {initials}
            </div>

            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-text-primary">{displayName}</span>
              <span className="text-xs text-text-muted">{role}</span>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-text-muted"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
