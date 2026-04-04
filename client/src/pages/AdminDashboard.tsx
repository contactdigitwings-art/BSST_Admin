import { useState } from "react";
import { useMembers, useUpdateMemberStatus } from "@/hooks/use-members";
import { useAdminStats } from "@/hooks/use-admin";
import { StatCard } from "@/components/ui/StatCard";
import { Users, Heart, Megaphone, ShieldAlert, CheckCircle, Ban, Eye, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { STATUS_CONFIG } from "./STATUS_CONFIG";

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: members, isLoading: membersLoading } = useMembers();
  const updateStatus = useUpdateMemberStatus();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  if (statsLoading || membersLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const handleStatusChange = async (id: number, status: 'verified' | 'blocked') => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast({ title: "Status Updated", description: `Member is now ${status}.` });
    } catch (error) {
      toast({ title: "Error", description: "Update failed", variant: "destructive" });
    }
  };

  const filteredMembers = members?.filter(m => 
    m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const pendingMembers = filteredMembers.filter(m => m.status === 'pending');
  const processedMembers = filteredMembers.filter(m => m.status !== 'pending');

  return (
    <div className="space-y-8 p-6">
      {/* Header & Stats omitted for brevity - keep your existing ones */}

      {/* ─── PENDING APPLICATIONS ─── */}
      <Card className="glass-panel overflow-hidden border-0 shadow-lg">
        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            Pending Applications
          </h3>
          <Badge className="bg-amber-500">{pendingMembers.length}</Badge>
        </div>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Reg No</th>
                <th className="px-6 py-4">Name / Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendingMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold">{member.regNo}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold">{member.fullName}</div>
                    <div className="text-sm text-slate-500">{member.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${STATUS_CONFIG.pending.color}`}>
                      {STATUS_CONFIG.pending.icon} {STATUS_CONFIG.pending.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button 
                      size="sm" 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => handleStatusChange(member.id, 'verified')}
                    >
                      Verify
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleStatusChange(member.id, 'blocked')}
                    >
                      Block
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* ─── MEMBER DATABASE ─── */}
      <Card className="glass-panel overflow-hidden border-0 shadow-lg">
        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Members Database
          </h3>
          <Badge className="bg-indigo-500">{processedMembers.length}</Badge>
        </div>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Reg No</th>
                <th className="px-6 py-4">Name / Email</th>
                <th className="px-6 py-4">Current Status</th>
                <th className="px-6 py-4 text-right">Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {processedMembers.map((member) => {
                const config = member.status === 'verified' ? STATUS_CONFIG.verified : STATUS_CONFIG.blocked;
                return (
                  <tr key={member.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold">{member.regNo}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold">{member.fullName}</div>
                      <div className="text-sm text-slate-500">{member.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${config.color}`}>
                        {config.icon} {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusChange(member.id, member.status === 'verified' ? 'blocked' : 'verified')}
                      >
                        {member.status === 'verified' ? 'Block' : 'Unblock'}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
