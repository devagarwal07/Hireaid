# Hireaid AI Coding Agent Instructions

## Project Overview

Hireaid is a React + TypeScript + Vite application for managing hiring workflows. The app has three main areas:

- **Interview Screen** (`/interview`): Real-time interview interface with AI assistant, screen sharing, and candidate evaluation
- **Job Dashboard** (`/job-dashboard`): Job listing and management
- **Job Form** (`/job-form`): Multi-step job creation wizard with hiring pipeline configuration

## Architecture Patterns

### Context-Driven State Management

Two React Contexts manage global state:

- `AppContext` (`src/context/AppContext.tsx`): User session and current interview metadata (candidate name, role, scheduled time)
- `JobContext` (`src/context/JobContext.tsx`): Job CRUD operations with in-memory sample data

**Pattern**: Wrap App in `BrowserRouter` → `AppProvider` → `JobProvider` (see `src/main.tsx`). Access via custom hooks `useAppContext()` and `useJobs()`.

### Component Organization

```
src/components/
├── [Page-level components]          # Top-level UI (MainNavigation, InterviewUI, Button, Header)
├── interview_screen/                # Interview-specific features (modals, panels, cards)
├── Job_Form/                        # Multi-step job creation wizard components
├── job_details/                     # Job listing and scheduling
└── ui/                              # Shared UI primitives (Breadcrumb, PageHeader, NotificationBanner)
```

**Convention**: Feature-based folders (lowercase with underscores) contain related components. Export interfaces at the top of files when shared across components.

### Routing and Navigation

- Main routes defined in `App.tsx` with React Router v7
- `MainNavigation` component provides persistent left sidebar (collapsed by default, expandable on hover)
- Navigation items use SVG icons imported as URL strings: `import IconSrc from "@/assets/icons/icon.svg"`
- Active route detection via `useLocation()` pathname matching

### Type Definitions

**Pattern**: Co-locate types with components using `interface` for component props and `type` for unions/discriminated unions:

```typescript
// Component props
interface MyComponentProps {
  onSave: (data: FormData) => void;
  title: string;
}

// State types
type FormStep = "job-description" | "hiring-pipeline" | "preview";
type ButtonVariant = "primary" | "secondary" | "tertiary";
```

**Data Models**: Export from context files (e.g., `Job` interface in `JobContext.tsx`, `Candidate` type in `InterviewHeader.tsx`)

## Styling Approach

### Design System (IMPORTANT)

The application uses a centralized design system defined in:
- **`src/styles/variables.css`**: All CSS custom properties (design tokens)
- **`src/styles/global.css`**: Global styles and utility classes
- **`tailwind.config.js`**: Extended Tailwind classes matching the design system

**ALWAYS use design system tokens instead of hardcoded values:**

```tsx
// ✅ CORRECT - Use Tailwind classes with design tokens
<div className="min-h-screen bg-page-bg">  // Page background
<button className="bg-primary hover:bg-primary-hover text-white"> // Primary button
<p className="text-text-primary">  // Primary text color
<p className="text-text-secondary">  // Secondary text color
<div className="shadow-card rounded-2xl">  // Card styling

// ❌ WRONG - Don't hardcode colors
<div className="bg-[#F0F4FF]">  // Use bg-page-bg instead
<button className="bg-[#0857A1]">  // Use bg-primary instead
<p className="text-[#181D27]">  // Use text-text-primary instead
```

### Available Tailwind Design Tokens

**Colors:**
- `bg-page-bg` - Page background (#F0F4FF)
- `bg-primary`, `bg-primary-hover`, `bg-primary-light` - Primary colors
- `text-text-primary` - Main text (#181D27)
- `text-text-secondary` - Secondary text (#626262)
- `text-text-muted` - Muted text (#717171)
- `border-border-light`, `border-border-default` - Border colors

**Shadows:**
- `shadow-card` - Standard card shadow
- `shadow-sidebar` - Sidebar shadow

### Typography

**Font**: Poppins is the default font (loaded via Google Fonts in global.css). No need to specify `font-['Poppins']` as it's inherited globally.

**Font weights**: Use Tailwind classes `font-normal`, `font-medium`, `font-semibold`, `font-bold`

### CSS Variables (for inline styles when needed)

```tsx
// When Tailwind classes aren't sufficient, use CSS variables
<div style={{ background: 'var(--color-primary)' }}>
<div style={{ boxShadow: 'var(--shadow-card)' }}>
```

### Design System Colors Reference

- Primary: `#0857A1` (buttons, links, accents)
- Primary Hover: `#176CBA`
- Page Background: `#F0F4FF` (use everywhere)
- Card Background: `#FFFFFF`
- Text Primary: `#181D27`
- Text Secondary: `#626262`
- Text Muted: `#717171`
- Border Light: `#E5E5E5`
- Border Default: `#D1D5DB`

## Key Development Workflows

### SVG Icon Usage

Icons live in `src/assets/icons/` and are imported two ways:

1. **As URL strings**: `import IconSrc from "@/assets/icons/icon.svg"` → use in `<img src={IconSrc} />`
2. **As React components** (via vite-plugin-svgr): `import Icon from "@/assets/icons/icon.svg?react"` → use as `<Icon />`

Type definitions in `src/types/svg.d.ts` enable both patterns.

### Multi-Step Forms Pattern

Job creation uses a wizard with step tracking (see `JobFormLayoutNew.tsx`):

- Track current step: `useState<FormStep>("job-description")`
- Consolidate form data in single state object
- Pass `formData` and `setFormData` to step components
- Validate and navigate: `setCurrentStep("next-step")`

### Modal Patterns

Multiple interview modals follow a consistent pattern:

- Props: `isOpen: boolean`, `onClose: () => void`, plus specific handlers
- Mount conditionally: `{showModal && <Modal isOpen={showModal} onClose={...} />}`
- Overlay with `position: fixed`, full viewport coverage
- Examples: `DisclaimerModal`, `EndInterviewModal`, `ConfirmationModal`

## Build & Development

### Commands

```bash
npm run dev      # Start Vite dev server (HMR enabled)
npm run build    # TypeScript compile + Vite build → dist/
npm run lint     # ESLint check
npm run preview  # Preview production build locally
```

### Path Aliases

`@` resolves to `./src` (configured in `vite.config.ts` and `tsconfig.app.json`). Always use `@/` imports:

```typescript
import { useAppContext } from "@/context/AppContext";
import Button from "@/components/Button";
```

### Empty Utility Files

`src/lib/api.ts`, `src/hooks/useAuth.ts`, `src/hooks/useFetch.ts`, `src/utils/constants.ts` exist but are **empty placeholders**. Do not reference them until implemented.

## Component Conventions

### Button Component

Custom `Button` component (`src/components/Button.tsx`) wraps native `<button>` with variants and sizes:

**Variants:**
- `primary`: Primary color background, white text
- `secondary`: Gray background, dark text
- `tertiary`: Transparent background, primary text

**Sizes:**
- `sm`: Small (32px height)
- `md`: Medium (40px height, default)
- `lg`: Large (48px height)

```tsx
<Button variant="primary" size="md" onClick={handleSave}>Save</Button>
```

Usage: `<Button variant="primary" onClick={handleSave}>Save</Button>`

### PageHeader Component

Reusable header with breadcrumbs, title, and action buttons. Can be configured per-route or passed explicit config:

```tsx
<PageHeader
  config={{
    breadcrumbs: [{ label: "Jobs", path: "/jobs" }, { label: "New Job" }],
    title: "Create Job",
    buttons: [
      {
        label: "Save",
        icon: <SaveIcon />,
        variant: "primary",
        onClick: handleSave,
      },
    ],
  }}
/>
```

### Interview Workflow

1. User clicks "Start Interview" → checks `hasAcceptedDisclaimer`
2. If not accepted, shows `DisclaimerModal`
3. On accept, renders `AssistantPanel` (tabbed: AI Assistant, Notes, Live Transcript)
4. Screen share can overlay entire interface (including topbar)
5. Step-based progression with `Submit`/`Next`/`Save` button logic
6. Final step navigates to `/interview-prep-dashboard`

## Testing & Validation

- No test framework configured (focus on manual testing via dev server)
- ESLint enforces React hooks rules and type safety
- Build validation: `npm run build` must complete without TypeScript errors

## Common Pitfalls

- Don't import from empty utility files (`api.ts`, `useAuth.ts`, etc.)
- SVG imports need explicit path: `@/assets/icons/name.svg` (no default location)
- Context hooks (`useAppContext`, `useJobs`) will error if used outside provider tree
- Tailwind classes must be in `content` paths (currently includes `src/**/*.{js,ts,jsx,tsx}`)
- Modal overlays need `z-index` management for layering (screen share is highest priority)
