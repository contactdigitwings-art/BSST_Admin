import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Users, FileText, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function ApplyMembership() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    detail: "",
    receipt: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.detail) {
      toast({ title: "Validation Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/members/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          detail: formData.detail,
          receipt: formData.receipt || null
        })
      });

      if (response.ok) {
        setSubmitted(true);
        toast({ title: "Application Submitted", description: "Your membership application has been submitted successfully. Admin will review it shortly." });
        setTimeout(() => setLocation("/"), 3000);
      } else {
        toast({ title: "Error", description: "Failed to submit application", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while submitting your application", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Application Submitted</h1>
          <p className="text-muted-foreground mt-1">Thank you for applying for membership.</p>
        </div>

        <Card className="glass-panel border-0 max-w-2xl">
          <CardContent className="p-8 text-center py-16">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Application Received</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Your membership application has been successfully submitted. Our admin team will review your application and get back to you within 2-3 business days.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-800">
              <p className="font-semibold mb-2">What happens next?</p>
              <ul className="space-y-1 text-left">
                <li>✓ Your application will be reviewed by our admin team</li>
                <li>✓ You'll receive updates on your application status</li>
                <li>✓ Once approved, you'll get access to all member benefits</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Redirecting to dashboard in 3 seconds...</p>
            <Button 
              onClick={() => setLocation("/")} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
            >
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Apply for Membership</h1>
        <p className="text-muted-foreground mt-1">Submit your application to join our organization and access member benefits.</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="glass-panel border-0">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Member Benefits</h3>
                <p className="text-sm text-muted-foreground">Access exclusive member resources, certificates, and ID cards</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-0">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Quick Review</h3>
                <p className="text-sm text-muted-foreground">Admin will review your application within 2-3 business days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Form */}
      <Card className="glass-panel border-0 max-w-2xl">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="h-12 rounded-xl border-slate-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="h-12 rounded-xl border-slate-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Application Details *</label>
              <Textarea
                name="detail"
                value={formData.detail}
                onChange={handleChange}
                placeholder="Tell us about yourself and why you want to join our organization..."
                className="rounded-xl border-slate-200 min-h-[120px]"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">Minimum 10 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Receipt / Reference (Optional)</label>
              <Input
                type="text"
                name="receipt"
                value={formData.receipt}
                onChange={handleChange}
                placeholder="Enter receipt number or reference if applicable"
                className="h-12 rounded-xl border-slate-200"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
              <p className="font-semibold mb-2">Required Information</p>
              <ul className="space-y-1">
                <li>✓ Full Name - Your registered name</li>
                <li>✓ Email - Valid contact email</li>
                <li>✓ Details - Your membership proposal (why you want to join)</li>
              </ul>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl h-12 font-bold text-lg shadow-lg shadow-indigo-500/25"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Terms Card */}
      <Card className="glass-panel border-0 max-w-2xl">
        <CardContent className="p-6">
          <h3 className="font-bold text-foreground mb-3">Important Notes</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>Your application will be reviewed by our admin team</span>
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>You'll receive email notifications about your application status</span>
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>Once approved, you'll have immediate access to all member benefits</span>
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>Please provide accurate information for faster processing</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
