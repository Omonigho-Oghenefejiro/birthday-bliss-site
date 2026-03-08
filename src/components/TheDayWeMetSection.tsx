import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import zaniellaPhoto from "@/assets/zaniella.jpeg";
import zaniellaSmile from "@/assets/zaniella-smile.jpeg";

const TheDayWeMetSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-black relative overflow-hidden">
      {/* Subtle ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-300 rounded-full filter blur-[120px]"
      />

      <div className="max-w-5xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="font-light text-5xl md:text-6xl text-amber-300 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Day We Met
          </h2>
          <p className="font-light text-amber-200/50 text-lg">
            The moment everything changed
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-72 h-96 md:w-80 md:h-[28rem] rounded-2xl overflow-hidden shadow-2xl shadow-amber-300/10 border border-amber-300/20">
              <img
                src={zaniellaPhoto}
                alt="Zaniella - the day we met"
                className="w-full h-full object-cover"
              />
              {/* Gold shimmer overlay */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/10 to-transparent skew-x-12"
              />
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-amber-300/40 rounded-tl-lg" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-amber-300/40 rounded-br-lg" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <Eye className="w-5 h-5 text-amber-300/70" />
              <span className="text-amber-300/70 font-light text-sm uppercase tracking-widest">
                Love at first sight
              </span>
            </div>

            <div className="space-y-5">
              <p className="font-light text-lg md:text-xl text-white/85 leading-relaxed">
                The day we met, I fell in love with your eyes.
              </p>

              <p className="font-light text-base md:text-lg text-white/70 leading-relaxed">
                Those eyes — the way they looked at me, the way they lit up when you smiled. I couldn't look away. I didn't want to.
              </p>

              <p className="font-light text-base md:text-lg text-white/70 leading-relaxed">
                Then I saw this smile. This exact smile. And I knew I was done for.
              </p>

              {/* The smile photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-amber-300/20 shadow-lg shadow-amber-300/10 mx-auto lg:mx-0"
              >
                <img
                  src={zaniellaSmile}
                  alt="The smile I fell in love with"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <p className="font-light text-base md:text-lg text-white/70 leading-relaxed">
                And now? I've fallen in love with everything about you. Your laugh, your mind, the way you carry yourself. Every single detail I discover makes me fall deeper.
              </p>

              <p className="font-light text-base md:text-lg text-amber-300/90 leading-relaxed italic">
                You went from the girl with the beautiful eyes to the woman who has my whole heart.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 flex items-center justify-center lg:justify-start gap-1.5"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TheDayWeMetSection;
