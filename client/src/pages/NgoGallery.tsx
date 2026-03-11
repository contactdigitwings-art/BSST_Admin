import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Heart, Activity } from 'lucide-react';

type MediaType = 'all' | 'awards';

interface MediaItem {
  id: number;
  type: string;
  src: string;
  caption: string;
}

export default function Gallery() {
  const [filter, setFilter] = useState<MediaType>('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  // Added the missing youtubeVideos array to prevent reference errors
  const youtubeVideos = [
    "https://www.youtube.com/embed/RzrQ3rttajY",
    "https://www.youtube.com/embed/SJ0wFQ2idco",
    "https://www.youtube.com/embed/yGISNvuQbww",
    "https://www.youtube.com/embed/yg4OQnsUgiw",
    "https://www.youtube.com/embed/QnStOtbN-WM"
  ];

  const mediaItems: MediaItem[] = [
    { id: 1, type: 'general', src: '/1.jpeg', caption: 'Our dedicated team brings professional medical expertise directly to the doorsteps of those who need it most. We believe that geographical distance should never be a barrier to receiving quality clinical consultation. This initiative ensures that even the most remote families feel seen and cared for.' },
    { id: 2, type: 'general', src: '/2.jpeg', caption: 'Empowerment begins with providing the right tools and knowledge to the younger generation of our community. By fostering a supportive environment, we help individuals unlock their full potential and build a brighter future. Every session is a step toward self-reliance and long-term social growth.' },
    { id: 3, type: 'general', src: '/3.jpeg', caption: 'Bringing specialized healthcare to rural areas requires innovation and a commitment to reaching every corner of the region. Our mobile infrastructure serves as a vital bridge between modern medicine and underserved populations. We remain steadfast in our mission to provide constant medical presence where it is needed most.' },
    { id: 4, type: 'general', src: '/4.jpeg', caption: 'Maternal and child health remains at the very heart of our clinical priorities and social mission. We provide a safe, compassionate space for mothers to receive the essential care required for a healthy start in life. Our specialists work tirelessly to ensure the wellbeing of both mother and child through every stage.' },
    { id: 5, type: 'general', src: '/5.jpeg', caption: 'Strengthening the community involves creating dedicated spaces for growth, dialogue, and mutual support. When individuals come together to share experiences and learn, the entire social fabric of the village becomes more resilient. We are proud to facilitate these vital connections that drive collective progress.' },
    { id: 6, type: 'general', src: '/6.jpeg', caption: 'True transformation is achieved through a deep understanding of the local landscape and the unique needs of its people. By maintaining a constant presence on the ground, we build lasting trust and meaningful relationships with the families we serve. Our work is a testament to the power of consistent, heart-led service.' },
    { id: 7, type: 'general', src: '/7.jpeg', caption: 'Preventive care is the most effective way to safeguard the health of our children and ensure a thriving future. Through systematic health checkups, we identify and address medical needs before they become critical challenges. Protecting the next generation is a responsibility we carry with the utmost seriousness.' },
    { id: 8, type: 'general', src: '/8.jpeg', caption: 'In an increasingly connected world, providing access to modern resources is essential for individual and community development. We focus on bridging the gap between traditional lifestyles and the opportunities offered by new-age tools. Knowledge sharing is the key to empowering the minds that will lead us forward.' },
    { id: 9, type: 'general', src: '/9.jpeg', caption: 'Local leadership and participation are the cornerstones of sustainable development in rural districts. We work closely with community representatives to ensure our healthcare and social programs are effective and culturally resonant. Collective action is what turns a vision of progress into a living reality.' },
    { id: 10, type: 'general', src: '/10.jpeg', caption: 'Our emergency response and critical care capabilities are designed to provide a safety net during life\'s most difficult moments. Every second counts, and our clinical team is trained to provide swift, life-saving interventions with precision. We stand ready to serve as a reliable guardian of public health 24/7.' },
    { id: 11, type: 'general', src: '/11.jpeg', caption: 'Meaningful partnerships allow us to amplify our message and reach a much wider audience across the state. By collaborating with like-minded organizations, we create a stronger voice for the underserved and marginalized. These alliances are built on a shared commitment to service and social excellence.' },
    { id: 12, type: 'general', src: '/12.jpeg', caption: 'Our central facility serves as a beacon of hope and a hub for comprehensive medical and social support. It is a place where professional excellence meets deep-rooted compassion for the common man. From this foundation, we continue to scale our impact and transform lives across the region.' },
    { id: 13, type: 'awards', src: '/13.jpeg', caption: 'This recognition serves as a humble reminder of the profound impact that dedicated community service can achieve. It belongs to every volunteer and staff member who works behind the scenes to uplift others. We are honored to be acknowledged for our commitment to social welfare.' },
    { id: 14, type: 'awards', src: '/14.jpeg', caption: 'Excellence in service is not a destination but a continuous journey of improving how we care for our patients. This honor validates our clinical standards and our drive to bring world-class healthcare to rural settings. It inspires our medical team to continue setting new benchmarks in clinical care.' },
    { id: 15, type: 'awards', src: '/15.jpeg', caption: 'Formal appreciation from national-level bodies strengthens our resolve to continue our mission with transparency and integrity. It highlights the importance of systematic development and the positive role of NGOs in nation-building. We remain dedicated to upholding the highest standards of institutional excellence.' },
    { id: 16, type: 'awards', src: '/16.jpeg', caption: 'Being recognized at the state level is a significant milestone that showcases the effectiveness of our rural models. This award celebrates the resilience of the communities we serve and the success of our collaborative efforts. It motivates us to expand our reach and touch even more lives in the years to come.' },
  ];

  const filters = [
    { id: 'all', label: 'Images', icon: Heart },
    { id: 'awards', label: 'Awards', icon: Award },
  ];

  const filteredMedia = filter === 'all'
    ? mediaItems.filter(item => item.type === 'general')
    : mediaItems.filter(item => item.type === 'awards');

  return (
    <div className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#1A365D] text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-4">
              <Activity size={14} className="text-[#FBBF24] animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FBBF24]">Excellence In Motion</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2 leading-[0.85]">
              Impact In <span className="text-[#FBBF24]">Motion</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 font-black uppercase tracking-[0.2em] mb-6">BSST Gallery & Recognition</p>
            <div className="flex justify-center gap-1">
              <div className="w-10 h-1.5 bg-[#FBBF24] rounded-full"></div>
              <div className="w-2 h-1.5 bg-white rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as MediaType)}
                className={`flex items-center space-x-3 px-10 py-4 rounded-full font-black uppercase tracking-widest text-[11px] transition-all duration-300 shadow-sm border ${
                  filter === f.id ? 'bg-[#FBBF24] text-[#1A365D] border-[#FBBF24] shadow-xl scale-105' : 'bg-gray-50 text-[#1A365D]/40 border-gray-100 hover:bg-gray-100'
                }`}
              >
                <f.icon size={16} />
                <span>{f.label}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            <AnimatePresence mode='popLayout'>
              {filteredMedia.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelectedMedia(item)}
                  className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all duration-500 border-4 border-white"
                >
                  <img src={item.src} alt="Gallery Item" className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A365D] via-[#1A365D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <p className="text-white text-[10px] font-medium leading-tight line-clamp-2">{item.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Enhancement */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 bg-[#1A365D]/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <button className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-[#FBBF24] hover:text-[#1A365D] rounded-full flex items-center justify-center transition-all text-white shadow-xl">
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <img src={selectedMedia.src} alt="Gallery item" className="w-full h-auto rounded-[3rem] shadow-2xl border-4 border-white/20" />
              <div className="bg-white rounded-b-[3rem] p-10 -mt-10 relative z-10 border-x-4 border-b-4 border-white/20">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-1 bg-[#FBBF24] rounded-full"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1A365D]/40">{selectedMedia.type}</span>
                  </div>
                <p className="text-[#1A365D] text-lg leading-relaxed font-medium">{selectedMedia.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </div>
  );
}