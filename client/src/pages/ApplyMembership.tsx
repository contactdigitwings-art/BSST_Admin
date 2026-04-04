import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Users, FileText, CheckCircle, MapPin, Briefcase, Phone, User as UserIcon } from "lucide-react";
import { useLocation } from "wouter";

export default function ApplyMembership() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    address: "",
    projectArea: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all schema-required fields are present
    const isInvalid = Object.values(formData).some(val => !val);
    if (isInvalid) {
      toast({ title: "Validation Error", description: "Please fill in all details", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/members/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important to send session cookie/userId
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age) // Convert to integer for Drizzle
        })
      });

      if (response.ok) {
        setSubmitted(true);
        toast({ title: "Application Sent", description: "Your details have been sent to Admin for verification." });
        setTimeout(() => setLocation("/api/members/me"), 3000);
      } else {
        toast({ title: "Error", description: "Submission failed", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "An error occurred", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-black text-[#1A365D] uppercase tracking-tighter">Application Pending</h2>
        <p className="text-gray-500 max-w-md">Your application is now with the Admin. Once verified, you will be able to generate your ID Card and Appointment Letter.</p>
        <Button onClick={() => setLocation("/")} className="bg-[#1A365D] rounded-xl px-8">Go to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-[#1A365D]">Membership Form</h1>
        <p className="text-gray-500 font-medium">Link your profile to Bharti Sewa Sadan Trust</p>
      </div>

      <Card className="border-0 shadow-xl rounded-[2.5rem] overflow-hidden bg-white/50 backdrop-blur-sm">
        <CardContent className="p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1A365D] flex items-center gap-2"><UserIcon size={16}/> Full Name</label>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="As per Govt ID" className="h-12 rounded-xl" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1A365D] flex items-center gap-2"><FileText size={16}/> Email</label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" className="h-12 rounded-xl" required />
              </div>
            </div>

            {/* Phone & Gender & Age */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1A365D] flex items-center gap-2"><Phone size={16}/> Phone</label>
                <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Mobile Number" className="h-12 rounded-xl" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1A365D]">Gender</label>
                <Select onValueChange={(v) => handleSelectChange("gender", v)}>
                  <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1A365D]">Age</label>
                <Input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Years" className="h-12 rounded-xl" required />
              </div>
            </div>

            {/* Project Area */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1A365D] flex items-center gap-2"><Briefcase size={16}/> Project Area of Interest</label>
              <Select onValueChange={(v) => handleSelectChange("projectArea", v)}>
                <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select interest area" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Social Welfare">Social Welfare</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1A365D] flex items-center gap-2"><MapPin size={16}/> Permanent Address</label>
              <Textarea name="address" value={formData.address} onChange={handleChange} placeholder="Complete postal address" className="rounded-xl min-h-[100px]" required />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1A365D] hover:bg-[#23487a] text-white rounded-2xl h-14 font-bold text-lg shadow-lg"
            >
              {isSubmitting ? "Processing Application..." : "Submit for Verification"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}