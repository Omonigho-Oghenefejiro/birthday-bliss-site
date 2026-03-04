import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownSection = ({ onEnter, isUnlocked }: { onEnter: () => void; isUnlocked: boolean }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const quotes = [
    {
      main: "The woman who changed everything",
      sub: "Since the moment we met — January 28th, 2026",
    },
    {
      main: "My person, my love, my everything",
      sub: "Every day with you feels like a gift",
    },
    {
      main: "The best decision I ever made",
      sub: "Was meeting you on that perfect day",
    },
    {
      main: "You make my heart skip a beat",
      sub: "Every single time I see your smile",
    },
    {
      main: "My favorite hello and my hardest goodbye",
      sub: "But mostly just my forever",
    },
  ];

  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const currentQuote = quotes[quoteIndex];

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 10000);

    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  useEffect(() => {
    const createAmbientSound = () => {
      const audio = new Audio();
      audio.loop = true;
      audio.volume = 0.02;
      audioRef.current = audio;

      audio.play().catch(() => {
        // Autoplay might be blocked by browser, that's okay
      });
    };

    createAmbientSound();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let birthday = new Date(currentYear, 2, 11); // March 11

      if (now > birthday) {
        // Check if it's still March 11
        if (now.getMonth() === 2 && now.getDate() === 11) {
          setIsBirthday(true);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        birthday = new Date(currentYear + 1, 2, 11);
      }

      const diff = birthday.getTime() - now.getTime();
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black -z-10" />

      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-amber-300 rounded-full filter blur-3xl opacity-5 -z-10"
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-amber-200 rounded-full filter blur-3xl opacity-5 -z-10"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl opacity-10 -z-10"
      />

      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-amber-100 rounded-full"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 100, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${5 + Math.random() * 90}%`,
          }}
        />
      ))}

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-amber-200/10 text-4xl"
          animate={{
            y: [0, -200, 0],
            x: [0, Math.cos(i) * 150, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 8 + i * 1,
            repeat: Infinity,
            delay: i * 1.2,
          }}
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 90}%`,
          }}
        >
          ♥
        </motion.div>
      ))}

      <motion.div
        animate={{
          opacity: [0, 0.3, 0],
          x: [-100, 100, -100],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 0 }}
        className="absolute top-1/3 -left-1/2 w-full h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent blur-xl opacity-0 -z-10"
      />

      <motion.div
        animate={{
          opacity: [0, 0.2, 0],
          x: [100, -100, 100],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-1/3 -right-1/2 w-full h-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent blur-xl opacity-0 -z-10"
      />

      <motion.div
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 border-r border-t border-amber-300/20 rounded-bl-3xl -z-10"
      />

      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-0 left-0 w-96 h-96 border-l border-b border-amber-300/20 rounded-tr-3xl -z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 relative max-w-2xl"
      >
        <motion.div
          className="flex justify-center mb-12"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Heart className="w-6 h-6 text-amber-300 fill-amber-300" />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
          <p className="text-amber-300 text-sm md:text-base mb-6 tracking-widest font-light">
            THE DAY I'VE BEEN WAITING FOR
          </p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Zaniella's
            <br />
            Birthday
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="h-px w-20 mx-auto mb-8 bg-gradient-to-r from-transparent via-amber-300 to-transparent"
          />

          <AnimatePresence mode="wait">
            <div key={quoteIndex}>
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.8 }}
                className="text-amber-300 text-base md:text-lg font-light mb-2"
              >
                {currentQuote.main}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.8 }}
                className="text-amber-200/70 text-sm font-light mb-16"
              >
                {currentQuote.sub}
              </motion.p>
            </div>
          </AnimatePresence>
        </motion.div>

        {!isBirthday && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex gap-2 md:gap-4 justify-center mb-16 flex-wrap"
          >
            {timeUnits.map((unit, idx) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + idx * 0.1, duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-white/5 border border-amber-300/40 flex items-center justify-center backdrop-blur-sm hover:border-amber-300/70 transition-all duration-300 group cursor-default shadow-lg shadow-amber-300/5">
                  <motion.span
                    key={unit.value}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-3xl text-white font-light tracking-tight"
                  >
                    {String(unit.value).padStart(2, "0")}
                  </motion.span>
                </div>
                <span className="text-xs md:text-sm text-amber-300/70 mt-3 font-light tracking-wider uppercase">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {isBirthday && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <p className="text-3xl md:text-4xl text-amber-300 font-light mb-4">🎂 Happy Birthday, Beautiful 🎂</p>
            <p className="text-white/70 text-lg">Today, we celebrate you.</p>
          </motion.div>
        )}

        {isUnlocked ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            onClick={onEnter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-sm bg-white text-black font-light text-base tracking-wide shadow-lg hover:shadow-amber-300/40 transition-all duration-300 border border-amber-300/40 hover:border-amber-300/70"
          >
            <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Heart className="w-4 h-4 fill-black" />
            </motion.span>
            <span>See Your Surprise</span>
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.15 }}
            >
              <Heart className="w-4 h-4 fill-black" />
            </motion.span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="text-center"
          >
            <p className="text-amber-300/80 text-sm font-light mb-2">Come back on March 11th to unlock your surprise</p>
            <motion.p
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-amber-300/50 text-xs"
            >
              Something special is waiting for you
            </motion.p>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="mt-20 text-amber-300/60 text-xs font-light tracking-wider"
        >
          Made with love by Eggroll 🥚
        </motion.p>
      </motion.div>
    </section>
  );
};

export default CountdownSection;
