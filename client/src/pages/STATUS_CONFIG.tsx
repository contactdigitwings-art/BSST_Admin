// StatusConfig.tsx
import { ShieldAlert, CheckCircle, Ban, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

// Define the shape of our config for better TypeScript support
export interface StatusStyle {
  color: string;
  icon: ReactNode;
  label: string;
}

export const STATUS_CONFIG: Record<'pending' | 'verified' | 'blocked', StatusStyle> = {
  pending: {
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: <ShieldAlert className="w-3 h-3" />,
    label: "PENDING"
  },
  verified: {
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: <CheckCircle className="w-3 h-3" />,
    label: "VERIFIED"
  },
  blocked: {
    color: "bg-rose-100 text-rose-700 border-rose-200",
    icon: <Ban className="w-3 h-3" />,
    label: "BLOCKED"
  }
};