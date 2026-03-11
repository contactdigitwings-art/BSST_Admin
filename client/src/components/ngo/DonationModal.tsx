import { X, Building2, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const bankAccounts = [
    {
      bank: 'State Bank of India (FCRA)',
      accountNo: '40198361814',
      branch: 'New Delhi Main Branch',
      purpose: 'Foreign Contributions',
    },
    {
      bank: 'Union Bank of India',
      accountNo: 'Contact for details',
      branch: 'Araria Branch',
      purpose: 'General Donations',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-gradient-to-r from-[#0056b3] to-[#28a745] text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Support Our Mission</h2>
                    <p className="text-sm text-white/90 mt-1">Your contribution makes a difference</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Our Impact</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-bold text-[#0056b3]">50,000+</p>
                      <p className="text-sm text-gray-600">Beneficiaries</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-[#28a745]">25,000+</p>
                      <p className="text-sm text-gray-600">Patients Served</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Building2 className="mr-2 text-[#0056b3]" size={20} />
                    Bank Account Details
                  </h3>
                  <div className="space-y-4">
                    {bankAccounts.map((account, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{account.bank}</h4>
                            <p className="text-sm text-gray-600">{account.purpose}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                            <div>
                              <p className="text-xs text-gray-600">Account Number</p>
                              <p className="font-mono font-semibold text-gray-900">{account.accountNo}</p>
                            </div>
                            {account.accountNo !== 'Contact for details' && (
                              <button
                                onClick={() => copyToClipboard(account.accountNo, `account-${index}`)}
                                className="p-2 hover:bg-gray-200 rounded transition-colors"
                              >
                                {copiedField === `account-${index}` ? (
                                  <Check size={18} className="text-green-600" />
                                ) : (
                                  <Copy size={18} className="text-gray-600" />
                                )}
                              </button>
                            )}
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-xs text-gray-600">Branch</p>
                            <p className="font-semibold text-gray-900">{account.branch}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-[#28a745]">90% of resources</span> are directed toward programs and beneficiaries. Your donation directly impacts lives through healthcare, education, and empowerment initiatives.
                  </p>
                </div>

                <div className="text-center text-sm text-gray-600">
                  For more information, contact us at{' '}
                  <a href="mailto:bsstbihar@gmail.com" className="text-[#0056b3] hover:underline font-medium">
                    bsstbihar@gmail.com
                  </a>
                  {' '}or call{' '}
                  <a href="tel:+917782833655" className="text-[#0056b3] hover:underline font-medium">
                    +91 7782833655
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
