import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, Loader2, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AiChatAPi } from "../../api/apiService/ai/ai.chat";

interface AiMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AiChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: AiMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await AiChatAPi(userMessage.content, messages);

      const reply = res.reply;
      const aiMessage: AiMessage = { role: "assistant", content: reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Bubble Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Open HealthAI Chat"
        >
          <Bot className="w-8 h-8" />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={() => setIsOpen(false)} // close on backdrop click
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg h-[600px] flex flex-col"
            onClick={(e) => e.stopPropagation()} // prevent close on panel click
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6" />
                <div>
                  <h2 className="font-semibold text-lg">HealthAI Assistant</h2>
                  <p className="text-sm text-blue-100">
                    Your personal health helper
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                  <Bot className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                  <h3 className="font-semibold text-lg mb-2">
                    Hello! How can I assist you today?
                  </h3>
                  <p className="text-sm">
                    Ask about symptoms, find nearby doctors, book appointments,
                    or get health advice.
                  </p>
                </div>
              )}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0 shadow-sm animate-pulse">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>

                  <div className="bg-white border border-gray-200 px-5 py-3.5 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-1.5">
                      {[0, 150, 300].map((delay, i) => (
                        <span
                          key={i}
                          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                          style={{ animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask about symptoms, doctors, or appointments..."
                  className="flex-1 px-5 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                HealthAI provides guidance only. Always consult a qualified
                doctor for medical advice.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
