import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Gift, Users, TrendingUp, Lock, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useMyMember } from "@/hooks/use-members";
import { motion } from "framer-motion";

declare global {
  interface Window {
    Razorpay: any;
  }
}
export default function DonateNow() {
  const { user } = useAuth();
  const { data: member } = useMyMember();
  
  // Form States
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [panCardNumber, setPanCardNumber] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load Razorpay Script on Mount
  useEffect(() => {
    if (document.getElementById('razorpay-checkout-js')) return;
    const script = document.createElement("script");
    script.id = 'razorpay-checkout-js';
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Pre-fill member details if logged in
  useEffect(() => {
    if (member) {
      setDonorName(member.fullName);
    }
  }, [member]);

  const quickAmounts = [500, 1500, 3000, 15000, 75000];

  const handleDonate = async () => {

    if (!(window as any).Razorpay) {
    alert("Razorpay SDK is still loading. Please try again in a second.");
    return;
  }
    // 1. Basic Validation
    if (!amount || !donorName || !panCardNumber) {
      alert("Please fill in Name, Amount, and PAN Card Number");
      return;
    }

    const numericAmount = parseInt(amount);

    // 2. Razorpay Configuration
    const options = {
      key: process.env.RAZORPAY_KEY, 
      amount: numericAmount * 100, // Amount in paise
      currency: "INR",
      name: "Bharti Sewa Sadan Trust",
      description: "Donation for Rural Seva",
      image: "/bhartilogo.jpg", 
      handler: async function (response: any) {
        setIsSubmitting(true);
        try {
          const donationData: any = {
            amount: numericAmount,
            donorName,
            panCardNumber,
            details,
            paymentId: response.razorpay_payment_id,
            // Automatically true if they are providing PAN for a donation
            eightyGCertificateGenerated: true 
          };

          // Attach member details if user is logged in
          if (user && member) {
            donationData.regNo = member.regNo;
            donationData.email = member.email;
            donationData.phone = member.phone;
            donationData.memberId = member.id;
          }

          // 3. Sync with Backend
          const res = await fetch("/api/donations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(donationData)
          });

          if (res.ok) {
            alert("Thank you for your donation! Your contribution has been recorded.");
            // Reset form to initial values
            setAmount("");
            setPanCardNumber("");
            setDetails("");
            // Reset donor name to member name if logged in, otherwise empty
            if (member) {
              setDonorName(member.fullName);
            } else {
              setDonorName("");
            }
          } else {
            const errorData = await res.json();
            alert(`Payment success, but database sync failed: ${errorData.message}`);
          }
        } catch (error) {
          console.error("SYNC_ERROR:", error);
          alert("Failed to record donation in database.");
        } finally {
          setIsSubmitting(false);
        }
      },
      prefill: {
        name: donorName,
        email: member?.email || user?.email || "",
        contact: member?.phone || "",
      },
      theme: { color: "#1A365D" },
      modal: {
        ondismiss: function() {
          setIsSubmitting(false);
        }
      }
    };
    const rzp = new(window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Donate Now</h1>
        <p className="text-muted-foreground mt-1">Your generosity helps us make a difference in rural Araria.</p>
      </div>

      {/* Impact Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="glass-panel border-0 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Donors</p>
              <p className="text-2xl font-bold text-foreground">1,250+</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-0 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Raised</p>
              <p className="text-2xl font-bold text-foreground">₹12.5L+</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-0 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Active</p>
              <p className="text-2xl font-bold text-foreground">5 Projects</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donation Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass-panel border-0 shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-[#1A365D] mb-8 flex items-center gap-3">
              <CheckCircle className="text-green-500" /> Secure Contribution
            </h2>

            {/* Quick Amount Selection */}
            <div className="mb-8">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Quick Select Amount</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {quickAmounts.map(amt => (
                  <Button
                    key={amt}
                    variant={amount === String(amt) ? "default" : "outline"}
                    className={`rounded-xl h-12 font-bold transition-all ${amount === String(amt) ? 'bg-[#1A365D]' : ''}`}
                    onClick={() => setAmount(String(amt))}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Donation Amount (₹)</label>
                <Input
                  type="number"
                  placeholder="Enter custom amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-14 rounded-2xl border-slate-200 text-lg font-bold focus:ring-2 focus:ring-[#1A365D]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Full Name *</label>
                <Input
                  type="text"
                  placeholder="Name as per PAN"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">PAN Card Number *</label>
                <Input
                  type="text"
                  placeholder="ABCDE1234F"
                  value={panCardNumber}
                  onChange={(e) => setPanCardNumber(e.target.value.toUpperCase())}
                  className="h-12 rounded-xl uppercase"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Donation Purpose / Details</label>
                <Input
                  type="text"
                  placeholder="e.g. For Rural Healthcare Drive, General Support"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleDonate}
              disabled={isSubmitting || !amount || !donorName || !panCardNumber}
              className="w-full bg-[#1A365D] hover:bg-[#28a745] text-white rounded-2xl h-16 font-black uppercase tracking-[0.2em] text-xs shadow-2xl transition-all gap-3"
            >
              {isSubmitting ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <><Lock size={16} /> Pay Securely with Razorpay</>
              )}
            </Button>

            <div className="flex justify-center items-center gap-4 mt-6 text-[9px] font-black text-gray-400 uppercase tracking-widest">
              <span className="flex items-center gap-1"><TrendingUp size={12} className="text-green-500" /> 80G Tax Benefits</span>
              <span className="flex items-center gap-1"><Lock size={12} className="text-blue-500" /> SSL Encrypted</span>
            </div>
          </CardContent>
        </Card>

        {/* Why Donate / Trust Section */}
        <div className="space-y-6">
          <Card className="glass-panel border-0 shadow-lg bg-indigo-50/50">
            <CardContent className="p-6">
              <h3 className="text-sm font-black text-[#1A365D] uppercase tracking-widest mb-4 flex items-center gap-2">
                <Gift className="w-4 h-4" /> Why Donate?
              </h3>
              <ul className="space-y-4 text-xs font-medium text-slate-600">
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-green-600 font-bold">✓</div>
                  <span>Direct support to marginalized families in Bihar & Jharkhand.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-green-600 font-bold">✓</div>
                  <span>100% Transparency with monthly seva reports.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-green-600 font-bold">✓</div>
                  <span>Instant 80G digital receipts for Indian tax-payers.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}