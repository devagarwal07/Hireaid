import CloseSrc from "@/assets/icons/sidebar_close.svg";
import InterviewSrc from "@/assets/icons/sidebar_interview.svg";
import DashboardSrc from "@/assets/icons/sidebar_dashboard.svg";
import WorkSrc from "@/assets/icons/sidebar_work.svg";
import CameraSrc from "@/assets/icons/sidebar_camera.svg";
import ProfileSrc from "@/assets/icons/sidebar_profile.svg";

type SidebarItem = { id: string; label?: string; src: string };

const ITEMS: SidebarItem[] = [
  { id: "close", label: "Close", src: CloseSrc },
  { id: "interview", label: "Interview", src: InterviewSrc },
  { id: "dashboard", label: "Dashboard", src: DashboardSrc },
  { id: "work", label: "Work", src: WorkSrc },
  { id: "camera", label: "Camera", src: CameraSrc },
  { id: "profile", label: "Profile", src: ProfileSrc },
];

export default function Sidebar({
  active = "interview",
  className = "",
  onSelect
}: {
  active?: string;
  className?: string;
  onSelect?: (id: string) => void;
}) {
  const navigate = (id: string) => {
    if (onSelect) {
      onSelect(id);
    }
    if (id === "close") window.location.href = "/";
    if (id === "interview") window.location.href = "/interview";
    if (id === "dashboard") window.location.href = "/job-dashboard";
  };

  return (
    <aside className={`flex-shrink-0 h-[calc(100vh-48px)] sticky top-6 w-20 rounded-3xl ${className}`}>
      <div className="h-full w-full rounded-3xl bg-white shadow-inner flex flex-col items-center py-6 gap-6">
        <div className="h-2 w-full" />

        {ITEMS.map((it) => {
          const isActive = it.id === active;

          return (
            <button
              key={it.id}
              onClick={() => navigate(it.id)}
              className="relative flex items-center justify-center w-12 h-12 rounded-xl"
              aria-label={it.label}
              title={it.label}
            >
              {/* Rounded square background */}
              <div
                className={`absolute inset-0 rounded-xl transition-colors ${isActive ? "bg-teal-100" : "bg-sky-100/25 hover:bg-sky-100/40"
                  }`}
              />

              <img
                src={it.src}
                alt={it.label}
                className={`${it.id === "interview" || it.id === "profile" ? "w-7 h-7" : "w-5 h-5"
                  } object-contain z-10 transition-opacity ${isActive ? "opacity-100" : "opacity-70"
                  }`}
                style={{
                  filter: isActive ? "saturate(1) brightness(1)" : "grayscale(1) brightness(0.55)",
                }}
              />

              {/* left active bar */}
              {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 h-6 w-0.5 bg-teal-500 rounded" />}
            </button>
          );
        })}

        <div className="flex-1" />
      </div>
    </aside>
  );
}
