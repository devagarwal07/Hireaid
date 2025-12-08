import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdViewSidebar,
  MdDashboardCustomize,
  MdWorkOutline,
  MdVideoCall,
  MdPersonOutline,
  MdEmojiPeople,
} from "react-icons/md";

interface NavItem {
  id: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  path: string;
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    Icon: MdDashboardCustomize,
    path: "/job-dashboard",
  },
  {
    id: "jobs",
    label: "Jobs",
    Icon: MdWorkOutline,
    path: "/job-dashboard",
  },
  {
    id: "interviews",
    label: "Interviews",
    Icon: MdVideoCall,
    path: "/interview",
  },
  {
    id: "candidates",
    label: "Candidates",
    Icon: MdPersonOutline,
    path: "/job-dashboard",
  },
];


export default function MainNavigation({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Determine active route based on current path
  const getActiveId = (): string => {
    if (location.pathname === "/interview" || location.pathname.startsWith("/interview")) {
      return "interviews";
    }
    if (location.pathname === "/job-dashboard" || location.pathname.startsWith("/job")) {
      return "dashboard";
    }
    return "dashboard";
  };

  const activeId = getActiveId();

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const renderCollapsedItem = (item: NavItem) => {
    const isActive = item.id === activeId;
    const isHovered = hoveredItem === item.id;

    const background = isActive
      ? "#E4ECFF"
      : isHovered
      ? "#EDF2FF"
      : "#FFFFFF";

    const iconColor = isActive ? "#0857A1" : "#424242";
    const iconSize = item.id === "dashboard" ? 16 : 18;

    return (
      <button
        key={item.id}
        onClick={() => handleNavClick(item.path)}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "12px 8px",
          gap: "12px",
          width: "48px",
          height: "48px",
          background,
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          transition: "background 0.2s",
          flex: "none",
          alignSelf: "stretch",
        }}
        aria-label={item.label}
      >
        <div
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: iconColor,
          }}
        >
          <item.Icon size={iconSize} color={iconColor} />
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#f5f8ff,_#ffffff)] flex">
      {/* Collapsed Sidebar - shown only when not expanded */}
      {!isNavExpanded && (
        <aside
          className="flex flex-col items-center flex-shrink-0"
          style={{
            width: "80px",
            minHeight: "100vh",
            background: "#FFFFFF",
            boxShadow: "0px 4px 7.2px rgba(0, 0, 0, 0.12)",
            borderRadius: "0px 16px 16px 0px",
            position: "relative",
            padding: "24px 0",
            gap: "12px",
          }}
        >
          <button
            onClick={() => setIsNavExpanded(true)}
            style={{
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              borderRadius: "8px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F5F5F5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
            aria-label="Expand navigation"
          >
            <MdViewSidebar size={24} color="#424242" />
          </button>

          {/* AI assistant icon in collapsed rail */}
          <button
            style={{
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#E0FFF8",
              border: "none",
              cursor: "pointer",
              borderRadius: "12px",
              marginBottom: "8px",
            }}
            aria-label="AI assistant"
          >
            <MdEmojiPeople size={24} color="#2DD4BD" />
          </button>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px 16px",
              gap: "12px",
              flex: 1,
            }}
          >
            {navItems.map((item) => renderCollapsedItem(item))}
          </div>
        </aside>
      )}

      {/* Expanded Menu Panel - Shows when expanded */}
      {isNavExpanded && (
        <div
          style={{
            width: "334px",
            minHeight: "100vh",
            background: "#FFFFFF",
            boxShadow: "0px 4px 7.2px rgba(0, 0, 0, 0.12)",
            borderRadius: "16px",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginLeft: "16px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>H</span>
                <span>I</span>
                <span>R</span>
                <svg
                  style={{ width: "28px", height: "28px" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    stroke="#2DD4BD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="2 2"
                  >
                    <line x1="12" y1="2" x2="12" y2="4" />
                    <line x1="8.5" y1="3.5" x2="9.5" y2="5" />
                    <line x1="15.5" y1="3.5" x2="14.5" y2="5" />
                  </g>
                  <circle cx="12" cy="7" r="3" fill="#2DD4BD" />
                  <path
                    d="M8 14c0-2.21 1.79-4 4-4s4 1.79 4 4v6H8v-6z"
                    fill="#2DD4BD"
                  />
                  <path
                    d="M5 10l3-2 2 2M19 10l-3-2-2 2"
                    stroke="#2DD4BD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <span style={{ color: "#2DD4BD" }}>A</span>
                <span style={{ color: "#2DD4BD" }}>I</span>
                <span>D</span>
                <span>E</span>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#666666",
                  marginTop: "4px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                POWERED BY AI, GUIDED BY PEOPLE
              </p>
            </div>

            <button
              onClick={() => setIsNavExpanded(false)}
              style={{
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                borderRadius: "8px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F5F5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
              aria-label="Collapse navigation"
            >
              <MdViewSidebar
                size={24}
                color="#424242"
                style={{ transform: "scaleX(-1)" }}
              />
            </button>
          </div>

          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: "8px",
            }}
          >
            {navItems.map((item) => {
              const isActive = item.id === activeId;
              const isHovered = hoveredItem === item.id;

              const background = isActive
                ? "#E4ECFF"
                : isHovered
                ? "#EDF2FF"
                : "#FFFFFF";

              const iconColor = isActive ? "#0857A1" : "#424242";
              const iconSize = item.id === "dashboard" ? 16 : 18;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: "12px 16px",
                    gap: "12px",
                    width: "100%",
                    height: "48px",
                    background,
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: `${iconSize}px`,
                      height: `${iconSize}px`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: iconColor,
                    }}
                  >
                    <item.Icon size={iconSize} color={iconColor} />
                  </div>
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontStyle: "normal",
                      fontWeight: isActive ? 500 : 400,
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: isActive ? "#0857A1" : "#424242",
                      flexGrow: 1,
                      textAlign: "left",
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Page Content - Full width after sidebar */}
      <div className="flex-1 overflow-auto min-h-0 w-full">{children}</div>
    </div>
  );
}

