import { Heart, Mail, Phone, MapPin, Globe, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';;

export default function Footer() {
  return (
    <footer className="relative bg-[#1A365D] text-gray-300 overflow-hidden border-t-8 border-[#FBBF24]">
      
      {/* --- BACKGROUND IMAGE: BIHAR MAP --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/bh.png" 
          alt="Bihar Map Background" 
          className="w-full h-full object-cover opacity-20 filter grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A365D]/90 via-[#1A365D]/40 to-[#1A365D]/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          
          {/* Section 1: Brand & Identity */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-[1.2rem] flex items-center justify-center shadow-2xl border-2 border-[#FBBF24] overflow-hidden">
                <img 
                  src="/bhartilogo.jpg" 
                  alt="BSST Logo" 
                  className="w-full h-full object-contain p-1" 
                />
              </div>
              <div>
                <h3 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">BSST</h3>
                <div className="flex gap-1 mt-2">
                  <div className="w-8 h-1 bg-[#FBBF24] rounded-full"></div>
                  <div className="w-1.5 h-1 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            
            <p className="text-md leading-relaxed text-gray-100 max-w-sm font-medium italic">
              "Providing measurable and lasting impact by empowering underprivileged communities across Bihar and West Bengal since 2014."
            </p>
            
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center space-x-3 text-[10px] font-black text-[#FBBF24] uppercase tracking-widest">
                <Shield size={16} />
                <span>REG ID: 15/2014 (BSST-Trust)</span>
              </div>
              <div className="flex items-center space-x-3 text-[10px] font-black text-white/60 uppercase tracking-widest">
                <Globe size={16} />
                <span>DARPAN ID: BR/2017/0161719</span>
              </div>
            </div>
          </div>

          {/* Section 2: Quick Navigation */}
          <div className="md:pl-10">
            <h4 className="text-white font-black text-xl mb-2 uppercase tracking-tighter">Quick Navigation</h4>
            <div className="flex gap-1 mb-8">
              <div className="w-10 h-1 bg-[#FBBF24] rounded-full"></div>
              <div className="w-2 h-1 bg-white rounded-full"></div>
            </div>
            
            <ul className="grid grid-cols-1 gap-y-4">
              {['Home', 'About Us', 'Departments', 'Audit Report', 'Gallery', 'Contact Us', 'Donate Now'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`} 
                    className="text-[11px] font-black uppercase tracking-widest hover:text-[#FBBF24] transition-all flex items-center group text-white/70"
                  >
                    <ArrowRight size={14} className="mr-3 text-[#FBBF24] opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Official Contact */}
          <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 backdrop-blur-2xl shadow-2xl border-b-8 border-b-[#FBBF24]">
            <h4 className="text-[#FBBF24] font-black text-xl mb-2 uppercase tracking-tighter">Official HQ</h4>
            <div className="flex gap-1 mb-8">
              <div className="w-10 h-1 bg-[#FBBF24] rounded-full"></div>
              <div className="w-2 h-1 bg-white rounded-full"></div>
            </div>

            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="bg-white/10 p-2 rounded-xl">
                  <MapPin size={20} className="text-[#FBBF24] shrink-0" />
                </div>
                <span className="text-xs leading-relaxed text-white font-black uppercase tracking-tight">
                  Shivpuri, Ward No-09, Araria, Bihar - 854311
                </span>
              </li>
              <li className="flex items-start space-x-4">
                <div className="bg-white/10 p-2 rounded-xl">
                  <Phone size={18} className="text-[#28a745] shrink-0" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-white tracking-tighter">+91 77828 33655</span>
                  <span className="text-sm font-black text-white tracking-tighter">+91 88253 40183</span>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <div className="bg-white/10 p-2 rounded-xl">
                  <Mail size={18} className="text-[#FBBF24] shrink-0" />
                </div>
                {/* Email in Lowercase */}
                <span className="text-xs text-white/60 font-medium lowercase tracking-normal truncate">dr.rnk.bharti@gmail.com</span>
              </li>
            </ul>
            
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <span className="inline-block bg-[#28a745] text-white text-[9px] px-5 py-2 rounded-full font-black tracking-[0.2em] uppercase shadow-2xl">
                80G Tax Exempted NGO
              </span>
            </div>
          </div>
        </div>

        {/* --- COPYRIGHT BAR --- */}
        <div className="border-t border-white/10 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black tracking-[0.3em] text-white/20 uppercase">
          <p>© 2026 Bharti Sewa Sadan Trust. A Mission For Rural Bihar.</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            <Link href="/privacypolicy" className="hover:text-[#FBBF24] transition-colors">Privacy Policy</Link>
            <Link href="/auditreport" className="hover:text-[#FBBF24] transition-colors">Financial Transparency</Link>
            <Link href="/contactus" className="hover:text-[#FBBF24] transition-colors">Partner With Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}