import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Lightbulb,
  Award,
  Languages,
  History,
  MapPin
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIGuide } from "@/components/AIGuide";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const modules = [
  {
    id: "culture",
    title: "Nepali Culture & Traditions",
    description: "Learn about festivals, customs, and daily life in Nepal",
    icon: Lightbulb,
    color: "bg-secondary/10 text-secondary",
    lessons: 8,
    duration: "30 min",
  },
  {
    id: "history",
    title: "Ancient History of Nepal",
    description: "From the Lichchhavi dynasty to the Shah kings",
    icon: History,
    color: "bg-primary/10 text-primary",
    lessons: 6,
    duration: "25 min",
  },
  {
    id: "geography",
    title: "Geography & Regions",
    description: "Explore the diverse landscapes from Terai to Himalayas",
    icon: MapPin,
    color: "bg-success/10 text-success",
    lessons: 5,
    duration: "20 min",
  },
  {
    id: "language",
    title: "Basic Nepali Language",
    description: "Essential phrases and pronunciation guide",
    icon: Languages,
    color: "bg-accent/10 text-accent",
    lessons: 10,
    duration: "40 min",
  },
];

const quizQuestions = [
  {
    question: "What is the capital city of Nepal?",
    options: ["Pokhara", "Kathmandu", "Bhaktapur", "Lalitpur"],
    correct: 1,
    explanation: "Kathmandu is the capital and largest city of Nepal, located in the Kathmandu Valley.",
  },
  {
    question: "Which is the highest peak in Nepal?",
    options: ["Annapurna", "K2", "Machapuchare", "Mount Everest"],
    correct: 3,
    explanation: "Mount Everest (8,848.86m) is the highest peak not only in Nepal but in the world.",
  },
  {
    question: "What does 'Namaste' mean in Nepali?",
    options: ["Goodbye", "Thank you", "Hello/Greetings", "Welcome"],
    correct: 2,
    explanation: "Namaste is a respectful greeting that can be used for both hello and goodbye.",
  },
  {
    question: "Where was Buddha born?",
    options: ["Kathmandu", "Pokhara", "Lumbini", "Janakpur"],
    correct: 2,
    explanation: "Lumbini in southern Nepal is the birthplace of Siddhartha Gautama, who became the Buddha.",
  },
];

export default function Learn() {
  const [activeTab, setActiveTab] = useState<"modules" | "quiz">("modules");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm font-medium">Educational Hub</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Learn About Nepal
            </h1>
            <p className="text-muted-foreground text-lg">
              Dive deep into Nepal's rich culture, history, and traditions through 
              interactive lessons and fun quizzes
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex bg-card rounded-xl p-1 shadow-soft">
              <button
                onClick={() => setActiveTab("modules")}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all",
                  activeTab === "modules" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <BookOpen className="w-4 h-4" />
                Learning Modules
              </button>
              <button
                onClick={() => setActiveTab("quiz")}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all",
                  activeTab === "quiz" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Trophy className="w-4 h-4" />
                Take Quiz
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "modules" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all cursor-pointer"
                  >
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
                      module.color
                    )}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      {module.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {module.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{module.lessons} lessons</span>
                        <span>•</span>
                        <span>{module.duration}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              {!quizComplete ? (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft"
                >
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-muted-foreground">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </span>
                    <span className="text-sm font-medium text-primary">
                      Score: {score}/{quizQuestions.length}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full mb-8">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>

                  {/* Question */}
                  <h2 className="text-xl lg:text-2xl font-display font-bold text-foreground mb-6">
                    {quizQuestions[currentQuestion].question}
                  </h2>

                  {/* Options */}
                  <div className="space-y-3 mb-6">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={showResult}
                        className={cn(
                          "w-full p-4 rounded-xl text-left transition-all flex items-center justify-between",
                          showResult
                            ? index === quizQuestions[currentQuestion].correct
                              ? "bg-success/10 border-2 border-success text-success"
                              : index === selectedAnswer
                                ? "bg-destructive/10 border-2 border-destructive text-destructive"
                                : "bg-muted text-muted-foreground"
                            : selectedAnswer === index
                              ? "bg-primary/10 border-2 border-primary"
                              : "bg-muted hover:bg-muted/80"
                        )}
                      >
                        <span>{option}</span>
                        {showResult && index === quizQuestions[currentQuestion].correct && (
                          <CheckCircle2 className="w-5 h-5" />
                        )}
                        {showResult && index === selectedAnswer && index !== quizQuestions[currentQuestion].correct && (
                          <XCircle className="w-5 h-5" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Explanation */}
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-muted/50 mb-6"
                    >
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Explanation: </span>
                        {quizQuestions[currentQuestion].explanation}
                      </p>
                    </motion.div>
                  )}

                  {/* Next Button */}
                  {showResult && (
                    <Button onClick={nextQuestion} className="w-full" size="lg">
                      {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
                    </Button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card rounded-2xl p-8 lg:p-12 shadow-soft text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-secondary" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                    Quiz Complete!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    You scored <span className="font-bold text-primary">{score}</span> out of{" "}
                    <span className="font-bold">{quizQuestions.length}</span>
                  </p>
                  <div className="text-5xl mb-6">
                    {score === quizQuestions.length ? "🎉" : score >= 2 ? "👏" : "💪"}
                  </div>
                  <p className="text-muted-foreground mb-8">
                    {score === quizQuestions.length 
                      ? "Perfect! You're a Nepal expert!" 
                      : score >= 2 
                        ? "Great job! Keep exploring to learn more." 
                        : "Keep learning! Every journey starts with a single step."}
                  </p>
                  <Button onClick={resetQuiz} size="lg">
                    Try Again
                  </Button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <AIGuide />
    </div>
  );
}
