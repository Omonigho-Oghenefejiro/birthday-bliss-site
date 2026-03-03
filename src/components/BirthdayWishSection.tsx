import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Heart, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";

const BirthdayWishSection = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);

    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#d4919e", "#c9956b", "#f5e6d3", "#e8b4b8", "#d4a574"];

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
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-romantic-gradient relative">
      <div className="max-w-2xl w-full text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="font-cursive text-5xl md:text-6xl text-gold-gradient mb-4">
            A Special Surprise
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            I have something for you...
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
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-br from-primary to-rose shadow-romantic flex items-center justify-center border-4 border-gold/30 cursor-pointer transition-all duration-500 group-hover:shadow-lg">
                  {/* Ribbon */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-gold/20 rounded-full" />
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-8 bg-gold/20 rounded-full" />
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 rounded-full bg-gold/30" />

                  <Gift className="w-16 h-16 md:w-20 md:h-20 text-primary-foreground relative z-10" />
                </div>
              </motion.button>
              <p className="mt-6 font-body text-muted-foreground animate-gentle-bounce">
                Tap to unwrap your gift ✨
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="bg-card rounded-3xl p-8 md:p-12 shadow-romantic border border-gold-light/30 max-w-lg">
                <PartyPopper className="w-12 h-12 text-gold mx-auto mb-6" />
                <h3 className="font-cursive text-4xl md:text-5xl text-gold-gradient mb-6">
                  Happy Birthday!
                </h3>
                <p className="font-body text-foreground text-lg leading-relaxed mb-6">
                  You are the most wonderful person in my life. I am so lucky and grateful to have you.
                  This website is just a small token of my love — but my heart is yours, completely and forever.
                </p>
                <p className="font-cursive text-2xl text-primary">
                  I love you more than words can say
                </p>
                <div className="flex justify-center gap-2 mt-8">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                    >
                      <Heart className="w-6 h-6 text-primary fill-primary" />
                    </motion.div>
                  ))}
                </div>
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
          className="mt-20 font-cursive text-xl text-muted-foreground"
        >
          Made with all my love, just for you 💕
        </motion.p>
      </div>
    </section>
  );
};

export default BirthdayWishSection;
