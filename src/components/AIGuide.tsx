import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, MapPin, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Namaste! 🙏 I'm your AI local guide for Nepal. I can help you discover hidden gems, share cultural insights, recommend local foods, and teach you useful Nepali phrases. What would you like to explore today?",
    timestamp: new Date(),
  },
];

const quickQuestions = [
  "What's the best time to visit Nepal?",
  "Tell me about Nepali cuisine",
  "Teach me some Nepali phrases",
  "What are hidden gems in Kathmandu?",
];

export function AIGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response (in production, this would call the AI API)
    setTimeout(() => {
      const responses: Record<string, string> = {
        "best time": "The best time to visit Nepal is during autumn (October-November) and spring (March-May). Autumn offers clear skies, perfect for trekking and mountain views, while spring brings beautiful rhododendron blooms. Winter (December-February) is cold but less crowded, and monsoon (June-September) brings lush greenery but challenging trekking conditions.",
        "cuisine": "Nepali cuisine is a delightful blend of flavors! Must-try dishes include:\n\n🥟 **Momos** - Steamed dumplings with spicy chutney\n🍛 **Dal Bhat** - The staple meal of lentils and rice\n🍜 **Thukpa** - Tibetan-style noodle soup\n🥛 **Juju Dhau** - King of yogurt from Bhaktapur\n🍵 **Chiya** - Sweet milk tea\n\nDon't miss trying local street food like sel roti (rice donuts) and chatpate (spicy snack mix)!",
        "phrases": "Here are some essential Nepali phrases for your journey:\n\n🙏 **Namaste** (नमस्ते) - Hello/Goodbye\n❓ **Kasto cha?** (कस्तो छ?) - How are you?\n✨ **Ramro cha** (राम्रो छ) - It's good/beautiful\n🙏 **Dhanyabad** (धन्यवाद) - Thank you\n💰 **Kati ho?** (कति हो?) - How much?\n😊 **Mitho cha** (मिठो छ) - It's delicious\n👋 **Pheri bhetaula** (फेरी भेटौला) - See you again",
        "hidden": "Beyond the popular spots, here are some hidden gems in Kathmandu:\n\n🏛️ **Seto Gumba** - A peaceful white monastery\n🌿 **Nagarjun Forest** - Hiking trails with valley views\n🎭 **Patan's Hidden Courtyards** - Ancient bahal monasteries\n☕ **Garden of Dreams** - A restored neo-classical garden\n🌅 **Kirtipur** - An ancient Newari town with sunset views\n\nWould you like more details about any of these?",
        default: "That's a great question! Nepal is full of amazing experiences. I can tell you about trekking routes, cultural festivals, local traditions, hidden temples, or the best local foods. What interests you most?",
      };

      let response = responses.default;
      const lowerInput = userMessage.content.toLowerCase();
      
      if (lowerInput.includes("time") || lowerInput.includes("visit") || lowerInput.includes("when")) {
        response = responses["best time"];
      } else if (lowerInput.includes("food") || lowerInput.includes("cuisine") || lowerInput.includes("eat")) {
        response = responses.cuisine;
      } else if (lowerInput.includes("phrase") || lowerInput.includes("language") || lowerInput.includes("nepali") || lowerInput.includes("speak")) {
        response = responses.phrases;
      } else if (lowerInput.includes("hidden") || lowerInput.includes("gem") || lowerInput.includes("secret") || lowerInput.includes("kathmandu")) {
        response = responses.hidden;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full gradient-gold shadow-glow flex items-center justify-center"
          >
            <Bot className="w-7 h-7 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "600px"
            }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className={cn(
              "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-card rounded-2xl shadow-medium overflow-hidden border border-border flex flex-col",
              isMinimized && "h-auto"
            )}
          >
            {/* Header */}
            <div className="p-4 gradient-hero flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center">
                  <Bot className="w-5 h-5 text-card" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-card">Nepal AI Guide</h3>
                  <div className="flex items-center gap-1 text-xs text-card/70">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span>Online - Ready to help</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-lg hover:bg-card/10 text-card transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-card/10 text-card transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex gap-3",
                        message.role === "user" && "flex-row-reverse"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                        message.role === "assistant" 
                          ? "bg-secondary/20 text-secondary" 
                          : "bg-primary/20 text-primary"
                      )}>
                        {message.role === "assistant" ? (
                          <Bot className="w-4 h-4" />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                      </div>
                      <div className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-3",
                        message.role === "assistant" 
                          ? "bg-muted text-foreground rounded-tl-none" 
                          : "bg-primary text-primary-foreground rounded-tr-none"
                      )}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 rounded-full bg-muted-foreground"
                              animate={{ y: [0, -5, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.15,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length <= 2 && (
                  <div className="px-4 pb-2">
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Quick questions
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickQuestions.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleQuickQuestion(q)}
                          className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Ask about Nepal..."
                      className="flex-1 px-4 py-3 rounded-xl bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!input.trim() || isTyping}
                      size="icon"
                      className="h-12 w-12 rounded-xl"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
