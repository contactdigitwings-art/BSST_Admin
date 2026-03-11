import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, ShieldCheck, Stethoscope, School, Soup, 
  Landmark, QrCode, IndianRupee, Users, Activity,
  CheckCircle, Lock
} from 'lucide-react';

export default function DonateNowPg() {
  const [amount, setAmount] = useState<number>(1500);
  const [isCustom, setIsCustom] = useState(false);
  const [need80G, setNeed80G] = useState(false);
  
  const presetAmounts = [80000, 75000, 15000, 3000, 1500, 500];

  const impactStats = [
    { label: "Total Seva (24-25)", value: "₹52,77,660", icon: IndianRupee },
    { label: "Hospital Care", value: "₹39,79,196", icon: Stethoscope },
    { label: "Health Awareness", value: "₹1,05,262", icon: Activity },
    { label: "Poverty Alleviation", value: "₹87,240", icon: Soup },
    { label: "Educational Seva", value: "₹80,260", icon: School },
    { label: "Vocational Skill", value: "₹80,590", icon: Users },
  ];

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const options = {
      key: "rzp_test_SL3UGZ6tTW3kqq", 
      amount: amount * 100, // Razorpay takes amount in paise
      currency: "INR",
      name: "Bharti Sewa Sadan Trust",
      description: "Donation for Rural Seva",
      image: "/bhartilogo.jpg", 
      handler: function (response: any) {
        window.location.href = "/success";
      },
      prefill: {
        name: (document.getElementById('donorName') as HTMLInputElement)?.value || "",
        email: (document.getElementById('donorEmail') as HTMLInputElement)?.value || "",
      },
      theme: { color: "#1A365D" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20">
      {/* --- HERO SECTION --- */}
      <section className="bg-[#1A365D] text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 px-4">
          <Heart className="mx-auto mb-4 text-[#FBBF24] animate-pulse" size={40} />
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">Transform Lives</h1>
          <p className="text-white/60 font-black uppercase tracking-[0.2em] text-xs md:text-sm">Empowering Araria Through Your Support</p>
        </motion.div>
      </section>

      {/* --- IMPACT RECORD --- */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-[#1A365D] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden">
          {impactStats.map((stat, i) => (
            <div key={i} className="p-6 text-center border-r border-white/5 last:border-0">
              <stat.icon size={20} className="text-[#FBBF24] mx-auto mb-2" />
              <p className="text-white font-black tracking-tighter">{stat.value}</p>
              <p className="text-white/40 text-[8px] font-bold uppercase tracking-widest leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- DONATION FORM --- */}
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <form onSubmit={handlePayment} className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100">
          <h2 className="text-2xl font-black text-[#1A365D] uppercase tracking-tight mb-8 flex items-center gap-3">
            <CheckCircle className="text-[#28a745]" /> Support a Cause
          </h2>

          {/* Amount Selection */}
          <div className="mb-10">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Choose Donation Amount (₹)</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => { setAmount(amt); setIsCustom(false); }}
                  className={`py-3 rounded-xl text-xs font-bold transition-all border-2 ${
                    amount === amt && !isCustom ? 'bg-[#1A365D] text-white border-[#1A365D]' : 'bg-gray-50 text-gray-600 border-transparent hover:border-gray-200'
                  }`}
                >
                  ₹{amt.toLocaleString()}
                </button>
              ))}
            </div>
            <input 
              type="number"
              placeholder="Enter Other Amount"
              onChange={(e) => { setAmount(Number(e.target.value)); setIsCustom(true); }}
              className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#FBBF24] outline-none font-bold text-sm"
            />
          </div>

          {/* Donor Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name *</label>
              <input id="donorName" required type="text" placeholder="e.g. John Doe" className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-sm font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address *</label>
              <input id="donorEmail" required type="email" placeholder="john@example.com" className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-sm font-medium" />
            </div>
          </div>

          {/* 80G Certificate Toggle */}
          <div className="bg-[#FAF9F6] p-6 rounded-[2rem] border border-gray-100 mb-10">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={need80G} 
                onChange={(e) => setNeed80G(e.target.checked)}
                className="w-5 h-5 rounded accent-[#28a745]" 
              />
              <span className="text-sm font-bold text-[#1A365D] group-hover:text-[#28a745] transition-colors">I would like to receive an 80(G) Certificate</span>
            </label>
            
            {need80G && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 grid gap-4">
                <input required placeholder="PAN Card Number" className="w-full p-4 bg-white rounded-xl text-sm border border-gray-200 outline-none" />
                <textarea required placeholder="Full Residential Address" className="w-full p-4 bg-white rounded-xl text-sm border border-gray-200 outline-none h-24" />
              </motion.div>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-[#1A365D] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-[#28a745] transition-all shadow-xl"
          >
            <Lock size={16} /> Donate Now via Razorpay
          </button>
          
          <div className="mt-6 flex justify-center gap-6 text-[9px] font-black text-gray-400 uppercase tracking-widest">
             <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-[#28a745]" /> 80G Tax Exempt</span>
             <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-[#28a745]" /> Secured by Razorpay</span>
          </div>
        </form>
      </div>
    </div>
  );
}