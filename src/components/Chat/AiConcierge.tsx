import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  HelpCircle, 
  Check, 
  Copy,
  RotateCcw
} from 'lucide-react';
import { ChatMessage } from '../../types';
import { askPuneConcierge } from '../../services/aiService';

export const AiConcierge: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Namaskar! 🚩 I am your **Pune AI Concierge** on Explore AI.\n\nI can help you with:\n• Finding hidden gems & authentic Puneri eateries (Bedekar Misal, Sujata Mastani)\n• Connecting you with 350-year-old artisan workshops in Tambat Ali & Tulshibaug\n• Explaining local customs like the 1:00 PM – 4:00 PM afternoon break\n• Pune Metro navigation and auto fare guidance\n\nWhat would you like to explore today?`,
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const question = (textToSend || input).trim();
    if (!question || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const reply = await askPuneConcierge(question, messages);
      const assistantMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `Apologies, I encountered a brief network delay. Pune's iconic spots are always open! Try asking about Shaniwar Wada, Misal spots, or Tambat Ali copper artisans.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: `Namaskar! How may I assist your Pune travel plans?`,
        timestamp: 'Just now'
      }
    ]);
  };

  const suggestedQuestions = [
    'What is the 1 to 4 PM Pune siesta?',
    'Where to find authentic Bakarwadi & Shrewsbury biscuits?',
    'How do I visit the 350-year-old copper artisans?',
    'How do I plan a trek to Sinhagad Fort?',
    'Best breakfast places on FC Road & Deccan?'
  ];

  return (
    <div className="bg-white rounded-3xl border border-orange-100 shadow-xl overflow-hidden flex flex-col h-[650px] max-w-4xl mx-auto">
      {/* Concierge Header */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 px-6 py-4 text-white flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl shadow-xs">
            🤖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base leading-tight">Explore AI Pune Concierge</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-xs text-orange-100">Live AI Assistant for Pune Tourism & Local MSMEs</p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          title="Reset conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-4 py-2.5 bg-amber-50/60 border-b border-orange-100 flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-bold text-amber-900 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-orange-600" />
          Suggested:
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-orange-100 border border-orange-200/80 text-[11px] text-slate-700 font-medium whitespace-nowrap transition-colors shrink-0 shadow-xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.role === 'user'
                  ? 'bg-slate-800 text-white'
                  : 'bg-orange-500 text-white shadow-xs'
              }`}
            >
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
                msg.role === 'user'
                  ? 'bg-slate-900 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200/80 shadow-xs rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line">{msg.content}</div>

              <div
                className={`flex items-center justify-between text-[10px] pt-1 border-t ${
                  msg.role === 'user' ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-400'
                }`}
              >
                <span>{msg.timestamp}</span>

                {msg.role === 'assistant' && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-slate-500 hover:text-slate-800"
                    title="Copy message"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 text-xs text-slate-500 flex items-center gap-2 shadow-xs">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce [animation-delay:0.4s]"></div>
              <span className="font-medium text-slate-600">Pune AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 sm:p-4 bg-white border-t border-slate-100 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Pune attractions, food spots, Marathi words, or local artisans..."
          className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
