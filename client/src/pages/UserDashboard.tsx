import { useAuth } from "@/hooks/use-auth";
import { useMyMember } from "@/hooks/use-members";
import { StatCard } from "@/components/ui/StatCard";
import { IdCard, FileText, Award, ShieldCheck, AlertCircle, Info, FileWarning, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserDashboard() {
  const { user } = useAuth();
  const { data: member, isLoading } = useMyMember();

  if (isLoading) {
    return <div className="h-full flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  const isVerified = member?.status === 'verified';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground mt-1">Here is the overview of your membership status.</p>
      </div>

      {/* Notices */}
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-4 flex items-center gap-4 text-white shadow-lg shadow-indigo-500/20">
          <AlertCircle className="w-6 h-6 shrink-0 text-purple-200" />
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-purple-200">Admin Notice</h4>
            <p className="text-white/90">Please ensure all your submitted documents are clear and legible for verification.</p>
          </div>
        </div>
        
        {!isVerified && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 flex items-center gap-4 text-white shadow-lg shadow-orange-500/20">
            <Info className="w-6 h-6 shrink-0 text-orange-200" />
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-orange-200">Personal Notice</h4>
              <p className="text-white/90">Your application is currently pending verification. Please check back later.</p>
            </div>
          </div>
        )}
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Generated"
          subtitle="ID CARD"
          value={member?.idCardGenerated ? "Yes" : "No"}
          icon={<IdCard className="w-6 h-6" />}
          gradient="bg-gradient-to-br from-emerald-500 to-green-600 shadow-emerald-500/30"
        />
        <StatCard
          title="Generated"
          subtitle="APPOINTMENT LETTER"
          value={member?.appointmentLetterGenerated ? "Yes" : "No"}
          icon={<FileText className="w-6 h-6" />}
          gradient="bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-purple-500/30"
        />
        <StatCard
          title="Generate"
          subtitle="MEMBERSHIP CERTIFICATE"
          value={member?.certificateGenerated ? "Yes" : "No"}
          icon={<Award className="w-6 h-6" />}
          gradient="bg-gradient-to-br from-pink-500 to-rose-600 shadow-pink-500/30"
        />
        <StatCard
          title="Active"
          subtitle="MEMBERSHIP STATUS"
          value={member?.status?.toUpperCase() || 'UNKNOWN'}
          icon={<ShieldCheck className="w-6 h-6" />}
          gradient="bg-gradient-to-br from-orange-400 to-red-500 shadow-orange-500/30"
        />
      </div>

      {/* Detailed Status Section */}
      <Card className="glass-panel overflow-hidden border-0">
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-indigo-400" />
            Membership Status Overview
          </h3>
        </div>
        <CardContent className="p-6 sm:p-10">
          {member ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Registration Number</p>
                  <p className="text-4xl font-display font-bold text-foreground mt-1">{member.regNo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Status</p>
                  <div className={`mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${
                    member.status === 'verified' ? 'bg-green-100 text-green-700 border border-green-200' :
                    member.status === 'blocked' ? 'bg-red-100 text-red-700 border border-red-200' :
                    'bg-amber-100 text-amber-700 border border-amber-200'
                  }`}>
                    {member.status === 'verified' && <ShieldCheck className="w-4 h-4" />}
                    {member.status === 'pending' && <Info className="w-4 h-4" />}
                    {member.status === 'blocked' && <FileWarning className="w-4 h-4" />}
                    {member.status.toUpperCase()}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 w-full md:w-auto min-w-[200px]">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 shadow-lg shadow-indigo-500/25" disabled={!member.idCardGenerated}>
                  Download ID Card
                </Button>
                <Button variant="outline" className="w-full rounded-xl h-12 border-2 border-indigo-100 text-indigo-700 hover:bg-indigo-50" disabled={!member.appointmentLetterGenerated}>
                  Appointment Letter
                </Button>
                <Button variant="outline" className="w-full rounded-xl h-12 border-2 border-indigo-100 text-indigo-700 hover:bg-indigo-50" disabled={!member.certificateGenerated}>
                  Membership Certificate
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileWarning className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-700">No Membership Record Found</h3>
              <p className="text-slate-500 mt-2 max-w-md mx-auto">You haven't submitted a membership application yet or your record is not linked. Please contact admin.</p>
              <Button className="mt-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">Apply Now</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
