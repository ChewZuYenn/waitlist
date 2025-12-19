"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Heart, MessageCircle, Send, User, MapPin } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const DEMO_VIDEOS = [
  { id: 1, title: "Street Food", location: "Osaka", image: "https://images.unsplash.com/photo-1526312426976-f4d754fa9bd6?auto=format&fit=crop&w=900&q=80" },
  { id: 2, title: "Hidden Gem", location: "Bali", image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80" },
  { id: 3, title: "Viewpoint", location: "Tokyo", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80" },
  { id: 4, title: "Cafe Spot", location: "Paris", image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80" },
];

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-pagination for the demo
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 4000);
    return () => clearInterval(timer);
  }, [index]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + DEMO_VIDEOS.length) % DEMO_VIDEOS.length);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const { error } = await supabase.from("waitlist").insert([{ email }]);
    if (error) setStatus("error");
    else {
      setStatus("success");
      setEmail("");
    }
  };

  const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.4, ease: "easeIn" },
  }),
} satisfies Variants;

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="container max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left: Hero & Signup */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium mb-8 inline-block text-emerald-400"
          >
            Coming Soon to iOS & Android
          </motion.span>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Trevor.
          </h1>
          
          <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-lg">
            The short-video platform for your next escape. Discover hidden gems, 
            local eats, and breathtaking views—all in 60 seconds.
          </p>

          <form onSubmit={handleSubmit} className="relative flex flex-col md:flex-row gap-3 w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all backdrop-blur-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'loading'}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {status === 'loading' ? 'Joining...' : 'Get Early Access'}
            </motion.button>
          </form>

          {status === 'success' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-emerald-400 font-medium">
              Welcome to the list! Check your inbox soon. ✈️
            </motion.p>
          )}
        </motion.div>

        {/* Right: Phone Demo Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative flex flex-col items-center"
        >
          {/* Instruction Overlay */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-slate-500 text-xs font-semibold uppercase tracking-widest whitespace-nowrap bg-slate-900/50 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
            Tap right to explore • Tap left to revisit
          </div>

          {/* Phone Frame */}
          <div className="relative w-[300px] h-[600px] bg-slate-900 rounded-[3.5rem] p-3 border-[8px] border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-50" />
            
            <div className="absolute inset-0 z-40 flex">
              <div onClick={() => paginate(-1)} className="flex-1 h-full cursor-pointer group flex items-center justify-start p-4">
                 <div className="opacity-0 group-hover:opacity-30 transition-opacity bg-white/20 w-8 h-8 rounded-full flex items-center justify-center">←</div>
              </div>
              <div onClick={() => paginate(1)} className="flex-1 h-full cursor-pointer group flex items-center justify-end p-4">
                 <div className="opacity-0 group-hover:opacity-30 transition-opacity bg-white/20 w-8 h-8 rounded-full flex items-center justify-center">→</div>
              </div>
            </div>

            <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden bg-black">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{
                    backgroundImage: `url(${DEMO_VIDEOS[index].image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="absolute inset-0 flex flex-col justify-end p-6"
                >
                  <div className="z-20 mb-10">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">{DEMO_VIDEOS[index].title}</h3>
                    <div className="flex items-center gap-1 text-white/90 font-medium">
                      <MapPin size={14} className="text-emerald-400" />
                      <span>{DEMO_VIDEOS[index].location}</span>
                    </div>
                  </div>
                  {/* Overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                </motion.div>
              </AnimatePresence>

              {/* Sidebar UI */}
              <div className="absolute right-3 bottom-24 z-50 flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                    <User size={20} />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Heart size={28} className="text-white fill-transparent hover:fill-rose-500 transition-colors" />
                  <span className="text-[10px] font-bold">2.4k</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <MessageCircle size={28} className="text-white" />
                  <span className="text-[10px] font-bold">128</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Send size={24} className="text-white" />
                  <span className="text-[10px] font-bold">Share</span>
                </div>
              </div>
            </div>
          </div>
          
          <motion.div 
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-emerald-500/10 blur-[80px] -z-10 rounded-full"
          />
        </motion.div>
      </div>
    </main>
  );
}