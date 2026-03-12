import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Gift, Users, TrendingUp } from "lucide-react";

export default function DonateNow() {
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quickAmounts = [50, 100, 500, 1000, 5000];

  const handleDonate = async () => {
    if (!amount || !donorName) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseInt(amount),
          donorName
        })
      });

      if (response.ok) {
        alert("Thank you for your donation!");
        setAmount("");
        setDonorName("");
      }
    } catch (error) {
      alert("Failed to process donation");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Donate Now</h1>
        <p className="text-muted-foreground mt-1">Your generosity helps us make a difference. Every contribution matters.</p>
      </div>

      {/* Impact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="glass-panel border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Donors Supported</p>
                <p className="text-3xl font-display font-bold text-foreground mt-2">1,250+</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Raised</p>
                <p className="text-3xl font-display font-bold text-foreground mt-2">₹12.5L+</p>
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
                <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
                <p className="text-3xl font-display font-bold text-foreground mt-2">5</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donation Form */}
      <Card className="glass-panel border-0 max-w-2xl">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Make Your Contribution</h2>

          {/* Quick Amount Buttons */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-3">Quick Select</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {quickAmounts.map(amt => (
                <Button
                  key={amt}
                  variant={amount === String(amt) ? "default" : "outline"}
                  className="rounded-lg h-12 font-bold"
                  onClick={() => setAmount(String(amt))}
                >
                  ₹{amt.toLocaleString('en-IN')}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Custom Amount (₹ INR)</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 rounded-xl border-slate-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="h-12 rounded-xl border-slate-200"
              />
            </div>
          </div>

          {/* Donate Button */}
          <Button
            onClick={handleDonate}
            disabled={isSubmitting || !amount || !donorName}
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl h-12 font-bold text-lg shadow-lg shadow-red-500/25"
          >
            <Heart className="w-5 h-5 mr-2" />
            {isSubmitting ? "Processing..." : `Donate ₹${Number(amount || 0).toLocaleString('en-IN')}`}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Your donation is secure and will be recorded in our donation database.
          </p>
        </CardContent>
      </Card>

      {/* Why Donate Section */}
      <Card className="glass-panel border-0 max-w-2xl">
        <CardContent className="p-8">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-indigo-600" />
            Why Your Donation Matters
          </h3>
          <ul className="space-y-3 text-sm text-foreground">
            <li className="flex gap-3">
              <span className="text-indigo-600 font-bold">✓</span>
              <span>Every donation directly supports our community initiatives</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-600 font-bold">✓</span>
              <span>You receive official donation receipts for tax purposes</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-600 font-bold">✓</span>
              <span>Transparent tracking of how your contribution is utilized</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-600 font-bold">✓</span>
              <span>Join thousands of donors making a real impact</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
