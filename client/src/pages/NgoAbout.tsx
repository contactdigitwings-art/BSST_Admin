import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, BookOpen, Activity, Heart, ShieldCheck, Calendar } from 'lucide-react';

export default function About() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const pageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.03]);
  const imageScale = useTransform(scrollYProgress, [0.1, 0.4], [1.2, 1]);

  const journeySteps = [
    { year: '2014', title: 'Foundation', desc: 'Registered in Araria to establish hospitals and medical schools.' },
    { year: '2017', title: 'NGO Darpan', desc: 'Received NGO Darpan ID for national transparency.' },
    { year: '2019', title: 'Maternal Care', desc: 'Established specialized OBST & Gynecology units.' },
    { year: '2022', title: 'Village Reach', desc: 'Expanded mobile health units to reach 70+ villages.' },
    { year: '2024', title: 'Flagship Hospital', desc: 'BSST Hospital serving 10,000+ patients annually.' },
    { year: '2026', title: 'Vision 2026', desc: 'Scaling digital literacy and advanced diagnostics.' },
  ];

  const youtubeVideos = [
    "https://www.youtube.com/embed/RzrQ3rttajY",
    "https://www.youtube.com/embed/SJ0wFQ2idco",
    "https://www.youtube.com/embed/yGISNvuQbww",
    "https://www.youtube.com/embed/yg4OQnsUgiw",
    "https://www.youtube.com/embed/QnStOtbN-WM"
  ];

  return (
    <motion.div 
      style={{ scale: pageScale }} 
      className="min-h-screen bg-white origin-center transition-transform duration-700 ease-out"
    >
    {/* --- HERO SECTION --- */}
<section className="relative bg-[#1A365D] text-white py-32 overflow-hidden">
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
  </div>
  
  <div className="relative max-w-5xl mx-auto px-4">
    <div className="flex flex-col items-center text-center">
      {/* MATCHED HEADER STYLE TO 'WHAT WE DO' */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]"
      >
        About <span className="text-[#FBBF24]">BSST</span>
      </motion.h1>

      {/* Signature Double-Bar Accent (Centered) */}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-2 mt-6 justify-center"
      >
        <div className="w-16 h-2 bg-[#FBBF24] rounded-full"></div>
        <div className="w-3 h-2 bg-white rounded-full"></div>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.5 }}
        className="text-xl md:text-2xl font-black uppercase tracking-[0.3em] mt-8"
      >
        Empowering Rural Bihar Since 2014
      </motion.p>
    </div>
  </div>
</section>
    {/* --- BSST HOSPITAL INFO SECTION --- */}
    <section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        viewport={{ once: true }} 
        className="space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
          <Activity size={18} className="text-[#1A365D]" />
          <span className="text-[10px] font-black text-[#1A365D] uppercase tracking-widest">Healthcare Backbone</span>
        </div>

        <div className="flex flex-col">
          <h2 className="text-5xl md:text-5xl font-black text-[#1A1A1A] leading-[0.9] uppercase tracking-tighter">
            Cornerstone Of <br />
            <span className="text-[#FBBF24]">Medical Service</span>
          </h2>
          <div className="flex gap-2 mt-6">
            <div className="w-16 h-2 bg-[#FBBF24] rounded-full"></div>
            <div className="w-3 h-2 bg-[#1A365D] rounded-full"></div>
          </div>
        </div>

        <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-medium">
          <p>
            <strong className="text-[#1A365D]">BSST Hospital</strong> serves as the flagship medical initiative of Bharti Sewa Sadan Trust, specifically engineered to act as a vital lifeline for marginalized families across rural Bihar. 
            Our core mission is built on the unwavering principle that <span className="bg-yellow-100 px-1 font-bold text-gray-900">no patient should ever be denied high-quality medical treatment due to their financial status or poverty.</span>
          </p>
          <p>
            With an annual footfall now exceeding <span className="text-[#FBBF24] font-black underline decoration-2 underline-offset-4">10,000 patients</span>, our facility provides comprehensive and affordable healthcare through a specialized Outpatient Department (OPD) and dedicated maternal care units. 
            By integrating modern surgical technologies with compassionate community outreach, we are successfully bridging the healthcare gap for thousands of underserved citizens in the Araria district.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-shadow hover:shadow-md">
            <div className="p-2 bg-green-50 rounded-lg text-[#28a745]"><Heart size={20} fill="currentColor" /></div>
            <div>
              <p className="text-xl font-black text-[#1A365D] leading-none">150+</p>
              <p className="text-[10px] uppercase font-bold text-gray-400">Rural Camps</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-shadow hover:shadow-md">
            <div className="p-2 bg-blue-50 rounded-lg text-[#1A365D]"><ShieldCheck size={20} /></div>
            <div>
              <p className="text-xl font-black text-[#1A365D] leading-none">80G</p>
              <p className="text-[10px] uppercase font-bold text-gray-400">Tax Exempted</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        viewport={{ once: true }} 
        className="relative p-6 bg-gray-50/50 rounded-[3.5rem] backdrop-blur-sm"
      >
        <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white group">
          <motion.img 
            style={{ scale: imageScale }} 
            src="/founder.png" 
            alt="Dr. Ram Narayan Bharti" 
            className="w-full h-full object-cover origin-center transition-transform duration-1000 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A365D]/80 via-transparent to-transparent opacity-90"></div>
          
          {/* --- FOUNDER EDUCATION BADGE --- */}
          <div className="absolute bottom-8 left-8 right-8 z-20">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/90 backdrop-blur-md p-6 rounded-[2rem] border border-white/20 shadow-xl"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FBBF24] mb-1">Founder Cum President</p>
              <h3 className="text-2xl font-black text-[#1A365D] uppercase tracking-tighter leading-none mb-2">
                Dr. Ram Narayan Bharti
              </h3>
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-gray-300"></div>
                <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                MBBS (BU Bihar) •  MS (CSJM Kanpur) 
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#FBBF24] rounded-[2rem] -z-10 rotate-12 opacity-20"></div>
      </motion.div>
    </div>
  </div>
</section>
      {/* --- ZIG-ZAG MISSION & VISION (UPDATED PATTERN) --- */}
      <section className="py-20 bg-[#FAF9F6] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:w-1/2 space-y-6">
              <div className="flex flex-col">
                <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] leading-[0.9] uppercase tracking-tighter">
                  Our <span className="text-[#FBBF24]">Mission</span>
                </h2>
                <div className="flex gap-1 mt-4">
                  <div className="w-12 h-1.5 bg-[#FBBF24] rounded-full"></div>
                  <div className="w-2 h-1.5 bg-[#1A365D] rounded-full"></div>
                </div>
              </div>
              <p className="text-xl text-gray-600 font-medium leading-relaxed">To establish and run hospitals and medical schools for the general public, focusing on the most deprived communities in rural Bihar.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:w-1/2">
              <img src="/br.jpg" className="rounded-[3rem] shadow-2xl w-full h-[400px] object-cover border-8 border-white" alt="Mission" />
            </motion.div>
          </div>
          
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:w-1/2 space-y-6">
              <div className="flex flex-col">
                <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] leading-[0.9] uppercase tracking-tighter">
                  Our <span className="text-[#FBBF24]">Vision</span>
                </h2>
                <div className="flex gap-1 mt-4">
                  <div className="w-12 h-1.5 bg-[#FBBF24] rounded-full"></div>
                  <div className="w-2 h-1.5 bg-[#1A365D] rounded-full"></div>
                </div>
              </div>
              <p className="text-xl text-gray-600 font-medium leading-relaxed">Ensuring quality healthcare is a basic human right by building accessible and permanent medical solutions for the underserved.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:w-1/2">
              <img src="/vi.jpeg" className="rounded-[3rem] shadow-2xl w-full h-[400px] object-cover border-8 border-white" alt="Vision" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CYCLING JOURNEY (REDUCED HEIGHT) --- */}
<section className="py-6 bg-[#1A365D] text-white overflow-hidden border-y border-white/10">
  <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
    <h2 className="text-2xl font-black uppercase tracking-widest text-[#FBBF24]">
      Journey: <span className="text-white">2014 — 2026</span>
    </h2>
  </div>
  
  <div className="flex relative group">
    <motion.div 
      animate={{ x: ["0%", "-50%"] }} 
      transition={{ duration: 35, repeat: Infinity, ease: "linear" }} 
      className="flex gap-4 whitespace-nowrap py-2"
    >
      {[...journeySteps, ...journeySteps].map((step, index) => (
        <div 
          key={index} 
          // Reduced width (240px), padding (p-4), and radius (1rem)
          className="w-[240px] bg-white/10 backdrop-blur-md p-4 rounded-[1rem] border border-white/20 inline-block shrink-0 shadow-lg"
        >
          {/* Shrunk Year font size and margin */}
          <span className="text-xl font-black text-[#FBBF24] block mb-0.5 tracking-tighter">
            {step.year}
          </span>
          {/* Shrunk Title font size */}
          <h4 className="text-xs font-bold mb-0.5 uppercase tracking-tight">
            {step.title}
          </h4>
          {/* Shrunk Description font size and line height */}
          <p className="text-[10px] text-white/70 whitespace-normal leading-tight font-medium">
            {step.desc}
          </p>
        </div>
      ))}
    </motion.div>

    {/* Optional: Added Gradient Fades to match the compliance look */}
    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#1A365D] to-transparent z-10" />
    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#1A365D] to-transparent z-10" />
  </div>
</section>

      {/* --- TEAM & BOARD MEMBERS SECTION --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-center mb-16"
          >
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] leading-[0.9] uppercase tracking-tighter">
                Our Dedicated <span className="text-[#FBBF24]">Leadership</span>
              </h2>
              <div className="flex gap-1 mt-6">
                <div className="w-12 h-1.5 bg-[#FBBF24] rounded-full"></div>
                <div className="w-2 h-1.5 bg-[#1A365D] rounded-full"></div>
              </div>
            </div>
            <p className="text-gray-500 font-black uppercase text-[10px] tracking-[0.4em] mt-8">
              The Visionaries behind Bharti Sewa Sadan Trust
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
            {[
              { name: "SANJAY KUMAR JHA", role: "SECRETARY", image: "/sanjay.jpeg" },
              { name: "SHRIMATI RUNA BHARTI", role: "TREASURER", image: "/runabharti.jpeg" },
              { name: "RAJESH BAHARDAR", role: "VICE CHAIRMAN", image: "/rajesh.jpeg" },
              { name: "RITESH KUMAR", role: "GENERAL SECTEARY", image: "/ritesh.jpeg" },
              { name: "PUTUL BHARTI", role: "BOARD MEMBER", image: "/putul bharti.jpeg" },
              { name: "SUMIT KUMAR", role: "MEMBER", image: "/sumit kumar.jpeg" },
            
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative w-44 h-44 mb-6 overflow-hidden rounded-[2rem] shadow-xl bg-gray-100 border-4 border-white group-hover:border-[#FBBF24] transition-all duration-500">
                  <motion.img 
                    src={member.image} 
                    alt={member.name}
                    initial={{ scale: 1.2 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className="text-lg font-black text-[#1A365D] uppercase tracking-tight mb-2">
                  {member.name}
                </h3>
                <p className="text-[#28a745] font-black text-[9px] uppercase tracking-[0.2em]">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- YOUTUBE VIDEO SECTION --- */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] leading-[0.9] uppercase tracking-tighter">
                Impact In <span className="text-[#FBBF24]">Action</span>
              </h2>
              <div className="flex gap-1 mt-6">
                <div className="w-12 h-1.5 bg-[#FBBF24] rounded-full"></div>
                <div className="w-2 h-1.5 bg-[#1A365D] rounded-full"></div>
              </div>
            </div>
            <p className="text-gray-500 font-black uppercase text-[10px] tracking-[0.4em] mt-8">Visual journey of our community work</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {youtubeVideos.map((url, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="rounded-3xl overflow-hidden shadow-2xl aspect-video bg-gray-100 border-4 border-white"
              >
                <iframe 
                  className="w-full h-full"
                  src={url}
                  title={`BSST Impact Video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}