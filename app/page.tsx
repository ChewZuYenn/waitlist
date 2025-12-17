"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setStatus('loading');

  const { error } = await supabase
    .from('waitlist')
    .insert([{ email }]);

  if (error) {
    setStatus('error');
  } else {
    setStatus('success');
    setEmail('');
  }
};

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />

      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center max-w-2xl"
      >
        <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium mb-6 inline-block">
          Coming Soon to iOS & Android
        </span>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
          Trevor.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
          The short-video platform for your next escape. Explore hidden gems, 
          street foods, and breathtaking views—one swipe at a time.
        </p>

        {/* Signup Form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="relative flex flex-col md:flex-row gap-3 w-full max-w-md mx-auto"
          whileHover={{ scale: 1.02 }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all backdrop-blur-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button 
            disabled={status === 'loading'}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all active:scale-95 disabled:opacity-50"
          >
            {status === 'loading' ? 'Joining...' : 'Get Early Access'}
          </button>
        </motion.form>

        {/* Status Messages */}
        {status === 'success' && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-emerald-400">
            You're on the list! We'll reach out soon. ✈️
          </motion.p>
        )}
      </motion.div>

      {/* Visual Teaser Section */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-40">
        {['Bali', 'Tokyo', 'Rome', 'Paris'].map((place, i) => (
          <motion.div
            key={place}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="h-40 w-32 md:h-64 md:w-48 bg-white/5 rounded-2xl border border-white/10 flex items-end p-4"
          >
            <span className="text-sm font-semibold">{place}</span>
          </motion.div>
        ))}
      </div>
    </main>
  );
}