import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  MapPin, 
  Compass,
  Utensils,
  Languages,
  Camera,
  Mountain
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
    content: "Namaste! 🙏 Welcome to TravelLens AI Guide!\n\nI'm your personal virtual guide to Nepal. I can help you with:\n\n🏔️ **Destination Information** - Details about any place in Nepal\n🍛 **Food Recommendations** - Local cuisine and where to find it\n🗣️ **Language Help** - Nepali phrases and pronunciation\n📸 **Travel Tips** - Best times, what to pack, cultural etiquette\n🌄 **Hidden Gems** - Off-the-beaten-path discoveries\n\nWhat would you like to explore today?",
    timestamp: new Date(),
  },
];

const suggestedTopics = [
  { icon: Compass, label: "Explore destinations", query: "Tell me about the best destinations in Nepal" },
  { icon: Utensils, label: "Local cuisine", query: "What are the must-try foods in Nepal?" },
  { icon: Languages, label: "Learn phrases", query: "Teach me essential Nepali phrases for travelers" },
  { icon: Mountain, label: "Trekking tips", query: "What should I know before trekking in Nepal?" },
];

export default function Guide() {
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

  const getAIResponse = (userMessage: string): string => {
    const lowerInput = userMessage.toLowerCase();
    
    const responses: Record<string, string> = {
      destinations: `Nepal offers incredible diversity! Here are my top recommendations:\n\n🏛️ **Kathmandu Valley** - Ancient temples, living heritage, and vibrant culture\n🏔️ **Pokhara** - Gateway to Annapurna, stunning lakeside views\n🙏 **Lumbini** - Buddha's birthplace, spiritual peace\n🦏 **Chitwan** - Wildlife safari, jungle adventures\n🏘️ **Bhaktapur** - Medieval city frozen in time\n\nWould you like detailed information about any of these places?`,
      
      food: `Nepali cuisine is delicious! Must-try dishes:\n\n🥟 **Momos** - Steamed dumplings with spicy tomato chutney\n🍛 **Dal Bhat** - Lentils, rice, vegetables - the staple meal\n🍜 **Thukpa** - Tibetan noodle soup, perfect for cold days\n🥛 **Juju Dhau** - King of yogurt from Bhaktapur\n🫓 **Sel Roti** - Ring-shaped sweet fried bread\n☕ **Chiya** - Sweet milk tea\n\nPro tip: Always say "Mitho cha!" (It's delicious!) to make locals smile!`,
      
      phrases: `Essential Nepali phrases for your journey:\n\n**Greetings:**\n🙏 Namaste (नमस्ते) - Hello/Goodbye\n❓ Kasto cha? (कस्तो छ?) - How are you?\n😊 Thik cha (ठीक छ) - I'm fine\n\n**Useful:**\n🙏 Dhanyabad (धन्यवाद) - Thank you\n💰 Kati ho? (कति हो?) - How much?\n👋 Hajur (हजुर) - Yes/Respectful address\n🚫 Chaina (छैन) - No/Don't have\n\n**Fun:**\n😋 Mitho cha! (मिठो छ!) - It's delicious!\n❤️ Ramro cha (राम्रो छ) - It's beautiful`,
      
      trekking: `Essential trekking tips for Nepal:\n\n**Preparation:**\n📋 Get TIMS card and required permits\n💊 Pack altitude sickness medication (Diamox)\n👟 Break in your trekking boots beforehand\n🎒 Hire a licensed guide for safety\n\n**On the Trail:**\n🚶 Walk slowly - "Bistari, bistari" (slowly, slowly)\n💧 Stay hydrated and acclimatize properly\n☀️ Start early to avoid afternoon clouds\n🏠 Book tea houses in advance during peak season\n\n**Best Seasons:**\n🍂 Autumn (Oct-Nov) - Clear skies, perfect weather\n🌸 Spring (Mar-May) - Rhododendrons blooming\n\nWould you like route recommendations?`,
      
      default: `That's a great question about Nepal! 🇳🇵\n\nI'd be happy to help you learn more. Here are some things I can tell you about:\n\n• Specific destinations and what to see there\n• Local food and restaurant recommendations\n• Cultural customs and etiquette\n• Trekking routes and preparation\n• Transportation and getting around\n• Best times to visit different regions\n\nWhat aspect would you like to explore?`,
    };

    if (lowerInput.includes("destination") || lowerInput.includes("place") || lowerInput.includes("visit") || lowerInput.includes("best")) {
      return responses.destinations;
    } else if (lowerInput.includes("food") || lowerInput.includes("eat") || lowerInput.includes("cuisine") || lowerInput.includes("restaurant")) {
      return responses.food;
    } else if (lowerInput.includes("phrase") || lowerInput.includes("language") || lowerInput.includes("nepali") || lowerInput.includes("speak") || lowerInput.includes("word")) {
      return responses.phrases;
    } else if (lowerInput.includes("trek") || lowerInput.includes("hike") || lowerInput.includes("mountain") || lowerInput.includes("everest") || lowerInput.includes("annapurna")) {
      return responses.trekking;
    }
    
    return responses.default;
  };

  const handleSend = async (message?: string) => {
    const text = message || input;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(text);
      
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Main Chat Area */}
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full max-w-4xl">
          <div className="flex flex-col h-[calc(100vh-160px)]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-6 space-y-6">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-4",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    message.role === "assistant" 
                      ? "gradient-gold" 
                      : "bg-primary"
                  )}>
                    {message.role === "assistant" ? (
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    ) : (
                      <User className="w-5 h-5 text-primary-foreground" />
                    )}
                  </div>
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-5 py-4",
                    message.role === "assistant" 
                      ? "bg-card shadow-soft rounded-tl-none" 
                      : "bg-primary text-primary-foreground rounded-tr-none"
                  )}>
                    <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="bg-card shadow-soft rounded-2xl rounded-tl-none px-5 py-4">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-muted-foreground"
                          animate={{ y: [0, -6, 0] }}
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

              {/* Suggested Topics (show only at start) */}
              {messages.length <= 2 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4"
                >
                  <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    Suggested topics
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {suggestedTopics.map((topic) => {
                      const Icon = topic.icon;
                      return (
                        <button
                          key={topic.label}
                          onClick={() => handleSend(topic.query)}
                          className="flex items-center gap-3 p-4 rounded-xl bg-card shadow-soft hover:shadow-medium transition-all text-left group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                            <Icon className="w-5 h-5 text-secondary" />
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {topic.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="py-4 border-t border-border bg-background">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask anything about Nepal..."
                  className="flex-1 px-5 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-soft"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  size="icon"
                  className="h-14 w-14 rounded-xl"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">
                AI Guide powered by TravelLens • Ask about destinations, food, culture & more
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
