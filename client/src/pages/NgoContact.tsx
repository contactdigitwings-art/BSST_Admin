import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Building2, Clock, ShieldCheck, Calendar, Activity, GraduationCap } from 'lucide-react';

export default function Contact() {
  const headquarters = {
    name: 'Official Headquarters',
    address: 'Village Shivpuri, Ward No-09, Bhudan, Near Church, Araria, Bihar - 854311',
    phones: ['+91 7782833655', '+91 8825340183'],
    emails: ['dr.rnk.bharti@gmail.com', 'bsstbihar@gmail.com'],
  };

  const branches = [
    { location: 'Dumka, Jharkhand', type: 'Regional Hub' },
    { location: 'Khagaria, Bihar', type: 'Community Centre' },
    { location: 'Banka, Bihar', type: 'Development Unit' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* --- CONDENSED HERO SECTION --- */}
      <section className="relative bg-[#1A365D] text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-4">
              <Activity size={14} className="text-[#FBBF24] animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FBBF24]">Connect With BSST</span>
            </div>

            {/* --- COMPACT FONT PATTERN --- */}
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2 leading-[0.85]">
              Reach Our <span className="text-[#FBBF24]">Team</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 font-black uppercase tracking-[0.2em] mb-6">
              Serving Araria and Rural Bihar Since 2014
            </p>

            {/* Two-Tone Accent Bar */}
            <div className="flex justify-center gap-1">
              <div className="w-10 h-1.5 bg-[#FBBF24] rounded-full"></div>
              <div className="w-2 h-1.5 bg-white rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT INFO SECTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: HQ Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex flex-col">
                <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] leading-[0.9] uppercase tracking-tighter">
                  Main Hospital <br />
                  <span className="text-[#FBBF24]">Office</span>
                </h2>
                <div className="flex gap-1 mt-6">
                  <div className="w-12 h-1.5 bg-[#FBBF24] rounded-full"></div>
                  <div className="w-2 h-1.5 bg-[#1A365D] rounded-full"></div>
                </div>
              </div>

              <div className="bg-[#FAF9F6] rounded-[2.5rem] p-10 border border-gray-100 shadow-sm border-b-8 border-b-[#FBBF24]">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 bg-[#1A365D] rounded-2xl flex items-center justify-center text-[#FBBF24] shadow-lg">
                    <Building2 size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#1A365D] uppercase tracking-tight leading-none mb-1">{headquarters.name}</h3>
                    <p className="text-[#28a745] font-black text-[10px] uppercase tracking-widest">Bharti Sewa Sadan Trust</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex gap-5 group">
                    <MapPin className="text-[#FBBF24] shrink-0" size={24} />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Official Address</p>
                      <p className="text-gray-700 font-bold leading-relaxed">{headquarters.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-5 group">
                    <Phone className="text-[#28a745] shrink-0" size={24} />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Direct Help-Line</p>
                      {headquarters.phones.map((phone, index) => (
                        <a key={index} href={`tel:${phone}`} className="block text-2xl font-black text-[#1A365D] hover:text-[#28a745] transition-colors tracking-tighter">{phone}</a>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-5 group">
                    <Mail className="text-[#1A365D] shrink-0" size={24} />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email Inquiries</p>
                      {headquarters.emails.map((email, index) => (
                        <a key={index} href={`mailto:${email}`} className="block text-gray-600 font-bold hover:text-[#FBBF24] transition-colors">{email}</a>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <Clock className="text-[#FBBF24] shrink-0" size={24} />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Operational Hours</p>
                      <p className="text-gray-700 font-black uppercase text-sm">Mon - Sat: 09:00 AM - 06:00 PM</p>
                      <p className="text-[11px] text-[#28a745] font-black uppercase tracking-widest mt-1">Sunday: Emergency Only</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Branches */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex flex-col">
                <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] leading-[0.9] uppercase tracking-tighter">
                  Regional <span className="text-[#FBBF24]">Branches</span>
                </h2>
                <div className="flex gap-1 mt-6">
                  <div className="w-12 h-1.5 bg-[#FBBF24] rounded-full"></div>
                  <div className="w-2 h-1.5 bg-[#1A365D] rounded-full"></div>
                </div>
              </div>

              <div className="grid gap-4">
                {branches.map((branch, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, borderLeftColor: '#FBBF24' }}
                    className="bg-white p-6 rounded-3xl border-2 border-gray-100 flex items-center gap-6 hover:shadow-xl transition-all border-l-8"
                  >
                    <div className="w-12 h-12 bg-[#1A365D] rounded-xl flex items-center justify-center text-[#FBBF24] shrink-0">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-[#1A365D] uppercase tracking-tighter">{branch.location}</h4>
                      <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">{branch.type}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-[#1A365D] rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">Visit BSST <br /><span className="text-[#FBBF24]">Hospital</span></h3>
                <p className="text-white/70 font-medium leading-relaxed mb-8 italic">
                  "We welcome donors and partners to visit our main facility in Araria to see our healthcare impact firsthand."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- ADDITIONAL TRUST INFO --- */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="space-y-4">
                <ShieldCheck className="text-[#28a745]" size={32} />
                <div>
                  <h4 className="font-black text-[#1A365D] uppercase text-xs mb-2">Legal Status</h4>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Reg ID: 15/2014</p>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Darpan: BR/2017/0161719</p>
                </div>
              </div>
              <div className="space-y-4">
                <Calendar className="text-[#1A365D]" size={32} />
                <div>
                  <h4 className="font-black text-[#1A365D] uppercase text-xs mb-2">Established</h4>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Founded: 2014</p>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Founder: Dr. R.N. Bharti</p>
                </div>
              </div>
              <div className="space-y-4">
                <MapPin className="text-[#FBBF24]" size={32} />
                <div>
                  <h4 className="font-black text-[#1A365D] uppercase text-xs mb-2">Service Areas</h4>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Primary: Bihar</p>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Region: Jharkhand</p>
                </div>
              </div>
              <div className="space-y-4">
                <GraduationCap className="text-[#28a745]" size={32} />
                <div>
                  <h4 className="font-black text-[#1A365D] uppercase text-xs mb-2">Focus Sectors</h4>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Healthcare</p>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Education</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- INTERACTIVE MAP SECTION --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#1A1A1A] leading-[0.9]">
                Live <span className="text-[#FBBF24]">Location</span>
              </h2>
              <div className="flex gap-1 mt-6">
                <div className="w-12 h-1.5 bg-[#FBBF24] rounded-full"></div>
                <div className="w-2 h-1.5 bg-[#1A365D] rounded-full"></div>
              </div>
            </div>
           
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full h-[450px] rounded-[3rem] overflow-hidden border-8 border-[#FAF9F6] shadow-2xl relative group"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114674.52047391782!2d87.41113061453412!3d26.115859345511855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef673752e04369%3A0xe54d8966f35a9602!2sAraria%2C%20Bihar!5e0!3m2!1sen!2sin!4v1715456345678!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                title="BSST Hospital Location"
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
              ></iframe>
              
              <div className="absolute bottom-6 left-6 bg-[#1A365D] p-6 rounded-[2rem] shadow-2xl text-white border border-white/10 hidden md:block max-w-xs">
                <div className="flex items-start gap-4">
                  <div className="bg-[#FBBF24] p-3 rounded-xl text-[#1A365D] animate-bounce">
                    <MapPin size={20} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#FBBF24] mb-1">Our H.Q.</p>
                    <p className="text-xs font-black leading-tight uppercase">
                      Shivpuri, Ward No-09, Araria, Bihar 854311
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}