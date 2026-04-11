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

Here's a comprehensive README template for your NGO Management System:

Ngo-System/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page components
│ │ ├── hooks/ # Custom React hooks
│ │ ├── lib/ # Utilities
│ │ └── App.tsx
│ └── index.html
├── server/ # Express backend
│ ├── index.ts # Server entry
│ ├── routes.ts # API routes
│ ├── storage.ts # Database operations
│ ├── db.ts # Database config
│ └── vite.ts # Static file serving
├── shared/ # Shared code
│ ├── schema.ts # Database schema
│ └── routes.ts # API route definitions
├── migrations/ # Database migrations
├── package.json
├── tsconfig.json
├── vite.config.ts
└── drizzle.config.ts


## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/Ngo-System.git
cd Ngo-System
npm install
cp .env.example .env
# Edit .env with your database credentials and configuration
npm run dev
The application will be available at http://localhost:5000

Available Scripts
npm run dev - Start development server
npm run build - Build for production
npm start - Run production build
npm run migrate - Run database migrations
npm run lint - Run ESLint
API Endpoints
Authentication
POST /api/login - User login
POST /api/register - User registration
GET /api/me - Get current user
POST /api/logout - User logout
Members
GET /api/members - List all members (admin)
GET /api/members/me - Get current user's member profile
POST /api/members/apply - Apply for membership
PATCH /api/members/:id/status - Update member status and position (admin)
Donations
POST /api/donations - Create donation record
GET /api/donations - List donations (admin)
Admin
GET /api/admin/stats - Get admin statistics
Member Status States
pending: Awaiting admin verification
verified: Approved member
blocked: Rejected or suspended member
Database Schema
Users
id, email, password, role, name
Members
id, userId, regNo, fullName, position, email, phone, gender, age, address, projectArea, date, status, idCardGenerated, appointmentLetterGenerated, eightyGCertificateGenerated
Donations
id, amount, donorName, date, regNo, email, phone, details, campaignId, memberId, paymentId, panCardNumber
Campaigns
id, title, description, category, goalAmount, raisedAmount, status, startDate, endDate
Features Breakdown
Member Role Assignment
When verifying a member, administrators can:

Accept the application and assign a custom position/role
If no position is provided, defaults to "member"
The position is stored and displayed in all member documents (ID cards, appointment letters, etc.)
Document Generation
ID Cards: Display member name, registration number, and assigned position
Appointment Letters: Personalized letters with member's assigned role
Certificates: Professional certificates for tax benefits
Security
Passwords are hashed using bcrypt with 10 salt rounds
Session-based authentication with secure cookies
Input validation using Zod schemas
CORS and security headers configured
Contributing
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Support
For support, email support@ngosystem.com or open an issue on GitHub.

Changelog
v1.0.0 (Current)
Member registration and verification system
Admin role assignment for members
Document generation (ID cards, appointment letters, certificates)
Donation tracking and campaigns
Admin dashboard with statistics

Roadmap
[] Email notifications for status updates
[] SMS notifications
[] Advanced reporting and analytics
[] Bulk member import/export
[] Mobile app
[] Multi-language support
