import { useState } from 'react';
import NgoHeader from './NgoHeader';
import NgoFooter from './NgoFooter';
import DonationModal from './DonationModal';
import NgoScrollToTop from './NgoScrollToTop';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <NgoScrollToTop />
      <NgoHeader onDonateClick={() => setIsDonationModalOpen(true)} />
      <main className="flex-grow">
        {children}
      </main>
      <NgoFooter />
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </div>
  );
}
