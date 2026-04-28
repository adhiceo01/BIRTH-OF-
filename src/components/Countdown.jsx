import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to next year if birthday passed, or use a fixed date for demo
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5); // 5 days from now for demo

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 justify-center mt-12">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <div className="text-3xl md:text-5xl font-bold tracking-tighter bg-white/5 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-2xl border border-white/5">
            {String(value).padStart(2, '0')}
          </div>
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-slate-500 mt-2 font-semibold">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
