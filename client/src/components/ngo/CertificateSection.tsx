import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Award, CheckCircle, 
  X, Download, Landmark, FileText, Globe, Info
} from 'lucide-react';

export default function CertificateSection() {
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const certificates = [
    {
      id: 'LEI',
      title: 'LEI Registration',
      location: 'Global Identifier',
      icon: Globe,
      pdfPath: '/LEI.pdf',
      desc: 'The Legal Entity Identifier (LEI) is a 20-digit code uniquely identifying Bharti Sewa Sadan Trust in the international financial system. It ensures high-level transparency for global transactions and collaborations.',
      details: [
        { label: 'LEI Code', value: '984500BE2B82A1D66405' },
        { label: 'Status', value: 'ISSUED / ACTIVE' },
        { label: 'Reg Authority', value: 'NGO-DARPAN' }
      ]
    },
    {
      id: '80G',
      title: '80G Tax Exemption',
      location: 'Income Tax Dept',
      icon: ShieldCheck,
      pdfPath: '/80G Certificate.pdf', 
      desc: 'This certificate allows our donors to claim a 50% tax deduction on their contributions. It makes supporting our medical missions financially efficient and encourages philanthropic Seva.',
      details: [
        { label: 'URN', value: 'AACTB3060FF20219' },
        { label: 'Benefit', value: '50% Tax Rebate' }
      ]
    },
    {
      id: '12A',
      title: '12A Registration',
      location: 'Trust Authenticity',
      icon: Landmark,
      pdfPath: '/12A Certificateer.pdf',
      desc: 'Foundational proof that BSST is a recognized non-profit entity. This grants us tax-exempt status, ensuring 100% of funds are used strictly for the health of marginalized people.',
      details: [
        { label: 'PAN', value: 'AACTB3060F' },
        { label: 'Registration', value: '27-05-2021' }
      ]
    },
    {
      id: 'ISO',
      title: 'ISO 9001:2015',
      location: 'Quality Standards',
      icon: Award,
      pdfPath: '/ISO Certificate.pdf',
      desc: 'International certification for Quality Management. It verifies that our hospitals and social welfare services meet global benchmarks for operational excellence and safety.',
      details: [
        { label: 'Cert No', value: 'QMS/21N1522' },
        { label: 'Scope', value: 'Health & Medical' }
      ]
    },
    {
      id: 'MSME',
      title: 'Udyam Registration',
      location: 'Govt. Recognized',
      icon: CheckCircle,
      pdfPath: '/Print _ Udyam Registration Certificate BHARTI SEWA.pdf',
      desc: 'Recognizes BSST as a Micro enterprise under the Ministry of MSME. It validates our operational infrastructure for providing healthcare and educational support services.',
      details: [
        { label: 'Udyam No', value: 'UDYAM-BR-01-0001719' },
        { label: 'Category', value: 'Micro Enterprise' }
      ]
    }
  ];

  return (
    <section id="compliance" className="py-20 bg-[#1A365D] text-white overflow-hidden border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <h2 className="text-3xl font-black uppercase tracking-widest text-[#FBBF24]">
          Legal <span className="text-white">& Quality Compliance</span>
        </h2>
        <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
          Official Verifications & Government Registrations
        </p>
      </div>

      <div className="flex relative group">
        <motion.div 
          animate={{ x: ["-50%", "0%"] }} 
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }} 
          className="flex gap-6 whitespace-nowrap py-4"
        >
          {[...certificates, ...certificates].map((cert, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedCert(cert)}
              className="w-[280px] bg-white/10 backdrop-blur-md p-6 rounded-[1.5rem] border border-white/20 inline-block shrink-0 shadow-lg hover:bg-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-[#FBBF24] rounded-xl flex items-center justify-center text-[#1A365D]">
                  <cert.icon size={20} />
                </div>
                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">
                  Document 0{ (index % certificates.length) + 1 }
                </span>
              </div>
              
              <h4 className="text-sm font-bold mb-1 uppercase tracking-tight text-white whitespace-normal leading-tight">
                {cert.title}
              </h4>
              
              <p className="text-[10px] text-[#FBBF24] font-medium uppercase tracking-widest flex items-center gap-1">
                <FileText size={10} /> {cert.location}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1A365D] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1A365D] to-transparent z-10" />
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#1A365D]/95 backdrop-blur-xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            {/* --- SINGLE COLUMN MODAL (No Sidebar) --- */}
            <motion.div 
              className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl relative p-8 md:p-12"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
            >
              <button 
                onClick={() => setSelectedCert(null)} 
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
              >
                <X size={24}/>
              </button>

              <div className="flex flex-col text-[#1A365D]">
                <div className="mb-8">
                  <div className="w-12 h-12 bg-[#FBBF24]/10 rounded-xl flex items-center justify-center text-[#FBBF24] mb-4">
                    <selectedCert.icon size={24} />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">{selectedCert.title}</h3>
                  <div className="w-12 h-1.5 bg-[#FBBF24] rounded-full" />
                </div>

                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A365D] rounded text-white text-[10px] font-black uppercase tracking-widest mb-4">
                    <Info size={12} /> What does this work?
                  </div>
                  <p className="text-gray-600 font-medium leading-relaxed italic text-base">
                    "{selectedCert.desc}"
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4 mb-8 border border-gray-100">
                  {selectedCert.details.map((d:any, i:number) => (
                    <div key={i} className="flex justify-between border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{d.label}</span>
                      <span className="text-sm font-bold uppercase">{d.value}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a 
                    href={selectedCert.pdfPath} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border-2 border-[#1A365D] text-[#1A365D] py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-50 transition-all"
                  >
                    <FileText size={16} /> View Document
                  </a>
                  <a 
                    href={selectedCert.pdfPath} 
                    download 
                    className="flex items-center justify-center gap-2 bg-[#1A365D] text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#FBBF24] hover:text-[#1A365D] transition-all shadow-lg"
                  >
                    <Download size={16} /> Download PDF
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}