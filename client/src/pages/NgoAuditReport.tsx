import { motion } from 'framer-motion';
import { 
  FileText, CheckCircle, Download, Lock, Building, Shield, FileCheck 
} from 'lucide-react';

export default function AuditReport() {
  const auditReports = [
    {
      year: '2024-2025',
      auditor: 'Gaurav Shiv & Associates',
      status: 'Verified',
      file: '/audit/twentyfive.pdf', 
      highlights: 'Managed ₹52.7L budget with a focus on Rural Health and Poverty Alleviation.',
    },
    {
      year: '2023-2024',
      auditor: 'Gaurav Shiv & Associates',
      status: 'Verified',
      file: '/audit/twentyfour.pdf', 
      highlights: 'Expanded vocational training programs with high resource transparency.',
    },
    {
      year: '2022-2023',
      auditor: 'Ankit Raj & Company',
      status: 'Verified',
      file: '/audit/twentythree.pdf',
      highlights: 'Strong emphasis on Swachh Bharat and local community skill development.',
    },
    {
      year: '2021-2022',
      auditor: 'Ankita Singh & Company',
      status: 'Verified',
      file: '/audit/twentytwo.pdf',
      highlights: '97% fund utilization toward direct medical care and nursing services.',
    },
    {
      year: '2020-2021',
      auditor: 'Randheer Kumar & Co.',
      status: 'Verified',
      file: '/audit/twentyone.pdf',
      highlights: 'Critical focus on COVID-19 awareness and rural sanitation infrastructure.',
    },
  ];

  const complianceBadges = [
    { label: "NGO Darpan", id: "BR/2017/0161719", icon: Building },
    { label: "Tax Exemption", id: "80G Certified", icon: FileCheck },
    { label: "Registration", id: "15/2014", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] w-full overflow-x-hidden">
      {/* --- HERO SECTION (MATCHED TO GLOBAL PATTERN) --- */}
      <section className="relative bg-[#1A365D] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-4">
              <Lock size={14} className="text-[#FBBF24]" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FBBF24]">Secure & Transparent</span>
            </div>

            {/* --- FONT PATTERN: UPPERCASE + YELLOW ACCENT --- */}
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2 leading-[0.85]">
              Financial <span className="text-[#FBBF24]">Integrity</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 font-black uppercase tracking-[0.2em] mb-6">
              100% Transparency In Rural Impact
            </p>

            {/* Two-Tone Accent Bar */}
            <div className="flex justify-center gap-1">
              <div className="w-10 h-1.5 bg-[#FBBF24] rounded-full"></div>
              <div className="w-2 h-1.5 bg-white rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- COMPLIANCE STRIP --- */}
      <div className="max-w-5xl mx-auto -mt-10 relative z-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {complianceBadges.map((badge, i) => (
            <div 
              key={i}
              className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100 hover:border-[#FBBF24]/50 transition-colors"
            >
              <div className="w-12 h-12 bg-[#FBBF24]/10 rounded-xl flex items-center justify-center text-[#1A365D] flex-shrink-0">
                <badge.icon size={24} />
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{badge.label}</p>
                <p className="text-xs font-black text-[#1A365D] uppercase">{badge.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MAIN AUDIT SECTION --- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center md:text-left mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] leading-tight uppercase tracking-tighter">
              Annual <span className="text-[#FBBF24]">Audit</span> Reports
            </h2>
            <div className="flex gap-1 mt-4 mb-6">
              <div className="w-12 h-1.5 bg-[#FBBF24] rounded-full"></div>
              <div className="w-2 h-1.5 bg-[#1A365D] rounded-full"></div>
            </div>
            <p className="text-gray-500 font-medium max-w-2xl italic">
              Independently audited by certified Chartered Accountants to ensure absolute regulatory compliance and donor trust.
            </p>
          </div>

          <div className="space-y-6">
            {auditReports.map((report, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-white rounded-[2.5rem] p-6 md:p-8 border border-gray-200 hover:border-[#FBBF24] hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex gap-6 items-start">
                    <div className="w-16 h-16 bg-[#1A365D] rounded-[1.2rem] flex items-center justify-center text-[#FBBF24] flex-shrink-0 group-hover:scale-110 transition-transform">
                      <FileText size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[#1A365D] uppercase tracking-tighter mb-1">FY {report.year}</h3>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-3">
                        Auditor: {report.auditor}
                      </p>
                      <div className="flex items-start gap-2 text-[#28a745] font-bold text-sm leading-snug">
                        <CheckCircle size={16} className="shrink-0 mt-0.5" />
                        <span>{report.highlights}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <a 
                      href={report.file} 
                      download 
                      className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#1A365D] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#FBBF24] hover:text-[#1A365D] transition-all shadow-lg"
                    >
                      <Download size={16} />
                      Download PDF
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRANSPARENCY BLOCK --- */}
      <section className="py-10 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#FAF9F6] p-8 md:p-12 rounded-[3rem] border-2 border-dashed border-gray-200 text-center hover:border-[#FBBF24] hover:bg-white hover:shadow-2xl transition-all duration-500 group"
          >
            <h3 className="text-3xl font-black text-[#1A365D] mb-4 uppercase tracking-tighter">
              The <span className="text-[#FBBF24]">90%</span> Efficiency Rule
            </h3>
            
            <p className="text-md text-gray-500 font-medium leading-relaxed mb-8 italic">
              "Over 90% of every donation goes directly to hospital infrastructure, mobile health unit operations, and critical patient medicines."
            </p>
            
            <div className="inline-flex items-center gap-2 bg-[#28a745]/10 text-[#28a745] px-6 py-2 rounded-full border border-[#28a745]/20 font-black text-[10px] uppercase tracking-widest">
              <Shield size={14} className="group-hover:animate-pulse" />
              CA Verified Accuracy
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section className="py-20 text-center px-4 bg-[#FAF9F6]">
        <h2 className="text-3xl font-black text-[#1A365D] uppercase tracking-tighter mb-8">Questions about <span className="text-[#FBBF24]">finances?</span></h2>
        <a href="mailto:dr.rnk.bharti@gmail.com" className="bg-[#1A365D] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-[#FBBF24] hover:text-[#1A365D] transition-all shadow-xl">
          Contact Finance Dept
        </a>
      </section>
    </div>
  );
}