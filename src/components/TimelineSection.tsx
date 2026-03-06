import { motion } from "framer-motion";
import { Heart, Star, Sparkles, Coffee, Music, MapPin } from "lucide-react";

const milestones = [
  {
    date: "January 28th, 2026",
    title: "The Day We Met",
    description: "The moment I saw you, everything changed. You walked into my life and made it infinitely better. That was the beginning of us.",
    icon: Sparkles,
  },
  {
    date: "February 28th, 2026",
    title: "One Month of Us",
    description: "A whole month of getting to know you, laughing with you, falling deeper. Every day with you feels like a gift I never knew I needed.",
    icon: Coffee,
  },
  {
    date: "March 3rd, 2026",
    title: "I Love You Too",
    description: "I told you I love you, and you said it back. That moment changed everything. I blushed so hard because I realized you're real and you're mine.",
    icon: Heart,
  },
  {
    date: "Our Song",
    title: "Love Me Again",
    description: "John Newman's words became our words. Every time it plays, I'm reminded of you and how you make my heart feel alive.",
    icon: Music,
  },
  {
    date: "A Promise",
    title: "Growing Together",
    description: "I promise to always push you to be your best, to celebrate every smile, to cherish your laugh, and to love you harder each day.",
    icon: Star,
  },
  {
    date: "Today & Forever",
    title: "Your Birthday & Beyond",
    description: "Happy Birthday to the woman who changed my world. I'm so excited for all the memories we're going to create together.",
    icon: Heart,
  },
];

const TimelineSection = () => {
  return (
    <section className="min-h-screen py-20 px-4 bg-black">
      {/* Animated background */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl opacity-5 -z-10"
      />

      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-light text-5xl md:text-6xl text-amber-300 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Story
          </h2>
          <p className="font-light text-amber-200/60 text-lg">
            The beautiful journey of us
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-300 via-amber-200 to-amber-300" />

          {milestones.map((milestone, i) => {
            const Icon = milestone.icon;
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className={`relative flex items-center mb-12 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gray-950 border-2 border-amber-300 shadow-lg shadow-amber-300/20 flex items-center justify-center z-10">
                  <Icon className="w-5 h-5 text-amber-300" />
                </div>

                {/* Content card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="bg-gray-950/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-300/30 hover:border-amber-300/60 transition-all duration-300">
                    <p className="font-light text-lg text-amber-300 mb-1">{milestone.date}</p>
                    <h3 className="font-light text-xl text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {milestone.title}
                    </h3>
                    <p className="font-light text-amber-200/70 text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center mt-16"
        >
          <p className="font-light text-amber-200/50 text-sm">
            And every day with you is a new favorite memory 💕
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;
