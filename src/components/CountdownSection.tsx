import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownSection = ({ onEnter }: { onEnter: () => void }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);

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
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-romantic-gradient px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center z-10"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-cursive text-gold text-2xl md:text-3xl mb-4"
        >
          A celebration of love for
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="font-cursive text-6xl md:text-8xl lg:text-9xl text-gold-gradient mb-6"
        >
          My Love
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="font-serif-display text-lg md:text-xl text-muted-foreground italic mb-12"
        >
          {isBirthday ? "🎂 Happy Birthday, Beautiful! 🎂" : "Counting every moment until your special day..."}
        </motion.p>

        {!isBirthday && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex gap-4 md:gap-8 justify-center mb-16"
          >
            {timeUnits.map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl bg-card shadow-romantic flex items-center justify-center border border-border">
                  <span className="font-serif-display text-2xl md:text-4xl font-bold text-foreground">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs md:text-sm text-muted-foreground mt-2 font-body tracking-wider uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          onClick={onEnter}
          className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-primary text-primary-foreground font-serif-display text-lg tracking-wide shadow-romantic hover:shadow-lg transition-all duration-500 hover:scale-105 animate-gentle-bounce"
        >
          <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Enter</span>
          <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CountdownSection;
