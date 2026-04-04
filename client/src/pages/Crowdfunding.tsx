import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Plus, Pencil, Trash2, Target, TrendingUp,
  Heart, GraduationCap, Stethoscope, Users,
  CheckCircle, PauseCircle, PlayCircle, X,
} from "lucide-react";
import type { Campaign } from "@shared/schema";

const CATEGORIES = [
  { value: "healthcare", label: "Healthcare", icon: Stethoscope, color: "text-red-500 bg-red-50" },
  { value: "education", label: "Education", icon: GraduationCap, color: "text-blue-500 bg-blue-50" },
  { value: "welfare", label: "Social Welfare", icon: Users, color: "text-green-500 bg-green-50" },
  { value: "general", label: "General", icon: Heart, color: "text-purple-500 bg-purple-50" },
];

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  paused: "bg-yellow-100 text-yellow-700",
  completed: "bg-blue-100 text-blue-700",
};

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
  const pct = Math.min(100, Math.round((raised / goal) * 100));
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">Raised: <strong className="text-foreground">{inr(raised)}</strong></span>
        <span className="font-semibold text-indigo-600">{pct}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${pct >= 100 ? "bg-green-500" : "bg-indigo-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1">Goal: {inr(goal)}</p>
    </div>
  );
}

const emptyForm = {
  title: "",
  description: "",
  category: "general",
  goalAmount: "",
  raisedAmount: "",
  status: "active" as "active" | "paused" | "completed",
  endDate: "",
};

export default function Crowdfunding() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { data: campaigns = [], isLoading } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/campaigns", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({ title: "Campaign Created", description: "New campaign has been created successfully." });
      resetForm();
    },
    onError: () => toast({ title: "Error", description: "Failed to create campaign.", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => apiRequest("PATCH", `/api/campaigns/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({ title: "Campaign Updated", description: "Campaign has been updated successfully." });
      resetForm();
    },
    onError: () => toast({ title: "Error", description: "Failed to update campaign.", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/campaigns/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({ title: "Campaign Deleted", description: "Campaign has been removed." });
    },
    onError: () => toast({ title: "Error", description: "Failed to delete campaign.", variant: "destructive" }),
  });

  function resetForm() {
    setForm(emptyForm);
    setShowForm(false);
    setEditingId(null);
  }

  function openEdit(c: Campaign) {
    setForm({
      title: c.title,
      description: c.description,
      category: c.category,
      goalAmount: String(c.goalAmount),
      raisedAmount: String(c.raisedAmount),
      status: c.status as any,
      endDate: c.endDate ? new Date(c.endDate).toISOString().split("T")[0] : "",
    });
    setEditingId(c.id);
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      goalAmount: Number(form.goalAmount),
      raisedAmount: Number(form.raisedAmount || 0),
      status: form.status,
      endDate: form.endDate || null,
    };
    if (editingId) updateMutation.mutate({ id: editingId, data: payload });
    else createMutation.mutate(payload);
  }

 const { data: donations = [], isLoading: isLoadingDonations } = useQuery<any[]>({
  queryKey: ["/api/admin/donations"],
});

// Filter out donations where campaignId is null or undefined
const crowdfundingDonations = donations.filter(d => d.campaignId !== null && d.campaignId !== undefined);

const getCampaignTitle = (id?: number) => {
  // Since we filtered, we know 'id' exists, but we keep the check for safety
  return campaigns.find(c => c.id === id)?.title || "Unknown Campaign";
};

  // Summary stats
  const totalGoal = campaigns.reduce((a, c) => a + c.goalAmount, 0);
  const totalRaised = campaigns.reduce((a, c) => a + c.raisedAmount, 0);
  const active = campaigns.filter(c => c.status === "active").length;
  const completed = campaigns.filter(c => c.status === "completed").length;

  const catInfo = (cat: string) =>
    CATEGORIES.find(c => c.value === cat) || CATEGORIES[3];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Crowdfunding Campaigns</h1>
          <p className="text-muted-foreground mt-1">Create and manage fundraising campaigns in INR (₹).</p>
        </div>
        <Button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-2"
        >
          <Plus className="w-4 h-4" /> New Campaign
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Goal", value: inr(totalGoal), icon: Target, color: "from-indigo-500 to-indigo-600" },
          { label: "Total Raised", value: inr(totalRaised), icon: TrendingUp, color: "from-green-500 to-emerald-600" },
          { label: "Active Campaigns", value: String(active), icon: PlayCircle, color: "from-blue-500 to-cyan-600" },
          { label: "Completed", value: String(completed), icon: CheckCircle, color: "from-purple-500 to-purple-600" },
        ].map((s) => (
          <Card key={s.label} className="glass-panel border-0 overflow-hidden">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shrink-0`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                <p className="text-lg font-bold text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <Card className="glass-panel border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                {editingId ? "Edit Campaign" : "Create New Campaign"}
              </h2>
              <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Campaign Title *</label>
                  <Input
                    value={form.title} required
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="e.g. Rural Healthcare Drive"
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <Textarea
                    value={form.description} required
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Describe what this campaign is about..."
                    className="rounded-xl min-h-[90px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value as any }))}
                    className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Goal Amount (₹ INR) *</label>
                  <Input
                    type="number" min="1" required
                    value={form.goalAmount}
                    onChange={e => setForm(f => ({ ...f, goalAmount: e.target.value }))}
                    placeholder="e.g. 500000"
                    className="h-11 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Amount Raised (₹ INR)</label>
                  <Input
                    type="number" min="0"
                    value={form.raisedAmount}
                    onChange={e => setForm(f => ({ ...f, raisedAmount: e.target.value }))}
                    placeholder="e.g. 150000"
                    className="h-11 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date (optional)</label>
                  <Input
                    type="date"
                    value={form.endDate}
                    onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                    className="h-11 rounded-xl"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : editingId ? "Update Campaign" : "Create Campaign"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} className="rounded-xl">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Campaign Cards */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
        </div>
      ) : campaigns.length === 0 ? (
        <Card className="glass-panel border-0">
          <CardContent className="p-12 text-center">
            <Target className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-600">No campaigns yet</h3>
            <p className="text-slate-400 mt-1">Click "New Campaign" to create your first crowdfunding campaign.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {campaigns.map((campaign) => {
            const cat = catInfo(campaign.category);
            const Icon = cat.icon;
            const pct = Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100));
            return (
              <Card key={campaign.id} className="glass-panel border-0 overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col gap-4">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[campaign.status] || ""}`}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Title & desc */}
                  <div>
                    <h3 className="font-bold text-foreground text-base leading-tight">{campaign.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{campaign.description}</p>
                  </div>

                  {/* Progress */}
                  <ProgressBar raised={campaign.raisedAmount} goal={campaign.goalAmount} />

                  {/* Category badge */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[11px] capitalize">
                      {campaign.category}
                    </Badge>
                    {campaign.endDate && (
                      <span className="text-[11px] text-muted-foreground">
                        Ends {new Date(campaign.endDate).toLocaleDateString("en-IN")}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1 border-t border-slate-100">
                    <Button
                      size="sm" variant="outline"
                      className="flex-1 gap-1 rounded-lg text-xs"
                      onClick={() => openEdit(campaign)}
                    >
                      <Pencil className="w-3 h-3" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-1 rounded-lg text-xs"
                      onClick={() => updateMutation.mutate({
                        id: campaign.id,
                        data: { status: campaign.status === "active" ? "paused" : "active" }
                      })}
                    >
                      {campaign.status === "active"
                        ? <><PauseCircle className="w-3 h-3" /> Pause</>
                        : <><PlayCircle className="w-3 h-3" /> Resume</>}
                    </Button>
                    <Button
                      size="sm" variant="destructive"
                      className="rounded-lg"
                      onClick={() => {
                        if (confirm(`Delete "${campaign.title}"?`)) deleteMutation.mutate(campaign.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      {/* --- DONATIONS HISTORY TABLE --- */}
      <div className="pt-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground">Campaign Donations</h2>
        </div>

        <Card className="glass-panel border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Payment ID</th>
                    <th className="px-6 py-4">Donor Details</th>
                    <th className="px-6 py-4">Campaign Info</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoadingDonations ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic">
                        Loading donation records...
                      </td>
                    </tr>
                  ) : crowdfundingDonations.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic">
                        No campaign donations found.
                      </td>
                    </tr>
                  ) : (
                    crowdfundingDonations.map((donation) => (
                      <tr key={donation.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <code className="text-[10px] bg-slate-100 px-2 py-1 rounded text-indigo-600 font-bold">
                            {donation.paymentId || "N/A"}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-foreground">{donation.donorName}</span>
                            <span className="text-[10px] text-muted-foreground">{donation.email}</span>
                            <span className="text-[10px] text-muted-foreground">{donation.phone}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-indigo-600">
                              {getCampaignTitle(donation.campaignId)}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-medium uppercase">
                              ID: {donation.campaignId || "Global"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-black text-foreground">
                          {inr(donation.amount)}
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
    </div>
  );
}
