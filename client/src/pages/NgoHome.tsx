import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';;
import CountUp from "react-countup";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Users, Stethoscope, GraduationCap, TrendingUp, Award, 
  Target, CheckCircle, HandHeart, Eye, Shield, Activity, 
  Briefcase, UserPlus, ArrowRight, Soup, Contact, Code,
  Play, Pause, Volume2, VolumeX, Landmark, ShieldCheck,
  Globe, FileText, X, Download
} from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import { HeartPulse, Building2, Building } from 'lucide-react';
import VolunteerModal from '../components/VolunteerModal';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedCert, setSelectedCert] = useState<any>(null); 
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false); // Form State
  const [, navigate] = useLocation();
  const [location] = useLocation();

  // Smooth scroll logic for Header links
  useEffect(() => {
    if (window.location.hash === '#compliance') {
      const element = document.getElementById('compliance');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const onDonateClick = () => { navigate('/donate'); };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) { videoRef.current.pause(); } 
      else { videoRef.current.play(); }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const impactStats = [
    { icon: Users, value: 50000, label: 'Beneficiaries', color: 'text-[#0056b3]' },
    { icon: Stethoscope, value: 25000, label: 'Patients Served', color: 'text-[#28a745]' },
    { icon: GraduationCap, value: 70, label: 'Villages Reached', color: 'text-[#0056b3]' },
    { icon: Award, value: 10, label: 'Years of Service', color: 'text-[#28a745]' },
  ];

  const journeySteps = [
    { year: '2014', title: 'Foundation', desc: 'Registered in Araria to establish hospitals and medical schools.' },
    { year: '2017', title: 'NGO Darpan', desc: 'Received NGO Darpan ID for national transparency.' },
    { year: '2019', title: 'Maternal Care', desc: 'Established specialized OBST & Gynecology units.' },
    { year: '2022', title: 'Village Reach', desc: 'Expanded mobile health units to reach 70+ villages.' },
    { year: '2024', title: 'Flagship Hospital', desc: 'BSST Hospital serving 10,000+ patients annually.' },
    { year: '2026', title: 'Vision 2026', desc: 'Scaling digital literacy and advanced diagnostics.' },
  ]; 

  const certificates = [
    { id: 'LEI', title: 'LEI Registration', location: 'Global Identifier', icon: Globe, pdfPath: '/LEI.pdf', desc: 'The Legal Entity Identifier (LEI) is a global 20-digit code uniquely identifying Bharti Sewa Sadan Trust in the international financial system.', details: [{ label: 'LEI Code', value: '984500BE2B82A1D66405' }, { label: 'Status', value: 'ISSUED / ACTIVE' }] },
    { id: '80G', title: '80G Tax Exemption', location: 'Income Tax Dept', icon: ShieldCheck, pdfPath: '/80G Certificate.pdf', desc: 'This certificate allows our donors to claim a 50% tax deduction on their contributions. It makes supporting our medical missions financially efficient.', details: [{ label: 'URN', value: 'AACTB3060FF20219' }, { label: 'Benefit', value: '50% Tax Rebate' }] },
    { id: '12A', title: '12A Registration', location: 'Trust Authenticity', icon: Landmark, pdfPath: '/12A Certificateer.pdf.pdf', desc: 'Foundational proof that BSST is a recognized non-profit entity. This grants us tax-exempt status, ensuring 100% of funds are used for the health of marginalized people.', details: [{ label: 'PAN', value: 'AACTB3060F' }, { label: 'Registration', value: '27-05-2021' }] },
    { id: 'ISO', title: 'ISO 9001:2015', location: 'Quality Standards', icon: Award, pdfPath: '/ISO Certificate.pdf.pdf.', desc: 'International certification for Quality Management. It verifies that our hospitals and social welfare services meet global benchmarks for operational excellence.', details: [{ label: 'Cert No', value: 'QMS/21N1522' }, { label: 'Scope', value: 'Health & Medical' }] },
    { id: 'MSME', title: 'Udyam Registration', location: 'Govt. Recognized', icon: CheckCircle, pdfPath: '/Print _ Udyam Registration Certificate BHARTI SEWA.pdf.pdf', desc: 'Recognizes BSST as a Micro enterprise under the Ministry of MSME. It validates our operational infrastructure for providing healthcare.', details: [{ label: 'Udyam No', value: 'UDYAM-BR-01-0001719' }, { label: 'Category', value: 'Micro Enterprise' }] }
  ];

  

  const youtubeVideos = ["https://www.youtube.com/embed/RzrQ3rttajY", "https://www.youtube.com/embed/SJ0wFQ2idco", "https://www.youtube.com/embed/yGISNvuQbww", "https://www.youtube.com/embed/yg4OQnsUgiw", "https://www.youtube.com/embed/QnStOtbN-WM"];
  
  const services = [
    { icon: Stethoscope, title: 'Quality Healthcare', description: 'Our healthcare initiative is dedicated to bridging the critical gap between rural communities and modern medical facilities across Bihar. We operate state-of-the-art mobile medical units and fully equipped operation theaters to reach patients in the most remote areas. From maternal care to emergency life-saving treatments, our medical teams work tirelessly to ensure that financial status never dictates the quality of care received. By providing free medicines and advanced diagnostic services, we are successfully reducing the burden of preventable diseases in Araria and beyond. Our mission is to build a healthier future where every villager has immediate access to the dignity of professional healthcare.', image: '/first.jpeg' },
    { icon: GraduationCap, title: 'Education Programs', description: 'At Bharti Sewa Sadan Trust, we believe that quality education is the ultimate tool for breaking the generational cycle of poverty. Our programs focus on empowering first-generation learners by providing them with modern digital labs, textbooks, and dedicated mentorship. We have established localized learning centers that offer a safe environment for children to explore science, technology, and literature. Beyond basic literacy, we provide vocational training and career guidance to ensure our students are prepared for the challenges of the modern workforce. By investing in a child’s education today, we are effectively planting the seeds for a self-reliant and progressive society tomorrow.', image: '/second.jpeg' },
    { icon: Users, title: 'Community Outreach', description: 'Our community outreach programs are designed to foster resilience and sustainable growth through direct, grass-roots engagement. We work closely with village leaders to identify the most marginalized families and provide them with essential social welfare support and disaster relief. Through specialized training workshops, we empower rural women with the skills needed to start small businesses and achieve financial independence. We also lead vital awareness campaigns regarding social rights, sanitation, and government schemes to ensure no citizen is left behind. This mission is built on the foundation of Seva ensuring that 100% of our resources create a visible and lasting impact on the lives of those we serve.', image: '/third.jpeg' },
  ];

  const AssociatedUnits = [
    { name: 'Bharti Sewa Sadan Nursing Home', location: 'Jokihat, Araria', icon: Building },
    { name: 'R.N. Bharti Hospital & Research Center', location: 'Bhebhra Chowk, Jokihat', icon: HeartPulse },
    { name: 'R.N. Bharti Hospital & Research Center', location: 'Ratan, Khagaria', icon: Building2 },
    { name: 'A.S. Clinic', location: 'High School Chowk, Kishanganj', icon: Building },
    { name: 'Divya Hospital', location: 'Srahi Road, Saharsa', icon: HeartPulse },
    { name: 'City Hospital', location: 'Pipra Main Road, Supaul', icon: Building2 },
    { name: 'U.J. Gracewell Hospital', location: 'Bahadurganj, Kishanganj', icon: Building },
  ];

  const handleBlog = (serviceData: any) => {
    const { icon, ...serializableService } = serviceData;
    navigate('/blog', { state: { blog: serializableService } });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <HeroCarousel />
      </section>

      {/* --- IMPACT SECTION --- */}
      <section id="impact" className="py-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
              <div className="relative z-10 shadow-xl rounded-[2rem] overflow-hidden border-4 border-[#FAF9F6]">
                <img src="/map.png" alt="Our Impact on Community" className="w-full h-[400px] object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1A365D] to-transparent text-white">
                  <h3 className="text-xl font-black uppercase tracking-tighter">Making a Difference</h3>
                  <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Rural empowerment since 2014</p>
                </div>
              </div>
            </motion.div>
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-black text-4xl md:text-5xl leading-tight uppercase tracking-tighter text-[#1A1A1A]">Our Measurable <span className="text-[#FBBF24]">Impact</span></h2>
                <div className="flex gap-1 mt-4 mb-6"><div className="w-12 h-1.5 bg-[#FBBF24] rounded-full"></div><div className="w-2 h-1.5 bg-[#1A365D] rounded-full"></div></div>
                <p className="text-md text-gray-600 leading-relaxed max-w-lg font-medium">Through systematic assessment and dedicated ground-work, we have achieved significant milestones.</p>
              </motion.div>
              <div className="grid grid-cols-2 gap-6">
                {impactStats.map((stat, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group">
                    <div className="flex items-center space-x-3 mb-2"><div className="p-2 bg-[#FAF9F6] rounded-xl group-hover:bg-[#FBBF24] transition-all duration-300"><stat.icon className="text-[#1A365D] group-hover:text-white" size={24} /></div></div>
                    <div className="text-4xl font-black text-[#1A365D] leading-none tracking-tighter"><CountUp end={stat.value} duration={2} separator="," enableScrollSpy scrollSpyOnce /><span className="text-[#FBBF24] ml-1">+</span></div>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-2">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

{/* --- GET INVOLVED SECTION (Form Connection) --- */}
<section className="relative py-24 overflow-hidden">
  <div className="absolute inset-0 z-0">
    <img src="/mm.png" alt="Volunteers" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-[#1A365D]/40"></div>
  </div>
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-white">
        
        {/* UPDATED HEADER STYLE TO MATCH 'WHAT WE DO' */}
        <div className="flex flex-col mb-8">
          <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] text-white">
            Path To <br /><span className="text-[#FBBF24]">Progress</span>
          </h2>
          {/* Specific double-bar accent from Services section */}
          <div className="flex gap-2 mt-4">
            <div className="w-16 h-2 bg-[#FBBF24] rounded-full"></div>
            <div className="w-3 h-2 bg-[#1A365D] rounded-full"></div>
          </div>
        </div>

        <p className="text-xl text-white/80 mb-10 max-w-lg leading-relaxed font-medium">Your time and dedication can illuminate lives. Join our mission today.</p>
        
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setIsVolunteerModalOpen(true)}
          className="bg-[#FBBF24] text-[#1A365D] px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-white transition-all"
        >
          Start Volunteering
        </motion.button>
      </motion.div>

      {/* RIGHT SIDE: ANIMATED HEART */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        viewport={{ once: true }} 
        // Increased container size slightly for presence
        className="hidden lg:flex justify-center flex-1"
      >
        <div className="relative p-16 bg-white/10 rounded-full backdrop-blur-xl border border-white/20 shadow-2xl">
          {/* Motion Heart with pumping effect */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }} 
            transition={{ 
              duration: 2.5, // Pumping speed
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Heart className="text-[#FBBF24]" size={120} fill="#FBBF24" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-black text-4xl md:text-5xl uppercase tracking-tighter text-[#1A1A1A]">What We <span className="text-[#FBBF24]">Do</span></h2>
            <div className="flex gap-1 mt-2 justify-center"><div className="w-12 h-1.5 bg-[#FBBF24] rounded-full"></div><div className="w-2 h-1.5 bg-[#1A365D] rounded-full"></div></div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} onClick={() => handleBlog(service)} className="bg-white rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 group cursor-pointer shadow-sm">
                <div className="relative h-64 overflow-hidden"><img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-[#1A365D] uppercase tracking-tighter mb-3 group-hover:text-[#FBBF24] transition-colors">{service.title}</h3>
                  <div className="bg-[#FBBF24] text-[#1A365D] font-black uppercase tracking-widest py-3 rounded-xl shadow-md flex items-center justify-center gap-2 text-[10px] w-32 hover:bg-[#1A365D] hover:text-white transition-all duration-300">Learn More <ArrowRight size={14} /></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW WE WORK SECTION --- */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="font-black text-4xl md:text-5xl uppercase tracking-tighter text-[#1A1A1A]">Our Approach In <span className="text-[#FBBF24]">Action</span></h2>
            <div className="flex gap-1 mt-3"><div className="w-12 h-1.5 bg-[#FBBF24] rounded-full"></div><div className="w-2 h-1.5 bg-[#1A365D] rounded-full"></div></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{ title: 'Healthcare Seva', icon: HandHeart, color: 'bg-red-50/50', link: '/donate' }, { title: 'Medical Interns', icon: GraduationCap, color: 'bg-emerald-50/50', link: '/about' }, { title: 'Join Outreach', icon: UserPlus, color: 'bg-orange-50/50', link: '/contact' }, { title: 'Food Security', icon: Soup, color: 'bg-blue-50/50', link: '/donate' }].map((item, index) => (
              <motion.div key={index} whileHover={{ y: -8 }} className={`group relative flex flex-col p-8 rounded-[2.5rem] transition-all duration-500 ${item.color} border border-transparent hover:border-[#FBBF24]/30 hover:shadow-2xl hover:bg-white cursor-pointer`}>
                <div className="mb-6 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-[#1A365D] transition-all duration-300"><item.icon size={26} className="text-[#1A365D] group-hover:text-[#FBBF24] transition-colors" /></div>
                <h3 className="text-xl font-black text-[#1A365D] mb-3 leading-tight uppercase tracking-tighter group-hover:text-[#FBBF24] transition-colors">{item.title}</h3>
                <Link href={item.link} className="mt-auto flex items-center gap-2 text-[#1A365D] font-black text-[10px] uppercase tracking-widest">View Details <ArrowRight size={12} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ASSOCIATED MEDICAL UNITS (REDUCED HEIGHT) --- */}
      <section className="py-6 bg-[#1A365D] text-white overflow-hidden border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center"><h2 className="text-2xl font-black uppercase tracking-widest text-[#FBBF24]">Associated <span className="text-white">Medical Units</span></h2></div>
        <div className="flex relative group">
          <motion.div animate={{ x: ["-50%", "0%"] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="flex gap-4 whitespace-nowrap py-2">
            {[...AssociatedUnits, ...AssociatedUnits].map((unit, index) => (
              <div key={index} className="w-[240px] bg-white/10 backdrop-blur-md p-4 rounded-[1rem] border border-white/20 inline-block shrink-0 shadow-lg hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2"><div className="w-8 h-8 bg-[#FBBF24] rounded-lg flex items-center justify-center text-[#1A365D]"><unit.icon size={16} /></div><span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Unit 0{(index % AssociatedUnits.length) + 1}</span></div>
                <h4 className="text-xs font-bold text-white whitespace-normal">{unit.name}</h4>
                <p className="text-[9px] text-[#FBBF24] uppercase tracking-widest"><Landmark size={8} /> {unit.location}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
{/* --- VIDEO PROMO SECTION --- */}
<section className="py-24 bg-white relative overflow-hidden">
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
      
      {/* UPDATED HEADER STYLE TO MATCH 'WHAT WE DO' */}
      <div className="flex flex-col mb-8">
        <h2 className="font-black text-5xl md:text-5xl uppercase tracking-tighter leading-[0.9] text-[#1A1A1A]">
          Gift A <br /><span className="text-[#FBBF24]">Future</span>
        </h2>
        {/* Specific double-bar accent from Services section */}
        <div className="flex gap-2 mt-4">
          <div className="w-16 h-2 bg-[#FBBF24] rounded-full"></div>
          <div className="w-3 h-2 bg-[#1A365D] rounded-full"></div>
        </div>
      </div>

      {/* Expanded 2-3 line subheading */}
      <p className="text-xl text-gray-700 mt-8 mb-8 font-medium leading-relaxed max-w-lg">
        Every contribution paves the way for a child to break the cycle of poverty through quality education and healthcare. 
        A child with a book is a child with a future—join our mission to illuminate lives today.
      </p>

      <button onClick={onDonateClick} className="bg-[#1A365D] text-white px-8 py-4 rounded-full font-black uppercase text-xs flex items-center space-x-2 shadow-xl hover:scale-105 transition-all">
        <Heart size={18} fill="white" /> <span>Donate Now</span>
      </button>
    </motion.div>

    <motion.div className="relative group">
      <div className="rounded-[3rem] shadow-2xl overflow-hidden aspect-video relative cursor-pointer border-8 border-white" onClick={togglePlay}>
        <video ref={videoRef} autoPlay loop muted={isMuted} playsInline className="w-full h-full object-cover">
          <source src="/vv.mp4" type="video/mp4" />
        </video>
        <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
          {isPlaying ? <Pause size={48} className="text-white" /> : <Play size={48} className="text-white ml-2" fill="white" />}
        </div>
        <button onClick={toggleMute} className="absolute bottom-6 right-6 z-20 bg-black/40 p-3 rounded-full text-white hover:bg-black/60 transition-colors">
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    </motion.div>
  </div>
</section>

      {/* --- JOURNEY MARQUEE --- */}
      <section className="py-6 bg-[#1A365D] text-white overflow-hidden border-y border-white/10">
        <div className="flex relative">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="flex gap-4 whitespace-nowrap py-2">
            {[...journeySteps, ...journeySteps].map((step, index) => (
              <div key={index} className="w-[240px] bg-white/10 backdrop-blur-md p-4 rounded-[1rem] border border-white/20 inline-block shrink-0 shadow-lg">
                <span className="text-xl font-black text-[#FBBF24] block mb-0.5">{step.year}</span>
                <h4 className="text-xs font-bold uppercase text-white">{step.title}</h4>
                <p className="text-[10px] text-white/70 whitespace-normal leading-tight font-medium">{step.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

   {/* --- INFRASTRUCTURE SECTION --- */}
<section className="pb-24 pt-0 bg-white relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        
        {/* UPDATED HEADER STYLE TO MATCH 'WHAT WE DO' */}
        <div className="flex flex-col mb-8">
          <h2 className="font-black text-5xl md:text-5xl uppercase tracking-tighter leading-[0.9] text-[#1A1A1A]">
            Robust <br /> <span className="text-[#FBBF24]">Infrastructure</span>
          </h2>
          {/* Specific double-bar accent from Services section */}
          <div className="flex gap-2 mt-4">
            <div className="w-16 h-2 bg-[#FBBF24] rounded-full"></div>
            <div className="w-3 h-2 bg-[#1A365D] rounded-full"></div>
          </div>
        </div>

        {/* Added 2-3 line subheading */}
        <p className="text-xl text-gray-700 mb-8 font-medium leading-relaxed max-w-lg">
          We combine cutting-edge medical technology with deep-rooted community outreach. Our facilities are designed to provide high-quality care to the most remote corners of Bihar.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[{ title: 'Modern OT', icon: Activity }, { title: 'Digital Labs', icon: Shield }, { title: 'Mobile Units', icon: TrendingUp }, { title: 'Emergency', icon: Heart }].map((item, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-2xl bg-[#FAF9F6] border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1A365D] shadow-sm">
                <item.icon size={20} />
              </div>
              <div className="self-center font-black text-[#1A365D] text-xs mb-0.5 uppercase tracking-wider">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
        <div className="bg-[#FBBF24] rounded-[3rem] p-8 md:p-12 text-[#1A365D] relative overflow-hidden shadow-xl border border-[#1A365D]/10">
          <div className="relative z-10">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 border-b border-[#1A365D]/20 pb-4">Our Branch Offices</h3>
            <div className="grid grid-cols-1 gap-8">
              {[{ city: 'Araria (H.Q.)', addr: 'Shivpuri Ward No-09, Araria, Bihar 854311' }, { city: 'Kishanganj', addr: 'Kochadhaman, Kishanganj 855115' }, { city: 'Purnea', addr: 'Outreach Center, Purnea, Bihar' }].map((office, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-2 w-2 h-2 rounded-full bg-[#1A365D] shrink-0"></div>
                  <div>
                    <h4 className="text-[#1A365D] font-black uppercase text-[13px] mb-1 tracking-tight">{office.city}</h4>
                    <p className="text-xs text-[#1A365D]/80 font-bold leading-relaxed">{office.addr}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Subtle decoration for the yellow card */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* --- COMPLIANCE MARQUEE (REDUCED HEIGHT) --- */}
      <section id="compliance" className="py-6 bg-[#1A365D] text-white overflow-hidden border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <h2 className="text-2xl font-black uppercase tracking-widest text-[#FBBF24]">Legal <span className="text-white">& Quality Compliance</span></h2>
        </div>
        <div className="flex relative group">
          <motion.div animate={{ x: ["-50%", "0%"] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="flex gap-4 whitespace-nowrap py-2">
            {[...certificates, ...certificates].map((cert, index) => (
              <div key={index} onClick={() => setSelectedCert(cert)} className="w-[240px] bg-white/10 backdrop-blur-md p-4 rounded-[1rem] border border-white/20 inline-block shrink-0 shadow-lg hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3 mb-2"><div className="w-8 h-8 bg-[#FBBF24] rounded-lg flex items-center justify-center text-[#1A365D]"><cert.icon size={16} /></div><span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Doc 0{(index % certificates.length) + 1}</span></div>
                <h4 className="text-xs font-bold text-white whitespace-normal">{cert.title}</h4>
                <p className="text-[9px] text-[#FBBF24] uppercase tracking-widest flex items-center gap-1"><FileText size={8} /> {cert.location}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

   {/* --- VOICES OF TRANSFORMATION --- */}
<section className="py-16 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
    
    <div className="space-y-6">
      {/* UPDATED HEADER STYLE TO MATCH 'WHAT WE DO' */}
      <div className="flex flex-col mb-8">
        <h2 className="font-black text-5xl md:text-5xl uppercase tracking-tighter leading-[0.9] text-[#1A1A1A]">
          Voices Of <br /><span className="text-[#FBBF24]">Transformation</span>
        </h2>
        {/* Specific double-bar accent from Services section */}
        <div className="flex gap-2 mt-4">
          <div className="w-16 h-2 bg-[#FBBF24] rounded-full"></div>
          <div className="w-3 h-2 bg-[#1A365D] rounded-full"></div>
        </div>
      </div>

      <p className="text-xl text-gray-600 leading-relaxed max-w-md font-medium">
        Real accounts of resilience and hope from the heart of rural Bihar. 
        Witness the power of community-driven change and sustainable progress.
      </p>
    </div>

    <div className="relative h-[450px] overflow-hidden">
      {/* Gradients to fade top and bottom for a smoother look */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />

      <motion.div 
        animate={{ y: ["0%", "-50%"] }} 
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear" 
        }} 
        className="space-y-4 pt-4"
      >
        {[
          { name: "Suman Kumari", msg: "The healthcare support from BSST saved my child's life." }, 
          { name: "Rahul Sharma", msg: "I am the first to read in my family." }, 
          { name: "Meena Devi", msg: "Training helped me start my business." },
          { name: "Amit Singh", msg: "The education program changed my perspective on life." }
        ].concat([ 
          { name: "Suman Kumari", msg: "The healthcare support from BSST saved my child's life." }, 
          { name: "Rahul Sharma", msg: "I am the first to read in my family." }, 
          { name: "Meena Devi", msg: "Training helped me start my business." },
          { name: "Amit Singh", msg: "The education program changed my perspective on life." }
        ]).map((testimonial, index) => (
          <div key={index} className="bg-[#FAF9F6] p-8 rounded-[2.5rem] border border-gray-100 shadow-sm mx-2">
            <p className="text-md italic text-[#1A1A1A] font-medium leading-relaxed">"{testimonial.msg}"</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#FBBF24] mt-4">— {testimonial.name}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </div>
</section>

     {/* --- YOUTUBE VIDEO SECTION --- */}
<section className="py-24 bg-[#FAF9F6]">
  <div className="max-w-[1600px] mx-auto px-4 text-center">
    
    {/* UPDATED HEADER STYLE TO MATCH 'WHAT WE DO' */}
    <div className="flex flex-col items-center mb-16">
      <h2 className="font-black text-5xl md:text-5xl uppercase tracking-tighter leading-[0.9] text-[#1A1A1A]">
        Impact In <span className="text-[#FBBF24]">Action</span>
      </h2>
      {/* Specific double-bar accent from Services section */}
      <div className="flex gap-2 mt-4 justify-center">
        <div className="w-16 h-2 bg-[#FBBF24] rounded-full"></div>
        <div className="w-3 h-2 bg-[#1A365D] rounded-full"></div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {youtubeVideos.map((url, index) => (
        <motion.div key={index} className="rounded-[2rem] overflow-hidden shadow-2xl aspect-video bg-gray-100 border-4 border-white">
          <iframe className="w-full h-full" src={url} frameBorder="0" allowFullScreen></iframe>
        </motion.div>
      ))}
    </div>
  </div>
</section>
      {/* --- MODALS (Volunteer & Certificate) --- */}
      <AnimatePresence>
        {isVolunteerModalOpen && (
          <VolunteerModal onClose={() => setIsVolunteerModalOpen(false)} />
        )}

        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#1A365D]/95 backdrop-blur-xl"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div className="bg-white w-full max-w-5xl h-[85vh] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}>
              <div className="md:w-3/5 bg-gray-100">
                <object data={selectedCert.pdfPath} type="application/pdf" className="w-full h-full">
                  <div className="p-10 text-center"><a href={selectedCert.pdfPath} download className="text-[#1A365D] underline font-black text-[10px] uppercase">Download to View</a></div>
                </object>
              </div>
              <div className="md:w-2/5 p-10 flex flex-col text-[#1A365D]">
                <button onClick={() => setSelectedCert(null)} className="self-end p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{selectedCert.title}</h3>
                <p className="text-sm italic mb-8">"{selectedCert.desc}"</p>
                <div className="space-y-4 mb-10 bg-gray-50 p-6 rounded-2xl">
                  {selectedCert.details.map((d:any, i:number) => (
                    <div key={i} className="flex justify-between border-b pb-2 last:border-0"><span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{d.label}</span><span className="text-xs font-bold uppercase">{d.value}</span></div>
                  ))}
                </div>
                <a href={selectedCert.pdfPath} download className="mt-auto flex items-center justify-center gap-2 bg-[#1A365D] text-white py-4 rounded-xl font-black uppercase text-[10px] hover:bg-[#FBBF24] hover:text-[#1A365D] transition-all"><Download size={14} /> Download Document</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}