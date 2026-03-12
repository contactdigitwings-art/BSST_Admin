import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Megaphone,
  LogOut,
  FileText,
  BadgeCheck,
  Heart,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  const adminLinks = [
    { href: "/", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/members", label: "Manage Members", icon: Users },
    { href: "/donations", label: "Donations", icon: CreditCard },
    { href: "/crowdfunding", label: "Crowdfunding", icon: Megaphone },
  ];

  const userLinks = [
    { href: "/", label: "Membership Status", icon: BadgeCheck },
    { href: "/id-card", label: "ID Card", icon: Users },
    { href: "/appointment", label: "Appointment Letter", icon: FileText },
    { href: "/donate", label: "Donate Now", icon: Heart },
  ];

  const links = user?.role === "admin" ? adminLinks : userLinks;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-2xl z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl leading-tight">Trust Portal</h1>
            <p className="text-xs text-sidebar-foreground/60">Management System</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground/80"
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`} />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border/50">
          <div className="bg-sidebar-accent/50 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="font-bold text-primary-foreground">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">{user?.name}</p>
                <p className="text-xs text-sidebar-foreground/60 capitalize truncate">
                  {user?.role} Account
                </p>
              </div>
            </div>
            <Button
              variant="destructive"
              className="w-full gap-2 shadow-lg shadow-destructive/20"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b shadow-sm z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-display font-bold text-lg">Trust Portal</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6" />
          </Button>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
