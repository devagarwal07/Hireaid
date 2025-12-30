import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Topbar from "@/components/Topbar";

// Import SVG icons from assets
import CloseSrc from "@/assets/icons/sidebar_close.svg";
import DashboardSrc from "@/assets/icons/sidebar_dashboard.svg";
import WorkSrc from "@/assets/icons/sidebar_work.svg";
import InterviewSrc from "@/assets/icons/sidebar_interview.svg";
import CameraSrc from "@/assets/icons/sidebar_camera.svg";
import ProfileSrc from "@/assets/icons/sidebar_profile.svg";
import HiraideLogo from "@/assets/icons/hireaid.svg";

interface NavItem {
  id: string;
  label: string;
  iconSrc: string;
  path: string;
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    iconSrc: DashboardSrc,
    path: "/job-dashboard",
  },
  {
    id: "jobs",
    label: "Jobs",
    iconSrc: WorkSrc,
    path: "/job-dashboard",
  },
  {
    id: "interviews",
    label: "Interviews",
    iconSrc: InterviewSrc,
    path: "/interview",
  },
  {
    id: "candidates",
    label: "Candidates",
    iconSrc: ProfileSrc,
    path: "/companies",
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
    if (location.pathname === "/companies" || location.pathname.startsWith("/company")) {
      return "companies";
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

  // Icon sizes - interviews and candidates icons are larger
  const getIconSize = (itemId: string) => {
    if (itemId === "interviews" || itemId === "candidates") {
      return 24; // Larger size for interview and profile icons
    }
    return 15; // Default size for other icons
  };

  const renderCollapsedItem = (item: NavItem) => {
    const isActive = item.id === activeId;
    const isHovered = hoveredItem === item.id;

    const background = isActive
      ? "#E4ECFF"
      : isHovered
        ? "#EDF2FF"
        : "#FFFFFF";

    const iconSize = getIconSize(item.id);

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
        <img
          src={item.iconSrc}
          alt={item.label}
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            objectFit: "contain",
            filter: isActive ? "none" : "grayscale(1) brightness(0.55)",
            opacity: isActive ? 1 : 0.7,
            transition: "filter 0.2s, opacity 0.2s",
          }}
        />
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-page-bg flex">
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
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            padding: "24px 0",
            gap: "12px",
            zIndex: 1000,
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
            <img src={CloseSrc} alt="Menu" style={{ width: "24px", height: "24px" }} />
          </button>

          {/* AI assistant icon in collapsed rail */}
          <button
            style={{
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              borderRadius: "12px",
              marginBottom: "8px",
            }}
            aria-label="AI assistant"
          >
            <img src={CameraSrc} alt="AI Assistant" style={{ width: "17px", height: "17px" }} />
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
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 1000,
            gap: "12px",
            marginLeft: "16px",
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
              <img src={HiraideLogo} alt="HIRAIDE" style={{ width: "180px", height: "auto" }} />

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
              <img
                src={CloseSrc}
                alt="Close"
                style={{ width: "24px", height: "24px", transform: "scaleX(-1)" }}
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

              const iconSize = getIconSize(item.id);

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
                      minWidth: "24px",
                      minHeight: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={item.iconSrc}
                      alt={item.label}
                      style={{
                        width: `${iconSize}px`,
                        height: `${iconSize}px`,
                        objectFit: "contain",
                        filter: isActive ? "none" : "grayscale(1) brightness(0.55)",
                        opacity: isActive ? 1 : 0.7,
                        transition: "filter 0.2s, opacity 0.2s",
                      }}
                    />
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
      <div
        className="flex-1 overflow-auto min-h-0 w-full flex flex-col"
        style={{
          marginLeft: isNavExpanded ? "366px" : "80px",
          transition: "margin-left 0.3s ease"
        }}
      >
        {/* Global Topbar */}
        <Topbar />

        {/* Page Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

