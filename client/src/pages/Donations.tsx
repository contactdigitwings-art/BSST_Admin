import { useDonations } from "@/hooks/use-admin";
import { useMembers } from "@/hooks/use-members";
import { Heart, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Donation } from "@shared/schema";

export default function Donations() {
  const { data: donations, isLoading: donationsLoading, error: donationsError } = useDonations();
  const { data: members, isLoading: membersLoading, error: membersError } = useMembers();

  if (donationsLoading || membersLoading) {
    return <div className="h-full flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  if (donationsError || membersError) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold text-red-500">Error loading data</h2>
        <p>{donationsError?.message || membersError?.message}</p>
      </div>
    );
  }

  const allDonations: Donation[] = donations || [];
  const memberDonations = allDonations.filter((d: Donation) => d.memberId);
  const totalDonations = allDonations.reduce((sum: number, d: Donation) => sum + d.amount, 0);
  const avgDonation = allDonations.length > 0 ? Math.round(totalDonations / allDonations.length) : 0;

  // Create a map of memberId to member details
  const memberMap = new Map();
  members?.forEach(member => {
    memberMap.set(member.id, member);
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Donations Record</h1>
        <p className="text-muted-foreground mt-1">View all donations and contributions.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="glass-panel border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Donations</p>
                <p className="text-3xl font-display font-bold text-foreground mt-2">₹{totalDonations.toLocaleString('en-IN')}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Donors</p>
                <p className="text-3xl font-display font-bold text-foreground mt-2">{allDonations.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Donation</p>
                <p className="text-3xl font-display font-bold text-foreground mt-2">₹{avgDonation.toLocaleString('en-IN')}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Donations Table */}
      <Card className="glass-panel overflow-hidden border-0">
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400" />
            All Donations
          </h3>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="px-6 py-4">Payment Id</th>
                  <th className="px-6 py-4">Donor Name</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Reg No</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {!allDonations || allDonations.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-slate-500">No donations found</td></tr>
                ) : (
                  allDonations.map((donation: Donation, idx: number) => (
                    <tr key={donation.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-500">{donation.paymentId?donation.paymentId:idx+1}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">{donation.donorName}</td>
                      <td className="px-6 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200 rounded-lg font-bold">
                          ₹{donation.amount.toLocaleString('en-IN')}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{donation.regNo || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{donation.email || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{donation.phone || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {donation.date ? new Date(donation.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Member Donations Table */}
      <Card className="glass-panel overflow-hidden border-0">
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-blue-400" />
            Member Donations
          </h3>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="px-6 py-4">Payment Id</th>
                  <th className="px-6 py-4">Member Name</th>
                  <th className="px-6 py-4">Reg No</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {!memberDonations || memberDonations.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-slate-500">No member donations found</td></tr>
                ) : (
                  memberDonations.map((donation: Donation, idx: number) => {
                    const member = donation.memberId ? memberMap.get(donation.memberId) : null;
                    return (
                      <tr key={donation.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-500">{donation.paymentId?donation.paymentId:idx+1}</td>
                        <td className="px-6 py-4 font-semibold text-slate-900">{member?.fullName || donation.donorName}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{member?.regNo || donation.regNo || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{member?.email || donation.email || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{member?.phone || donation.phone || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg font-bold">
                            ₹{donation.amount.toLocaleString('en-IN')}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {donation.date ? new Date(donation.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'N/A'}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
