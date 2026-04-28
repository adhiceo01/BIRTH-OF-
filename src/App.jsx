import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Gift, Sparkles, Code, Link, Mail, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import Countdown from './components/Countdown';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(''));
  const friendName = "NAVEENA";
  const roles = ["KEEP ON SIMILING ", "THE BEST WISH FROM ADHITHYA", "Future to achieve more", "The Chosen One"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 py-6">
        <div className="container flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter">
            <span className="text-blue-500">Naveena</span>day
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#home" className="hover:text-white transition-colors">Wishes</a>
            <a href="#surprise" className="hover:text-white transition-colors">Surprise</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <button onClick={toggleMusic} className="btn btn-primary !py-2 !px-4 text-sm">
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause Music' : 'Play Music'}
          </button>
        </div>
      </nav>

      <main className="pt-32">
        {/* Hero Section */}
        <section id="home" className="container min-h-[70vh] flex flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-xs font-semibold mb-12"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for celebrations
          </motion.div>

          <h1 className="hero-text mb-8">
            Happy Birthday,<br />
            <span className="gradient-text uppercase">{friendName}</span>
          </h1>

          <div className="h-12 text-2xl md:text-3xl font-light text-slate-400 mb-12">
            HELLO NAVEENA {' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-white border-r-2 border-blue-500 pr-2"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <Countdown />

          <p className="max-w-2xl text-slate-400 mb-12 text-lg leading-relaxed mt-12">
            Sending you waves of happiness and a mountain of good vibes. 
            May this year be as legendary as you are! 
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={triggerConfetti} className="btn btn-primary">
              <Sparkles className="w-5 h-5" />
              Celebrate Now
            </button>
          </div>
        </section>

        {/* Surprise Section */}
        <section id="surprise" className="py-32 container text-center">
          <div className="glass p-12 rounded-[40px] border border-white/5 max-w-3xl mx-auto">
            <Gift className="w-16 h-16 text-blue-500 mx-auto mb-8 animate-bounce" />
            <h2 className="text-3xl font-bold mb-6">A Special Message</h2>
            <p className="text-slate-400 text-lg leading-relaxed italic mb-8">
              "They say legends are born in April, and you're the proof. 
              Keep shining, keep grinding, and never lose that spark."
            </p>
            <button onClick={triggerConfetti} className="btn btn-primary scale-110">
              Double Surprise!
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="py-20 border-t border-white/5">
        <div className="container flex flex-col items-center">
          <div className="flex gap-6 mb-12">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Code className="w-6 h-6" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Link className="w-6 h-6" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><MessageCircle className="w-6 h-6" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Mail className="w-6 h-6" /></a>
          </div>
          <div className="text-slate-500 text-sm">
            Made with ADHITHYA  for {friendName}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
