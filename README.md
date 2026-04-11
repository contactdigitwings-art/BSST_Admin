# NGO Management System

A full-stack web application for managing NGO operations, member registrations, donations, and crowdfunding campaigns. Built with React, TypeScript, Express, and PostgreSQL.

## Features

### Member Management
- **Member Registration & Verification**: Members can apply for membership, admins can verify and assign roles
- **Role Assignment**: Admin can define custom positions/roles for verified members (defaults to "member")
- **Member Profiles**: Comprehensive member information including contact details, project areas, and status tracking
- **ID Cards**: Auto-generated membership ID cards with member details and position
- **Appointment Letters**: Official appointment letters with position information
- **80G Certificates**: Tax exemption certificates for donations

### Admin Dashboard
- **Pending Applications**: View and process pending membership applications
- **Member Database**: Manage verified and blocked members
- **Role Management**: Assign positions/roles during member verification
- **Statistics**: View key NGO metrics and member statistics
- **Search & Filter**: Quick search by name, email, or registration number

### Donation Management
- **Donation Tracking**: Record and manage all donations
- **Crowdfunding Campaigns**: Create and manage fundraising campaigns
- **Campaign Analytics**: Track fundraising progress and goals
- **Donor Information**: Maintain donor records with PAN card details

### Document Generation
- **ID Cards**: Professional membership ID cards
- **Appointment Letters**: Formatted appointment documentation
- **Certificates**: 80G tax certificates for donors and members
- **Downloadable PDFs**: Export documents as images/PDFs

## Tech Stack

### Frontend
- React 18+ with TypeScript
- Vite for bundling
- Tailwind CSS for styling
- shadcn/ui for components
- React Query for state management
- Zod for validation

### Backend
- Express.js
- PostgreSQL with Drizzle ORM
- Session-based authentication
- bcrypt for password hashing

### DevTools
- TypeScript
- ESLint
- Nodemon for development

## Project Structure
