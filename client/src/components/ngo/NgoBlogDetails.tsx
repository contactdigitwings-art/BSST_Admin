import { useLocation } from 'wouter';;
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export default function BlogDetails() {
  const [location] = useLocation();
  const [, navigate] = useLocation();

  // Extract the 'blog' object from sessionStorage (since wouter doesn't support state)
  const blogData = sessionStorage.getItem('blogData');
  const blog = blogData ? JSON.parse(blogData) : null;

  // If someone tries to access /blog directly without clicking a card
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold text-[#1A365D]">No Blog Content Found</h2>
        <button onClick={() => navigate('/')} className="text-[#0056b3] underline">Go Back Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center gap-2 text-[#1A365D] font-bold mb-8 hover:text-[#FBBF24] transition-colors"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img src={blog.image} alt={blog.title} className="w-full h-[400px] object-cover rounded-[3rem] shadow-2xl mb-10" />
          
          <h1 className="text-4xl md:text-6xl font-black text-[#1A365D] uppercase tracking-tighter mb-6 leading-tight">
            {blog.title}
          </h1>

          <div className="flex gap-6 mb-10 text-gray-500 font-bold text-sm uppercase tracking-widest">
             <span className="flex items-center gap-2"><Calendar size={16} /> Feb 2026</span>
             <span className="flex items-center gap-2"><User size={16} /> BSST Admin</span>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed">
            {/* If your description is long, it displays here */}
            {blog.description}
            
            {/* Add more placeholder content to make it look like a full blog */}
            <p className="mt-6">
              {/* Our commitment to {blog.title} is a core pillar of Bharti Sewa Sadan Trust. 
              Through dedicated Seva, we ensure that the resources reaching Araria are used 
              with 100% transparency and maximum impact for those in need. */}
              {blog.blogContent}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}