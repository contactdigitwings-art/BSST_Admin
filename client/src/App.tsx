import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import Login from "@/pages/Login";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import ManageMembers from "@/pages/ManageMembers";
import Donations from "@/pages/Donations";
import IDCard from "@/pages/IDCard";
import AppointmentLetter from "@/pages/AppointmentLetter";
import DonateNow from "@/pages/DonateNow";
import ApplyMembership from "@/pages/ApplyMembership";
import Crowdfunding from "@/pages/Crowdfunding";
import EightyGCertificate from "@/pages/EightyGCertificate";
import { AppLayout } from "@/components/layout/AppLayout";
import { Loader2 } from "lucide-react";

// Placeholder for other routes
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex h-[60vh] items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <p className="text-slate-500 mt-2">This feature is under construction.</p>
    </div>
  </div>
);

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <AppLayout>
      <Component />
    </AppLayout>
  );
}

function Router() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/login">
        {user ? <Redirect to="/" /> : <Login />}
      </Route>
      
      <Route path="/">
        {() => (
          <ProtectedRoute component={user?.role === 'admin' ? AdminDashboard : UserDashboard} />
        )}
      </Route>

      {/* Additional User Routes */}
      <Route path="/id-card">{() => <ProtectedRoute component={IDCard} />}</Route>
      <Route path="/appointment">{() => <ProtectedRoute component={AppointmentLetter} />}</Route>
      <Route path="/donate">{() => <ProtectedRoute component={DonateNow} />}</Route>
      <Route path="/80G-certificate">{() => <ProtectedRoute component={EightyGCertificate} />}</Route>
      <Route path="/apply-membership">{() => <ProtectedRoute component={ApplyMembership} />}</Route>

      {/* Additional Admin Routes */}
      <Route path="/members">{() => <ProtectedRoute component={ManageMembers} />}</Route>
      <Route path="/donations">{() => <ProtectedRoute component={Donations} />}</Route>
      <Route path="/crowdfunding">{() => <ProtectedRoute component={Crowdfunding} />}</Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
