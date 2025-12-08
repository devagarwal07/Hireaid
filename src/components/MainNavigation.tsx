import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Briefcase, Video, User, ChevronRight, ChevronLeft } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard style={{ width: '16px', height: '16px' }} />, path: "/job-dashboard" },
  { id: "jobs", label: "Jobs", icon: <Briefcase style={{ width: '18px', height: '18px' }} />, path: "/job-dashboard" },
  { id: "interviews", label: "Interviews", icon: <Video style={{ width: '18px', height: '18px' }} />, path: "/interview" },
  { id: "candidates", label: "Candidates", icon: <User style={{ width: '18px', height: '18px' }} />, path: "/job-dashboard" },
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

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#f5f8ff,_#ffffff)] flex">
      {/* Collapsed Sidebar - Only left sidebar, always visible */}
      <aside 
        className="flex flex-col items-center flex-shrink-0"
        style={{
          width: '80px',
          minHeight: '100vh',
          background: '#FFFFFF',
          boxShadow: '0px 4px 7.2px rgba(0, 0, 0, 0.12)',
          borderRadius: '0px 16px 16px 0px',
          position: 'relative',
          padding: '20px 0',
        }}
      >
          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsNavExpanded(!isNavExpanded)}
            style={{
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '8px',
              marginBottom: '12px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F5F5F5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
            aria-label={isNavExpanded ? "Collapse navigation" : "Expand navigation"}
          >
            {isNavExpanded ? (
              <ChevronLeft style={{ width: '24px', height: '24px', color: '#424242' }} />
            ) : (
              <ChevronRight style={{ width: '24px', height: '24px', color: '#424242' }} />
            )}
          </button>

          {/* Navigation Icons Container */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0px 16px',
              gap: '12px',
              flex: 1,
            }}
          >
            {/* Dashboard - Active state: #E4ECFF background, #0857A1 icon */}
            <button
              onClick={() => handleNavClick(navItems[0].path)}
              onMouseEnter={() => setHoveredItem(navItems[0].id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '12px 8px',
                gap: '12px',
                width: '48px',
                height: '48px',
                background: activeId === 'dashboard' ? '#E4ECFF' : hoveredItem === navItems[0].id ? '#EDF2FF' : '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
                flex: 'none',
                alignSelf: 'stretch',
              }}
              aria-label={navItems[0].label}
            >
              <div style={{ 
                width: '16px', 
                height: '16px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: activeId === 'dashboard' ? '#0857A1' : '#424242',
              }}>
                <LayoutDashboard style={{ width: '16px', height: '16px', color: activeId === 'dashboard' ? '#0857A1' : '#424242' }} />
              </div>
            </button>

            {/* Jobs - Default state: #FFFFFF background, #424242 icon */}
            <button
              onClick={() => handleNavClick(navItems[1].path)}
              onMouseEnter={() => setHoveredItem(navItems[1].id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '12px 8px',
                gap: '12px',
                width: '48px',
                height: '48px',
                background: activeId === 'jobs' ? '#E4ECFF' : hoveredItem === navItems[1].id ? '#EDF2FF' : '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
                flex: 'none',
              }}
              aria-label={navItems[1].label}
            >
              <div style={{ 
                width: '18px', 
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: activeId === 'jobs' ? '#0857A1' : '#424242',
              }}>
                <Briefcase style={{ width: '18px', height: '18px', color: activeId === 'jobs' ? '#0857A1' : '#424242' }} />
              </div>
            </button>

            {/* Interviews - Hover/Active state: #EDF2FF background */}
            <button
              onClick={() => handleNavClick(navItems[2].path)}
              onMouseEnter={() => setHoveredItem(navItems[2].id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '6px 0px',
                gap: '12px',
                width: '48px',
                height: '48px',
                background: activeId === 'interviews' ? '#E4ECFF' : hoveredItem === navItems[2].id ? '#EDF2FF' : '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
                flex: 'none',
              }}
              aria-label={navItems[2].label}
            >
              <div style={{ 
                width: '18px', 
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: activeId === 'interviews' ? '#0857A1' : '#424242',
              }}>
                <Video style={{ width: '18px', height: '18px', color: activeId === 'interviews' ? '#0857A1' : '#424242' }} />
              </div>
            </button>

            {/* Candidates - Default state */}
            <button
              onClick={() => handleNavClick(navItems[3].path)}
              onMouseEnter={() => setHoveredItem(navItems[3].id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '6px 0px',
                gap: '12px',
                width: '48px',
                height: '48px',
                background: activeId === 'candidates' ? '#E4ECFF' : hoveredItem === navItems[3].id ? '#EDF2FF' : 'transparent',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
                flex: 'none',
              }}
              aria-label={navItems[3].label}
            >
              <div style={{ 
                width: '18px', 
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: activeId === 'candidates' ? '#0857A1' : '#424242',
              }}>
                <User style={{ width: '18px', height: '18px', color: activeId === 'candidates' ? '#0857A1' : '#424242' }} />
              </div>
            </button>
          </div>
      </aside>

      {/* Expanded Menu Panel - Shows when expanded */}
      {isNavExpanded && (
        <div
          style={{
            width: '334px',
            minHeight: '100vh',
            background: '#FFFFFF',
            boxShadow: '0px 4px 7.2px rgba(0, 0, 0, 0.12)',
            borderRadius: '16px',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginLeft: '20px',
          }}
        >
          {/* Logo */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ 
              fontFamily: 'Poppins, sans-serif',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              <span>H</span>
              <span>I</span>
              <span>R</span>
              <svg
                style={{ width: '28px', height: '28px' }}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="#2DD4BD" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2">
                  <line x1="12" y1="2" x2="12" y2="4" />
                  <line x1="8.5" y1="3.5" x2="9.5" y2="5" />
                  <line x1="15.5" y1="3.5" x2="14.5" y2="5" />
                </g>
                <circle cx="12" cy="7" r="3" fill="#2DD4BD" />
                <path d="M8 14c0-2.21 1.79-4 4-4s4 1.79 4 4v6H8v-6z" fill="#2DD4BD" />
                <path d="M5 10l3-2 2 2M19 10l-3-2-2 2" stroke="#2DD4BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span style={{ color: '#2DD4BD' }}>A</span>
              <span style={{ color: '#2DD4BD' }}>I</span>
              <span>D</span>
              <span>E</span>
            </div>
            <p style={{ 
              fontSize: '12px', 
              color: '#666666', 
              marginTop: '4px',
              fontFamily: 'Poppins, sans-serif',
            }}>
              POWERED BY AI, GUIDED BY PEOPLE
            </p>
          </div>

          {/* Navigation Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
            {navItems.map((item) => {
              const isActive = item.id === activeId;
              const isHovered = hoveredItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '12px 16px',
                    gap: '12px',
                    width: '100%',
                    height: '48px',
                    background: isActive ? '#E4ECFF' : isHovered ? '#EDF2FF' : 'transparent',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  <div style={{ 
                    width: item.id === 'dashboard' ? '16px' : '18px', 
                    height: item.id === 'dashboard' ? '16px' : '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? '#0857A1' : '#424242',
                  }}>
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: isActive ? 500 : 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: isActive ? '#0857A1' : '#424242',
                      flexGrow: 1,
                      textAlign: 'left',
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

