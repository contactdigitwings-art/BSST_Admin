import { useState } from "react";
import { useMembers, useUpdateMemberStatus } from "@/hooks/use-members";
import { Users, ShieldAlert, CheckCircle, Ban, Eye, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function ManageMembers() {
  const { data: members, isLoading: membersLoading } = useMembers();
  const updateStatus = useUpdateMemberStatus();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");

  if (membersLoading) {
    return <div className="h-full flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  const handleStatusChange = async (id: number, status: 'verified' | 'blocked') => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast({ title: "Status Updated", description: `Member has been ${status}.` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update member status", variant: "destructive" });
    }
  };

  const filteredMembers = members?.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const pendingMembers = filteredMembers.filter(m => m.status === 'pending');
  const processedMembers = filteredMembers.filter(m => m.status !== 'pending');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Manage Members</h1>
        <p className="text-muted-foreground mt-1">Review applications and manage member status.</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input 
          placeholder="Search members by name, email or reg no..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 rounded-xl bg-white border-slate-200 shadow-sm focus-visible:ring-indigo-500"
        />
      </div>

      {/* New Members Application Table */}
      <Card className="glass-panel overflow-hidden border-0">
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            New Members Application (Pending)
          </h3>
          <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">{pendingMembers.length}</Badge>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="px-6 py-4">Sr No.</th>
                  <th className="px-6 py-4">Reg No</th>
                  <th className="px-6 py-4">Name / Email</th>
                  <th className="px-6 py-4">Detail</th>
                  <th className="px-6 py-4">Receipt</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pendingMembers.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">No pending applications found</td></tr>
                ) : (
                  pendingMembers.map((member, idx) => (
                    <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-500">{idx + 1}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{member.regNo}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{member.name}</div>
                        <div className="text-sm text-slate-500">{member.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 max-w-[200px] truncate">{member.detail}</td>
                      <td className="px-6 py-4">
                        {member.receipt ? (
                          <a href={member.receipt} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline text-sm font-medium">View Receipt</a>
                        ) : (
                          <span className="text-slate-400 text-sm">None</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button size="sm" variant="outline" className="rounded-lg h-8" data-testid={`button-view-${member.id}`}>
                          <Eye className="w-4 h-4 mr-1" /> View
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white rounded-lg h-8"
                          onClick={() => handleStatusChange(member.id, 'verified')}
                          disabled={updateStatus.isPending}
                          data-testid={`button-verify-${member.id}`}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" /> Verify
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          className="rounded-lg h-8"
                          onClick={() => handleStatusChange(member.id, 'blocked')}
                          disabled={updateStatus.isPending}
                          data-testid={`button-block-${member.id}`}
                        >
                          <Ban className="w-4 h-4 mr-1" /> Block
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Members Database Table */}
      <Card className="glass-panel overflow-hidden border-0">
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Members Database
          </h3>
          <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">{processedMembers.length}</Badge>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="px-6 py-4">Reg No</th>
                  <th className="px-6 py-4">Name / Email</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {processedMembers.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">No members found</td></tr>
                ) : (
                  processedMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{member.regNo}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{member.name}</div>
                        <div className="text-sm text-slate-500">{member.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          member.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`} data-testid={`status-badge-${member.id}`}>
                          {member.status === 'verified' ? <CheckCircle className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                          {member.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button size="sm" variant="outline" className="rounded-lg h-8" data-testid={`button-details-${member.id}`}>
                          <Eye className="w-4 h-4 mr-1" /> Details
                        </Button>
                        {member.status === 'verified' ? (
                           <Button 
                             size="sm" 
                             variant="destructive" 
                             className="rounded-lg h-8"
                             onClick={() => handleStatusChange(member.id, 'blocked')}
                             disabled={updateStatus.isPending}
                             data-testid={`button-block-verified-${member.id}`}
                           >
                             <Ban className="w-4 h-4 mr-1" /> Block
                           </Button>
                        ) : (
                           <Button 
                             size="sm" 
                             className="bg-green-600 hover:bg-green-700 text-white rounded-lg h-8"
                             onClick={() => handleStatusChange(member.id, 'verified')}
                             disabled={updateStatus.isPending}
                             data-testid={`button-unblock-${member.id}`}
                           >
                             <CheckCircle className="w-4 h-4 mr-1" /> Unblock
                           </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
