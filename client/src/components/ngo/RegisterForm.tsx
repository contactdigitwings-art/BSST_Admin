import { useRef, useState } from 'react';
import { Send } from 'lucide-react';

export default function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.current) return;
    const fd = new FormData(form.current);

    const name = fd.get('name') as string;
    const email = fd.get('email') as string;
    const password = fd.get('password') as string;

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.ok) {
        form.current?.reset();
        if (onSuccess) onSuccess();
      } else {
        const err = await response.json().catch(() => ({ message: 'Registration failed' }));
        alert(err.message || 'Registration failed. Please try again.');
      }
    } catch {
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit} className="space-y-5">
      <InputField name="name" label="Full Name *" type="text" required placeholder="Your Name" />
      <InputField name="email" label="Email Address *" type="email" required placeholder="email@test.com" />
      <InputField name="password" label="Password *" type="password" required placeholder="Password" />

      <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-[#1A365D] text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#FBBF24] hover:text-[#1A365D] transition-all shadow-xl disabled:opacity-50">
        <Send size={16} />
        {isSubmitting ? "Creating Account..." : "Create Account"}
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