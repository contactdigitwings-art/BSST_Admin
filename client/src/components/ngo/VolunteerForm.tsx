import { useRef, useState } from 'react';
import { Send } from 'lucide-react';

export default function VolunteerForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.current) return;
    const fd = new FormData(form.current);

    const full_name = fd.get('full_name') as string;
    const email = fd.get('email') as string;
    const phone = fd.get('phone') as string;
    const gender = fd.get('gender') as string;
    const age = fd.get('age') as string;
    const address = fd.get('address') as string;
    const project_area = fd.get('project_area') as string;

    try {
      const response = await fetch('/api/members/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: full_name,
          email,
          phone,
          gender,
          age: parseInt(age),
          address,
          projectArea: project_area,
        }),
      });

      if (response.ok) {
        form.current?.reset();
        if (onSuccess) onSuccess();
      } else {
        const err = await response.json().catch(() => ({ message: 'Submission failed' }));
        alert(err.message || 'Submission failed. Please try again.');
      }
    } catch {
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="date" value={new Date().toLocaleDateString()} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField name="full_name" label="Full Name *" type="text" required placeholder="Name" />
        <InputField name="email" label="Email Address *" type="email" required placeholder="email@test.com" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField name="phone" label="Phone Number *" type="tel" required placeholder="+91" />
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Gender *</label>
          <select name="gender" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FBBF24] transition-all">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <InputField name="age" label="Age *" type="number" required placeholder="Age" />
      </div>

      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Address *</label>
        <textarea name="address" required rows={2} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FBBF24] transition-all resize-none" placeholder="Address" />
      </div>

      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Project Area *</label>
        <select name="project_area" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FBBF24] transition-all">
          <option value="">Select Area</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Social Welfare">Social Welfare</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-[#1A365D] text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#FBBF24] hover:text-[#1A365D] transition-all shadow-xl disabled:opacity-50">
        <Send size={16} />
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}

function InputField({ label, name, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">{label}</label>
      <input name={name} {...props} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FBBF24] transition-all" />
    </div>
  );
}
