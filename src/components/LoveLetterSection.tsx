import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const LoveLetterSection = () => {
  const paragraphs = [
    "My Dearest,",
    "On this beautiful day, I want you to know just how much you mean to me. Every moment with you feels like a dream I never want to wake up from.",
    "Your smile lights up my darkest days, your laughter is the sweetest melody, and your love is the greatest gift I've ever received.",
    "You make the ordinary feel extraordinary, and I am endlessly grateful for every second we share together.",
    "Happy Birthday, my love. May this year bring you all the joy, love, and magic you deserve — and so much more.",
    "Forever and always yours ❤️",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 bg-romantic-gradient">
      {/* Decorative sparkles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gold animate-sparkle"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="max-w-2xl w-full relative z-10"
      >
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-romantic border border-gold-light/30 relative overflow-hidden">
          {/* Gold corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold rounded-br-2xl" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center mb-8"
          >
            <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="font-cursive text-4xl md:text-5xl text-gold-gradient">
              A Letter For You
            </h2>
          </motion.div>

          <div className="space-y-5">
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.2, duration: 0.7 }}
                className={`text-foreground leading-relaxed ${
                  i === 0 ? "font-cursive text-2xl text-primary" : 
                  i === paragraphs.length - 1 ? "font-cursive text-xl text-primary text-right mt-8" :
                  "font-body text-base md:text-lg"
                }`}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LoveLetterSection;
