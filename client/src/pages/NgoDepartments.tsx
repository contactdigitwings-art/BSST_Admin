import { motion } from 'framer-motion';
import { 
  Stethoscope, Scissors, Baby, Heart, Bone, Eye, 
  Truck, MapPin, Activity, ShieldCheck, Microscope, 
  ChevronRight, Thermometer, Pill
} from 'lucide-react';

export default function Departments() {
  const departments = [
    {
      icon: Stethoscope,
      name: 'General Medicine',
      description: 'The backbone of our hospital, providing 24/7 consultation and primary care for rural families.',
      services: ['Daily OPD', 'Chronic Care', 'Diagnosis'],
      color: 'bg-blue-500'
    },
    {
      icon: Heart,
      name: 'Gynecology',
      description: 'Focused on maternal health and safe deliveries to reduce rural infant mortality rates.',
      services: ['Prenatal Care', 'Labor Room', 'Postnatal'],
      color: 'bg-rose-500'
    },
    {
      icon: Baby,
      name: 'Pediatrics',
      description: 'Dedicated child healthcare ensuring the next generation grows up healthy and strong.',
      services: ['Vaccinations', 'Nutrition', 'NICU Support'],
      color: 'bg-amber-500'
    },
    {
      icon: Scissors,
      name: 'General Surgery',
      description: 'Modern surgical theater equipped for minor and major procedures with expert surgeons.',
      services: ['Minor OT', 'Trauma Care', 'Surgery'],
      color: 'bg-emerald-500'
    },
    {
      icon: Microscope,
      name: 'Diagnostics',
      description: 'In-house pathology lab providing accurate testing for malaria, typhoid, and basic panels.',
      services: ['Blood Tests', 'Pathology', 'Reports'],
      color: 'bg-indigo-500'
    },
    {
      icon: Pill,
      name: 'Pharmacy',
      description: 'On-site pharmacy providing life-saving medications at subsidized rates for the poor.',
      services: ['Subsidized Meds', '24/7 Supply', 'Quality'],
      color: 'bg-purple-500'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
   {/* --- CONDENSED HERO SECTION (MATCHED TO ABOUT PAGE HEIGHT) --- */}
   <section className="relative bg-[#1A365D] text-white py-16 md:py-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Minimal Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-4">
              <Activity size={14} className="text-[#FBBF24] animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FBBF24]">Excellence In Service</span>
            </div>

            {/* --- COMPACT FONT PATTERN --- */}
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2 leading-[0.85]">
              Specialized <span className="text-[#FBBF24]">Care</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 font-black uppercase tracking-[0.2em] mb-6">
              Healthcare For Rural Bihar
            </p>

            {/* Two-Tone Accent Bar - Centered & Slim */}
            <div className="flex justify-center gap-1">
              <div className="w-10 h-1.5 bg-[#FBBF24] rounded-full"></div>
              <div className="w-2 h-1.5 bg-white rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- BENTO GRID DEPARTMENTS --- */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
              >
                <div className={`absolute -right-4 -top-4 w-24 h-24 ${dept.color} opacity-[0.03] rounded-full group-hover:scale-[10] transition-transform duration-700`}></div>

                <div className="relative z-10">
                  <div className={`w-14 h-14 ${dept.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg transform group-hover:rotate-[10deg] transition-transform`}>
                    <dept.icon className="text-white" size={28} />
                  </div>
                  
                  <h3 className="text-2xl font-black text-[#1A365D] mb-4 group-hover:text-[#FBBF24] transition-colors uppercase tracking-tighter leading-none">
                    {dept.name}
                  </h3>
                  
                  <p className="text-gray-500 leading-relaxed mb-6 font-medium text-sm">
                    {dept.description}
                  </p>

                  <div className="space-y-3">
                    {dept.services.map((service, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-100 group-hover:bg-white transition-colors">
                        <ChevronRight size={14} className="text-[#FBBF24]" />
                        <span className="text-[10px] font-black uppercase text-gray-700 tracking-wider">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CREATIVE MOBILE UNIT SECTION --- */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#1A365D] rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 lg:p-16 text-white space-y-6 relative z-10">
                
                {/* --- FONT PATTERN: UPPERCASE + YELLOW ACCENT --- */}
                <div className="flex flex-col mb-4">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9]">
                    The Hospital <br />
                    <span className="text-[#FBBF24]">On Wheels</span>
                  </h2>
                  <div className="flex gap-1 mt-6">
                    <div className="w-12 h-1.5 bg-[#FBBF24] rounded-full"></div>
                    <div className="w-2 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>

                <p className="text-md text-white/70 font-medium leading-relaxed italic max-w-md">
                  "Our outreach unit has conducted over 150 health camps, bringing specialists directly to remote villages."
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-0">
                    <p className="text-3xl font-black text-[#FBBF24]">150+</p>
                    <p className="text-[9px] uppercase font-black tracking-widest text-white/50">Camps Conducted</p>
                  </div>
                  <div className="space-y-0">
                    <p className="text-3xl font-black text-[#28a745]">70+</p>
                    <p className="text-[9px] uppercase font-black tracking-widest text-white/50">Villages Reached</p>
                  </div>
                </div>

              
              </div>

              <div className="relative h-[300px] lg:h-auto bg-gray-100 overflow-hidden">
                <img 
                  src="/wheel.jpeg" 
                  alt="BSST Mobile Unit" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A365D] via-[#1A365D]/20 to-transparent lg:from-[#1A365D] lg:to-transparent"></div>
                
                <div className="absolute bottom-6 right-6 bg-[#28a745] p-4 rounded-2xl shadow-2xl text-white text-center animate-bounce">
                  <Truck size={24} className="mx-auto mb-1" />
                  <p className="text-[9px] font-black uppercase">Active Now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY BSST --- */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          
          <div className="flex flex-col items-center justify-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#1A1A1A] leading-[0.9]">
              Why Trust <span className="text-[#FBBF24]">BSST?</span>
            </h2>
            <div className="flex gap-1 mt-6">
              <div className="w-12 h-1.5 bg-[#FBBF24] rounded-full"></div>
              <div className="w-2 h-1.5 bg-[#1A365D] rounded-full"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-4">
            {[
              { 
                icon: ShieldCheck, 
                title: "80G Certified", 
                desc: "Every donation and service is audited and tax-exempted since 2014.",
                color: "text-blue-600"
              },
              { 
                icon: Activity, 
                title: "10K+ Annual Patients", 
                desc: "Proven track record of high-volume medical support in rural Bihar.",
                color: "text-[#28a745]"
              },
              { 
                icon: Thermometer, 
                title: "Compassionate Care", 
                desc: "Our priority is treatment first, paperwork later for the needy.",
                color: "text-[#E11D48]"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 group border-b-8 border-b-transparent hover:border-b-[#FBBF24] transition-all"
              >
                <div className={`w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#1A365D] transition-colors`}>
                  <feature.icon className={`${feature.color} group-hover:text-white`} size={28} />
                </div>
                <h4 className="text-xl font-black text-[#1A365D] uppercase mb-2 tracking-tighter">{feature.title}</h4>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}