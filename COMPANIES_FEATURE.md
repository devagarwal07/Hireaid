# Companies List Feature

## Overview
A new Companies List page has been added to the Hireaid application, allowing users to view and manage all onboarded companies.

## Files Created

### 1. Context Layer
- **`src/context/CompanyContext.tsx`**: Global state management for companies
  - Provides CRUD operations (add, remove, update)
  - Contains 10 sample companies with realistic data
  - Company interface with fields: id, companyName, adminName, designation, email, creationDate, status

### 2. Components
- **`src/components/CompaniesList.tsx`**: Main companies list page with table view
  - Displays all companies in a professional table format
  - Includes search functionality (searches across company name, admin name, and email)
  - Status filter (all, active, inactive, pending)
  - Pagination (10 items per page with Previous/Next buttons)
  - Three-dot menu icon that navigates to company details page
  
- **`src/components/CompanyDetails.tsx`**: Company details page
  - Shows detailed information for a selected company
  - Back navigation to companies list
  - Status badge with color coding

### 3. Routes
Updated `src/App.tsx` with:
- `/companies` - Companies list page
- `/company/:id` - Individual company details page
- Wrapped app in `CompanyProvider` for global state access

### 4. Navigation
Updated `src/components/MainNavigation.tsx`:
- Added "Companies" navigation item in the sidebar
- Active state detection for companies routes
- Uses existing work icon for consistency

## Features

### Table Columns
1. Sr. No. - Sequential numbering
2. Company Name - Main identifier
3. Company Admin Name - Primary contact person
4. Designation - Admin's role/title
5. Email Address - Contact email
6. Creation Date - When company was onboarded
7. Status - Active/Inactive/Pending with color-coded badges
8. Actions - Three-dot menu icon for navigation

### UI Elements
- **Header Bar**: "Companies List" title with "Create Account" button (plus icon)
- **Search Bar**: Real-time search across company name, admin name, and email
- **Filter Button**: Dropdown menu for status filtering
- **Pagination**: "Page X of Y" with Previous/Next buttons
- **Table**: Clean, responsive design with hover states

### Status Colors
- **Active**: Green badge
- **Inactive**: Red badge
- **Pending**: Yellow badge

## Sample Data
10 pre-populated companies with diverse industries and realistic information:
- TechCorp Solutions
- Innovate Labs
- Digital Dynamics
- NextGen Enterprises
- CloudWorks Inc
- Smart Systems Ltd
- Fusion Technologies
- Alpha Industries
- Quantum Solutions
- Vertex Group

## Navigation Flow
1. Main Navigation → Companies
2. Companies List → Click 3-dot icon → Company Details
3. Company Details → Back button → Companies List
4. Header → Create Account button → `/company/create` (to be implemented)

## Technology Stack
- React + TypeScript
- React Router v7 for navigation
- Tailwind CSS for styling
- Context API for state management
- Reusable Button component from existing design system

## Future Enhancements
- Company creation form (`/company/create`)
- Edit company functionality
- Delete/archive companies
- Export companies list to CSV
- Advanced filtering options
- Sorting by different columns
- Company statistics dashboard
