import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Rekha Devi',
    location: 'Araria, Bihar',
    image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg',
    story: 'Through the tailoring program, I gained skills that changed my life. Today, I run my own business and support my family with dignity.',
    program: 'Skill Development',
  },
  {
    id: 2,
    name: 'Ramesh Kumar',
    location: 'Khagaria, Bihar',
    image: 'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg',
    story: 'The free medical treatment saved my daughter\'s life. BSST provided care when we had no hope. Forever grateful to this organization.',
    program: 'Healthcare',
  },
  {
    id: 3,
    name: 'Sunita Kumari',
    location: 'Banka, Bihar',
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
    story: 'The literacy program opened doors I never knew existed. Now I can read, write, and help my children with their studies.',
    program: 'Education',
  },
  {
    id: 4,
    name: 'Vijay Singh',
    location: 'Hansdiha, Jharkhand',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    story: 'The mobile health unit visits our village monthly. It\'s brought quality healthcare to our doorstep, something we never had before.',
    program: 'Community Outreach',
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((curr) => (curr - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3 flex-shrink-0">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-[#0056b3] to-[#28a745] rounded-full opacity-20"></div>
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="relative rounded-2xl shadow-lg w-full h-64 object-cover"
                  />
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <Quote className="text-white" size={28} />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="inline-block bg-gradient-to-r from-[#0056b3] to-[#28a745] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  {testimonials[current].program}
                </div>
                <p className="text-2xl text-gray-700 italic leading-relaxed mb-6">
                  "{testimonials[current].story}"
                </p>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{testimonials[current].name}</h4>
                  <p className="text-gray-600">{testimonials[current].location}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center mt-8 space-x-4">
        <button
          onClick={prev}
          className="w-12 h-12 bg-gradient-to-r from-[#0056b3] to-[#28a745] text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 ${
                index === current
                  ? 'w-8 h-3 bg-gradient-to-r from-[#0056b3] to-[#28a745] rounded-full'
                  : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-12 h-12 bg-gradient-to-r from-[#0056b3] to-[#28a745] text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
