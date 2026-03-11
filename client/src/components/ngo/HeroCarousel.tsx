import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const heroImages = [
  {
    url: '/hero.png', 
    alt: 'Bharti Sewa Sadan Trust Hero Image',
    heading: 'Brighter Tomorrows for Every',
    accent: 'Child',
    subheading: 'Ensuring quality education and nutrition are a right, not a privilege, for the next generation. We provide the essential resources needed to help every young mind thrive in rural communities.'
  },
  {
    url: '/h.png',
    alt: 'Medical camp in rural areas',
    heading: 'A Decade of Dedicated',
    accent: 'Service',
    subheading: 'Celebrating 10 years of excellence, trust, and audited social impact in community development. Our journey is defined by a decade of unwavering transparency and commitment to the people of Bihar.'
  },
  {
    url: '/cc.png',
    alt: 'Community outreach programs',
    heading: 'Healing the World, One',
    accent: 'Village',
    subheading: 'Bringing world-class medical diagnostic standards to the most remote corners of rural Bihar. Our mobile health units ensure that professional care reaches those living far from urban medical centers.'
  },
  {
    url: '/bbb.png',
    alt: 'Patient care and treatment',
    heading: 'Serving the Underserved with',
    accent: 'Commitment',
    subheading: 'Providing a compassionate safety net of healthcare and emergency support for those in need. We stand as a reliable pillar of hope, ensuring no patient is ever denied treatment due to financial hardship.'
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full h-full"
        >
          {/* Background Image with Zoom Effect */}
          <motion.img
            src={heroImages[currentIndex].url}
            alt={heroImages[currentIndex].alt}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5, ease: "linear" }}
            className="w-full h-full object-cover origin-center"
          />

          {/* Text Content Layer */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              key={`text-${currentIndex}`}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-4xl"
            >
              {/* --- FONT PATTERN: UPPERCASE + YELLOW ACCENT --- */}
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase leading-[0.9] tracking-tighter mb-4 drop-shadow-2xl">
                {heroImages[currentIndex].heading} <br />
                <span className="text-[#FBBF24]">{heroImages[currentIndex].accent}</span>
              </h1>

              {/* Two-Tone Accent Bar matching the rest of the page */}
              <div className="flex gap-1 mb-8">
                <div className="w-16 h-2 bg-[#FBBF24] rounded-full"></div>
                <div className="w-3 h-2 bg-white rounded-full"></div>
              </div>

              <p className="text-lg md:text-2xl text-white/90 font-medium max-w-2xl drop-shadow-lg leading-relaxed">
                {heroImages[currentIndex].subheading}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Brand Gradient Overlay - Updated to Navy #1A365D */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A365D]/95 via-[#1A365D]/40 to-transparent z-10"></div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-6 sm:left-12 lg:left-24 flex space-x-3 z-30">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? 'bg-[#FBBF24] w-12'
                : 'bg-white/30 hover:bg-white/60 w-4'
            }`}
          />
        ))}
      </div>
    </div>
  );
}