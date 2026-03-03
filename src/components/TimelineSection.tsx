import { motion } from "framer-motion";
import { Heart, Star, Sparkles, Coffee, Music, MapPin } from "lucide-react";

const milestones = [
  {
    date: "The Day We Met",
    title: "Where it all began",
    description: "The moment I saw you, I knew my life was about to change forever.",
    icon: Sparkles,
  },
  {
    date: "Our First Date",
    title: "Butterflies & magic",
    description: "Nervous hands, shy smiles, and the beginning of something beautiful.",
    icon: Coffee,
  },
  {
    date: "Our First Trip",
    title: "Adventures with you",
    description: "Discovering the world is so much better when you're by my side.",
    icon: MapPin,
  },
  {
    date: "Our Song",
    title: "The melody of us",
    description: "Every time it plays, I'm taken back to that perfect moment with you.",
    icon: Music,
  },
  {
    date: "A Special Milestone",
    title: "Growing together",
    description: "Each day with you teaches me something new about love.",
    icon: Star,
  },
  {
    date: "Today",
    title: "Still falling for you",
    description: "Every day I love you more than yesterday, and that's my forever promise.",
    icon: Heart,
  },
];

const TimelineSection = () => {
  return (
    <section className="min-h-screen py-20 px-4 bg-romantic-gradient">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-cursive text-5xl md:text-6xl text-gold-gradient mb-4">
            Our Story
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            The beautiful journey of us
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-primary to-gold" />

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
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-card border-2 border-gold shadow-romantic flex items-center justify-center z-10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                {/* Content card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="bg-card rounded-2xl p-6 shadow-romantic border border-border hover:shadow-lg transition-shadow duration-300">
                    <p className="font-cursive text-lg text-gold mb-1">{milestone.date}</p>
                    <h3 className="font-serif-display text-xl font-semibold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
