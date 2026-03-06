import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const LoveLetterSection = () => {
  const paragraphs = [
    "My Dearest Zaniella,",
    "I still can't believe you're real. Every time I see your smile, every time I hear that laugh of yours, every time you do those little mannerisms that make you... you — I fall for you all over again.",
    "I remember when you gave me an ultimatum about finishing my project work. You didn't play around, and I loved that about you. Then you sent that voice note: 'Get in joor' — and I knew right then that you were different. You push me to be better, and you do it with such genuine care wrapped in playful toughness.",
    "Your personality is magnetic. The way you light up a room, the way you're unapologetically yourself — it's everything. And when we built that playlist together, adding The Weeknd songs and all our favorites, I realized we're not just compatible, we're meant to be. You get me. You really do.",
    "On your birthday, I want you to know that I'm not just interested in you, Zaniella — I really, truly like you. Like, the kind of like that makes me want to build a future with you. You're the person I want to send voice notes to, the person I want beside me, the person I'm already so deeply falling for.",
    "Happy Birthday to the most incredible woman. May this year bring you everything you deserve and more. May we keep building memories together, keep adding songs to our playlist, and keep making each other laugh.",
    "All my love,",
    "Eggroll 🥚💕",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 bg-black">
      {/* Animated background glow */}
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

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="max-w-2xl w-full relative z-10"
      >
        <div className="bg-gray-950/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-amber-300/30 relative overflow-hidden">
          {/* Gold corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-300 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-300 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-300 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-300 rounded-br-2xl" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 text-amber-300 mx-auto mb-4 fill-amber-300" />
            </motion.div>
            <h2 className="font-light text-4xl md:text-5xl text-amber-300" style={{ fontFamily: "'Playfair Display', serif" }}>
              A Letter For You
            </h2>
          </motion.div>

          <div className="space-y-6">
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.7 }}
                className={`leading-relaxed ${
                  i === 0 
                    ? "font-light text-2xl text-amber-300" 
                    : i === paragraphs.length - 1 
                    ? "font-light text-lg text-amber-200/80 text-right mt-8" 
                    : "font-light text-base md:text-lg text-white/80"
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
