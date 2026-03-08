import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronRight, Sparkles, Crown, Star } from "lucide-react";
import confetti from "canvas-confetti";

const compliments = [
  {
    title: "You're Magnetic",
    text: "The way you walk into a room and own it without even trying... your energy is intoxicating. You don't just light up a room — you become the room.",
  },
  {
    title: "You're My Favorite Sound",
    text: "Your laugh is my favorite song. The way it starts soft and then takes over — I'd do anything to hear it every single day for the rest of my life.",
  },
  {
    title: "You Make Me Better",
    text: "Remember when you told me to 'Get in joor' and finish my work? You push me to be the best version of myself, and you do it with so much love wrapped in that tough exterior.",
  },
  {
    title: "You're Unapologetically You",
    text: "Your authenticity is rare. You don't pretend, you don't fake it. You're real, raw, and beautiful in every way. That's what drew me to you from day one.",
  },
];

const ProposalSection = () => {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [saidYes, setSaidYes] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [sending, setSending] = useState(false);

  const yesScale = 1 + noCount * 0.25;
  const yesPadding = 16 + noCount * 6;

  const noMessages = [
    "No",
    "Are you sure? 🥺",
    "Really really sure?",
    "Think again...",
    "Please? 🥺💕",
    "I'll cry 😭",
    "PLEASE 😭😭",
    "Last chance...",
  ];

  const handleNo = () => {
    setNoCount((c) => Math.min(c + 1, noMessages.length - 1));
  };

  const handleYes = async () => {
    setSaidYes(true);

    // Fire celebration confetti
    const duration = 5000;
    const end = Date.now() + duration;
    const colors = ["#fcd34d", "#fbbf24", "#f59e0b", "#ec4899", "#f43f5e"];

    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    // Send email notification
    setSending(true);
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      if (projectId) {
        await fetch(`https://${projectId}.supabase.co/functions/v1/notify-proposal`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "She said YES! 💕🎉" }),
        });
      }
    } catch (e) {
      console.log("Email notification attempted");
    } finally {
      setSending(false);
    }
  };

  const handleNext = () => {
    if (step < compliments.length - 1) {
      setStep((s) => s + 1);
    } else {
      setShowQuestion(true);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-black relative overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl opacity-5"
      />

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-pink-100 rounded-full"
          animate={{
            y: [0, -120, 0],
            x: [0, Math.sin(i) * 60, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{ duration: 5 + i * 0.7, repeat: Infinity, delay: i * 0.4 }}
          style={{ top: `${30 + Math.random() * 40}%`, left: `${15 + Math.random() * 70}%` }}
        />
      ))}

      <div className="max-w-2xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            className="font-light text-5xl md:text-6xl text-amber-300 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            One More Thing...
          </h2>
          <p className="font-light text-amber-200/60 text-lg">
            I have something important to ask you 💕
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!started && !saidYes && (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStarted(true)}
                className="px-10 py-5 bg-gradient-to-r from-amber-300 to-pink-400 text-black font-medium rounded-2xl text-xl shadow-lg shadow-pink-300/20 hover:shadow-pink-300/40 transition-shadow"
              >
                Can I Ask You Something? 💫
              </motion.button>
            </motion.div>
          )}

          {started && !showQuestion && !saidYes && (
            <motion.div
              key={`compliment-${step}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-950/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-amber-300/30 text-center">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-6"
                >
                  <Sparkles className="w-10 h-10 text-amber-300 mx-auto" />
                </motion.div>

                <h3
                  className="font-light text-3xl md:text-4xl text-amber-300 mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {compliments[step].title}
                </h3>

                <p className="font-light text-base md:text-lg text-white/80 leading-relaxed mb-10">
                  {compliments[step].text}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-amber-200/40 text-sm font-light">
                    {step + 1} of {compliments.length}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 bg-amber-300 text-black font-medium rounded-xl hover:bg-amber-400 transition-colors"
                  >
                    {step < compliments.length - 1 ? "Next" : "Continue"}
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {showQuestion && !saidYes && (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="bg-gray-950/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-pink-300/30 text-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mb-8"
                >
                  <Heart className="w-16 h-16 text-pink-400 mx-auto fill-pink-400" />
                </motion.div>

                <h3
                  className="font-light text-4xl md:text-5xl text-amber-300 mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Zaniella...
                </h3>

                <p className="font-light text-2xl md:text-3xl text-white/90 mb-12">
                  Will you be my girlfriend? 💕
                </p>

                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <motion.button
                    animate={{ scale: yesScale }}
                    transition={{ type: "spring", stiffness: 300 }}
                    whileHover={{ scale: yesScale * 1.05 }}
                    whileTap={{ scale: yesScale * 0.95 }}
                    onClick={handleYes}
                    className="bg-gradient-to-r from-pink-400 to-amber-300 text-black font-bold rounded-2xl shadow-lg shadow-pink-300/30 transition-all"
                    style={{
                      paddingLeft: yesPadding,
                      paddingRight: yesPadding,
                      paddingTop: yesPadding * 0.6,
                      paddingBottom: yesPadding * 0.6,
                      fontSize: `${1 + noCount * 0.15}rem`,
                    }}
                  >
                    Yes! 💕
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 0.95 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNo}
                    className="px-6 py-3 border border-gray-600 text-gray-400 font-light rounded-xl hover:bg-gray-800/50 transition-colors text-sm"
                  >
                    {noMessages[noCount]}
                  </motion.button>
                </div>

                {noCount > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 text-amber-200/50 text-sm font-light"
                  >
                    {noCount >= 5 ? "The Yes button isn't going to stop growing... 👀" : "You know you want to say yes... 😏"}
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}

          {saidYes && (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full"
            >
              <div className="bg-gray-950/60 backdrop-blur-md rounded-3xl p-8 md:p-14 border border-amber-300/40 text-center relative overflow-hidden">
                {/* Animated gold shimmer lines */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`line-${i}`}
                    className="absolute h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"
                    style={{ top: `${15 + i * 18}%`, left: 0, right: 0 }}
                    animate={{ opacity: [0, 0.6, 0], x: [-200, 200] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                  />
                ))}

                {/* Firework bursts */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`spark-${i}`}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      background: i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#fcd34d" : "#f59e0b",
                      top: `${10 + Math.random() * 80}%`,
                      left: `${5 + Math.random() * 90}%`,
                    }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                      y: [0, -60 - Math.random() * 40, -120],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                    }}
                  />
                ))}

                {/* Radiating rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`ring-${i}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-300/20"
                    animate={{
                      width: [0, 400 + i * 100],
                      height: [0, 400 + i * 100],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 1,
                      ease: "easeOut",
                    }}
                  />
                ))}

                <div className="relative z-10">
                  {/* Crown icon */}
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mb-4"
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Crown className="w-14 h-14 text-amber-300 mx-auto" />
                    </motion.div>
                  </motion.div>

                  {/* Main title */}
                  <motion.h3
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                    className="font-light text-4xl md:text-6xl lg:text-7xl text-amber-300 mb-3 leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    ZANIELLA & EGGROLL
                  </motion.h3>

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-3"
                  />

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="text-2xl md:text-3xl font-light text-white/90 mb-8 tracking-wide"
                  >
                    ARE OFFICIAL 💛
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="font-light text-lg text-white/70 mb-3"
                  >
                    I'm the happiest man alive right now. You just made my entire world.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    className="font-light text-lg text-amber-200/70 italic mb-10"
                  >
                    From this moment on, you're officially mine and I'm officially yours. Forever.
                  </motion.p>

                  {/* Star row */}
                  <div className="flex justify-center gap-4 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, rotate: -180, scale: 0 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        transition={{ delay: 1.8 + i * 0.15, type: "spring" }}
                      >
                        <Star className="w-7 h-7 text-amber-300 fill-amber-300" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Hearts row */}
                  <div className="flex justify-center gap-3 mb-8">
                    {[...Array(7)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.2 + i * 0.1 }}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        >
                          <Heart className="w-6 h-6 text-amber-300 fill-amber-300" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                    className="text-amber-200/40 text-sm font-light"
                  >
                    I love you, my girlfriend 🥚💛
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProposalSection;
