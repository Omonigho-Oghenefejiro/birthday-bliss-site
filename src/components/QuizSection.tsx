import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, CheckCircle, XCircle, Star, ChevronRight } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  answer: number;
  category: "Friends" | "Jujutsu Kaisen";
}

const allQuestions: Question[] = [
  // FRIENDS — 10 extremely difficult questions
  {
    category: "Friends",
    question: "What is the name of Chandler's father's burlesque show in Las Vegas?",
    options: ["Viva Las Gaygas", "It's Raining Men", "The Chandler Show", "All The Gay Things"],
    answer: 0,
  },
  {
    category: "Friends",
    question: "What was the name of Joey's imaginary childhood friend?",
    options: ["Tony", "Maurice", "Vinnie", "Stevie"],
    answer: 1,
  },
  {
    category: "Friends",
    question: "What is Monica's biggest pet peeve?",
    options: ["People who chew loudly", "Animals dressed as humans", "Unmade beds", "Slow walkers"],
    answer: 1,
  },
  {
    category: "Friends",
    question: "What seat number was Chandler assigned on the plane to Yemen?",
    options: ["32C", "15A", "9B", "25J"],
    answer: 3,
  },
  {
    category: "Friends",
    question: "What was the occupation of Rachel's sorority sister Melissa Warburton?",
    options: ["Publicist", "Buyer at Ralph Lauren", "Event Planner", "Fashion Editor"],
    answer: 0,
  },
  {
    category: "Friends",
    question: "How many categories does Monica have for her towels?",
    options: ["9", "11", "7", "14"],
    answer: 1,
  },
  {
    category: "Friends",
    question: "What is the name of Phoebe's scientist husband David's research grant location?",
    options: ["Moscow", "Minsk", "Prague", "Kiev"],
    answer: 1,
  },
  {
    category: "Friends",
    question: "In 'The One with the Embryos,' what name does Chandler's TV Guide come addressed to?",
    options: ["Chanandler Bong", "Miss Chanandler Bong", "Mr. Chandler Bing", "Chan Bing"],
    answer: 1,
  },
  {
    category: "Friends",
    question: "What is Joey's PIN number that he accidentally tells everyone?",
    options: ["5639", "7243", "5296", "1834"],
    answer: 2,
  },
  {
    category: "Friends",
    question: "What was the name of Ross's pet monkey Marcel's favorite song?",
    options: ["The Lion Sleeps Tonight", "In the Jungle", "The Safety Dance", "(I Can't Get No) Satisfaction"],
    answer: 0,
  },
  // JUJUTSU KAISEN — 10 extremely difficult questions
  {
    category: "Jujutsu Kaisen",
    question: "What binding vow did Gojo Satoru's ancestor make that led to the Six Eyes and Limitless always appearing together?",
    options: [
      "The Star Plasma Vessel pact",
      "No binding vow — it's a natural phenomenon",
      "The pact between the Gojo and Zenin clans",
      "The Tengen barrier agreement",
    ],
    answer: 1,
  },
  {
    category: "Jujutsu Kaisen",
    question: "What is the maximum effective range of Sukuna's Malevolent Shrine?",
    options: ["100 meters", "140 meters", "200 meters", "Unlimited within domain"],
    answer: 2,
  },
  {
    category: "Jujutsu Kaisen",
    question: "What is the name of Toji Fushiguro's cursed spirit that stores his weapons?",
    options: ["Inventory Curse", "The Worm Spirit", "Demon Dog", "Arsenal Curse"],
    answer: 0,
  },
  {
    category: "Jujutsu Kaisen",
    question: "How many fingers had Yuji consumed by the time of the Shibuya Incident arc's start?",
    options: ["12", "15", "10", "18"],
    answer: 1,
  },
  {
    category: "Jujutsu Kaisen",
    question: "What is Megumi Fushiguro's incomplete domain expansion called?",
    options: ["Shadow Garden", "Chimera Shadow Garden", "Incomplete Shadow Domain", "Ten Shadow Realm"],
    answer: 1,
  },
  {
    category: "Jujutsu Kaisen",
    question: "What type of cursed energy trait does Yuta Okkotsu possess that makes him special?",
    options: [
      "Infinite cursed energy output",
      "Cursed energy mimicry — he can copy techniques",
      "Reverse cursed technique from birth",
      "Boundless cursed energy reserves from Rika",
    ],
    answer: 1,
  },
  {
    category: "Jujutsu Kaisen",
    question: "What was the original purpose of the Prison Realm before it was used to seal Gojo?",
    options: [
      "Sealing cursed spirits",
      "A Buddhist artifact to attain enlightenment",
      "Trapping the living body of the Buddhist monk Genshin",
      "A barrier tool for Tengen",
    ],
    answer: 2,
  },
  {
    category: "Jujutsu Kaisen",
    question: "What condition must be met for Hakari Kinji's domain expansion Idle Death Gamble to grant him unlimited cursed energy?",
    options: [
      "He must land a jackpot",
      "His opponent must attack first",
      "He must reach 100 hits",
      "His cursed energy must hit zero",
    ],
    answer: 0,
  },
  {
    category: "Jujutsu Kaisen",
    question: "What is the name of Kenjaku's original body before possessing others?",
    options: [
      "It was never revealed",
      "Noritoshi Kamo",
      "Suguru Geto",
      "An unnamed ancient sorcerer",
    ],
    answer: 0,
  },
  {
    category: "Jujutsu Kaisen",
    question: "What is the guaranteed hit mechanism of Gojo's Unlimited Void?",
    options: [
      "Infinite information floods the target's mind",
      "Spatial distortion traps the target",
      "Cursed energy binds the nervous system",
      "Reversal of perception disables movement",
    ],
    answer: 0,
  },
];

const leaderboard = [
  { name: "Eggroll 🥚", score: 18 },
];

const QuizSection = () => {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const questions = useMemo(() => {
    return [...allQuestions].sort(() => Math.random() - 0.5);
  }, []);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === questions[currentQ].answer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const fullLeaderboard = [...leaderboard, { name: "Zaniella 💕", score }]
    .sort((a, b) => b.score - a.score);

  const q = questions[currentQ];

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-black relative overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl opacity-5"
      />

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
            The Ultimate Quiz
          </h2>
          <p className="font-light text-amber-200/60 text-lg">
            Friends × Jujutsu Kaisen — 20 questions, no mercy 😈
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!started && !finished && (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <div className="bg-gray-950/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-300/30 mb-8">
                <p className="font-light text-white/80 text-lg mb-6">
                  Think you know your stuff? 10 brutal Friends questions + 10 brutal Jujutsu Kaisen questions. Let's see if you can beat Eggroll's score of <span className="text-amber-300 font-medium">18/20</span> 👀
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStarted(true)}
                  className="px-8 py-4 bg-gradient-to-r from-amber-300 to-amber-400 text-black font-medium rounded-xl text-lg shadow-lg shadow-amber-300/30 hover:shadow-amber-300/50 transition-shadow"
                >
                  Start Quiz ✨
                </motion.button>
              </div>
            </motion.div>
          )}

          {started && !finished && (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-gray-950/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-300/30">
                {/* Progress */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-amber-300/70 text-sm font-light">
                    Question {currentQ + 1} of {questions.length}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full border font-light ${
                    q.category === "Friends"
                      ? "border-purple-400/50 text-purple-300 bg-purple-400/10"
                      : "border-red-400/50 text-red-300 bg-red-400/10"
                  }`}>
                    {q.category}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1 bg-gray-800 rounded-full mb-8">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-300 to-amber-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <h3
                  className="font-light text-xl md:text-2xl text-white mb-8 leading-relaxed"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {q.question}
                </h3>

                <div className="space-y-3 mb-8">
                  {q.options.map((opt, idx) => {
                    let borderColor = "border-amber-300/20 hover:border-amber-300/50";
                    let bg = "bg-transparent";
                    if (answered) {
                      if (idx === q.answer) {
                        borderColor = "border-green-400";
                        bg = "bg-green-400/10";
                      } else if (idx === selected && idx !== q.answer) {
                        borderColor = "border-red-400";
                        bg = "bg-red-400/10";
                      } else {
                        borderColor = "border-gray-700";
                      }
                    } else if (idx === selected) {
                      borderColor = "border-amber-300";
                    }

                    return (
                      <motion.button
                        key={idx}
                        whileHover={!answered ? { scale: 1.01 } : {}}
                        whileTap={!answered ? { scale: 0.99 } : {}}
                        onClick={() => handleSelect(idx)}
                        className={`w-full text-left p-4 rounded-xl border ${borderColor} ${bg} transition-all duration-200 flex items-center gap-3`}
                      >
                        <span className="w-8 h-8 rounded-full border border-amber-300/30 flex items-center justify-center text-amber-300/70 text-sm font-light shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="font-light text-white/80 text-sm md:text-base">{opt}</span>
                        {answered && idx === q.answer && (
                          <CheckCircle className="w-5 h-5 text-green-400 ml-auto shrink-0" />
                        )}
                        {answered && idx === selected && idx !== q.answer && (
                          <XCircle className="w-5 h-5 text-red-400 ml-auto shrink-0" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {answered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end"
                  >
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-3 bg-amber-300 text-black font-medium rounded-xl hover:bg-amber-400 transition-colors"
                    >
                      {currentQ < questions.length - 1 ? "Next" : "See Results"}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Score tracker */}
              <div className="mt-4 text-center">
                <span className="font-light text-amber-200/50 text-sm">
                  Score: {score}/{currentQ + (answered ? 1 : 0)}
                </span>
              </div>
            </motion.div>
          )}

          {finished && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gray-950/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-amber-300/30 text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Trophy className="w-16 h-16 text-amber-300 mx-auto mb-6" />
                </motion.div>

                <h3
                  className="font-light text-4xl md:text-5xl text-amber-300 mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {score >= 18 ? "Incredible! 🔥" : score >= 14 ? "Amazing! ✨" : score >= 10 ? "Not Bad! 💪" : "Better Luck Next Time 💕"}
                </h3>

                <p className="font-light text-6xl text-white mb-2">{score}<span className="text-2xl text-amber-200/60">/{questions.length}</span></p>
                <p className="font-light text-amber-200/60 mb-10">
                  {score >= 18 ? "You might actually be smarter than me 😳" : score >= 14 ? "So close to beating me!" : "I still hold the crown 👑"}
                </p>

                {/* Leaderboard */}
                <div className="bg-gray-900/50 rounded-xl p-6 border border-amber-300/20">
                  <h4 className="font-light text-lg text-amber-300 mb-4 flex items-center justify-center gap-2">
                    <Star className="w-5 h-5" /> Leaderboard
                  </h4>
                  <div className="space-y-3">
                    {fullLeaderboard.map((entry, i) => (
                      <motion.div
                        key={entry.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          i === 0 ? "bg-amber-300/10 border border-amber-300/30" : "bg-gray-800/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-amber-300 font-medium text-lg w-6">
                            {i === 0 ? "🥇" : "🥈"}
                          </span>
                          <span className="font-light text-white/90">{entry.name}</span>
                        </div>
                        <span className="font-light text-amber-300 text-lg">{entry.score}/20</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setStarted(false);
                    setFinished(false);
                    setCurrentQ(0);
                    setScore(0);
                    setSelected(null);
                    setAnswered(false);
                  }}
                  className="mt-8 px-8 py-3 border border-amber-300/50 text-amber-300 font-light rounded-xl hover:bg-amber-300/10 transition-colors"
                >
                  Try Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default QuizSection;
