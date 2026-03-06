import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Heart, PartyPopper, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

const BirthdayWishSection = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);

    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#fcd34d", "#fbbf24", "#f59e0b", "#d97706", "#b45309"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-black relative">
      {/* Animated background */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl opacity-5 -z-10"
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-amber-100 rounded-full"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 80, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
        />
      ))}

      <div className="max-w-2xl w-full text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="font-light text-5xl md:text-6xl text-amber-300 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            A Special Surprise
          </h2>
          <p className="font-light text-amber-200/60 text-lg">
            Something for the woman who means everything to me...
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="gift"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <motion.button
                onClick={handleReveal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-br from-amber-300 to-amber-400 shadow-2xl shadow-amber-300/30 flex items-center justify-center border-4 border-amber-200/50 cursor-pointer transition-all duration-500 group-hover:shadow-amber-300/50">
                  {/* Ribbon */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-white/30 rounded-full" />
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-8 bg-white/30 rounded-full" />
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 rounded-full bg-white/40" />

                  <Gift className="w-16 h-16 md:w-20 md:h-20 text-black relative z-10" />
                </div>
              </motion.button>
              <motion.p
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 font-light text-amber-200/70 text-lg"
              >
                Tap to unwrap your gift ✨
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="bg-gray-950/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-amber-300/30 max-w-lg">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-6"
                >
                  <PartyPopper className="w-12 h-12 text-amber-300 mx-auto" />
                </motion.div>

                <h3 className="font-light text-4xl md:text-5xl text-amber-300 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Happy Birthday, Zaniella
                </h3>

                <div className="space-y-5 mb-8">
                  <p className="font-light text-base md:text-lg text-white/80 leading-relaxed">
                    You are so much more than I could have ever imagined. In just these weeks with you, you've become my person, my favorite person.
                  </p>

                  <p className="font-light text-base md:text-lg text-white/80 leading-relaxed">
                    Your laugh, your smile, the way you light up a room — it's intoxicating. The way you pushed me to finish my work, the way you say "Get in joor," the way your personality just radiates pure authenticity. You're everything.
                  </p>

                  <p className="font-light text-base md:text-lg text-white/80 leading-relaxed">
                    When you said "I love you too" on March 3rd, I knew my heart would never be the same. You're not just someone I like, Zaniella — you're someone I'm building a future with.
                  </p>

                  <p className="font-light text-base md:text-lg text-amber-300 leading-relaxed italic">
                    This year, I promise to love you like you deserve. To celebrate you every single day. To be your person like you're mine.
                  </p>
                </div>

                <div className="flex justify-center gap-2 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                    >
                      <Heart className="w-6 h-6 text-amber-300 fill-amber-300" />
                    </motion.div>
                  ))}
                </div>

                <p className="font-light text-amber-200/60 text-sm">
                  I love you, Zaniella.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 font-light text-amber-200/40 text-sm"
        >
          Made with all my love, Eggroll 🥚
        </motion.p>
      </div>
    </section>
  );
};

export default BirthdayWishSection;
