import { useState } from 'react';
import VolunteerForm from '../components/VolunteerForm';
import RegisterModal from '../components/ngo/RegisterModal';
import { useAuth } from '../hooks/use-auth';

// Just drop the form in the middle of the page
export default function MemberApply() {
  const { user } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-10 bg-white shadow-xl">
        <div className="text-center space-y-5">
          <h2 className="text-2xl font-bold">Apply for Membership</h2>
          <p>You need to create an account to apply for membership.</p>
          <button
            onClick={() => setShowRegister(true)}
            className="bg-[#1A365D] text-white py-3 px-6 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-[#FBBF24] hover:text-[#1A365D] transition-all shadow-xl"
          >
            Create Account
          </button>
        </div>
        {showRegister && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Create Account</h3>
              <RegisterModal onClose={() => setShowRegister(false)} />
              <button
                onClick={() => setShowRegister(false)}
                className="mt-4 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white shadow-xl">
      <VolunteerForm onSuccess={() => alert("Application submitted successfully!")} />
    </div>
  );
}