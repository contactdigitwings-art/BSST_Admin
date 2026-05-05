# NGO Management System

A full-stack web application for managing NGO operations, including member management, donations, crowdfunding, and administrative oversight.

## Features

### User Dashboard
- **Membership Status**: Track personal membership details and status
- **ID Card Generation**: Generate and download personalized ID cards
- **Appointment Letter**: Access and download appointment letters
- **Donation Portal**: Make donations and view donation history
- **Certificate Management**: Generate and manage 80G certificates

### Admin Dashboard
- **Member Management**: Approve/reject membership applications and manage member database
- **Donation Oversight**: Monitor and manage donation activities
- **Campaign Management**: Handle crowdfunding campaigns
- **Notice Management**: Post admin and personal notices
- **Audit Reports**: Access NGO audit reports and financial transparency

### Core Functionality
- **Role-Based Access Control**: Secure authentication with admin and user roles
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Real-time Updates**: Live data synchronization
- **Secure Authentication**: Password hashing and session management

## Tech Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components built on Radix UI
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and state management
- **Framer Motion** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **Drizzle ORM** - Type-safe SQL query builder
- **Passport.js** - Authentication middleware
- **bcrypt** - Password hashing
- **WebSocket** - Real-time communication

### Development Tools
- **TypeScript** - Type checking
- **ESLint** - Code linting
- **Drizzle Kit** - Database migrations
- **Nodemon** - Development server auto-restart

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **PostgreSQL** (version 12 or higher)
- **npm** or **yarn** package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ngo-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Create a PostgreSQL database
   - Update database connection settings in `db.js` or environment variables
   - Run database migrations:
     ```bash
     npm run db:push
     ```

4. **Environment Configuration**
   - Create a `.env` file in the root directory
   - Add necessary environment variables (database URL, session secrets, etc.)

## Usage

### Development
```bash
npm run dev
```
This starts the development server with hot reloading.

### Production Build
```bash
npm run build
npm start
```

### Database Operations
```bash
# Push schema changes to database
npm run db:push

# Check TypeScript types
npm run check
```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Backend Express server
│   ├── routes.ts          # API routes
│   ├── db.ts             # Database connection
│   └── index.ts          # Server entry point
├── shared/                # Shared types and schemas
├── migrations/           # Database migrations
└── package.json          # Project dependencies and scripts
```

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/me` - Get current user info

### Members
- `GET /api/members` - Get members (admin only)
- `POST /api/members/apply` - Apply for membership
- `PUT /api/members/:id/verify` - Verify member (admin only)

### Donations
- `GET /api/donations` - Get donations
- `POST /api/donations` - Create donation

### Certificates
- `GET /api/certificates/id-card` - Generate ID card
- `GET /api/certificates/appointment-letter` - Generate appointment letter
- `GET /api/certificates/80g` - Generate 80G certificate

## Testing Credentials

- **Admin**: `admin@gmail.com` / `123456`
- **User**: `user@gmail.com` / `123456`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please contact the development team or create an issue in the repository.</content>
<parameter name="filePath">c:\Users\ASUS\Desktop\Ngo-System\Ngo-System\README.md