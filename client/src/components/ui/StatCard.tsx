import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradient: string;
  subtitle?: string;
}

export function StatCard({ title, value, icon, gradient, subtitle }: StatCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl hover:-translate-y-1 transition-transform duration-300 ${gradient}`}
    >
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md border border-white/10 shadow-inner">
            {icon}
          </div>
          <h3 className="font-display font-bold text-4xl tracking-tight drop-shadow-sm">{value}</h3>
        </div>
        <div>
          <p className="font-medium text-white/90 text-lg">{title}</p>
          {subtitle && <p className="text-sm text-white/70 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
