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
  RotateCcw,
  Lightbulb
} from 'lucide-react';
import { ChatMessage } from '../../types';
import { askPuneConcierge } from '../../services/aiService';

// Lightweight, crisp markdown parser for chat bubbles
const FormattedMessage: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');

  return (
    <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Headings (e.g. ### Heading)
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="font-extrabold text-slate-900 text-sm sm:text-base mt-3 mb-1 border-b border-orange-100 pb-1 flex items-center gap-1.5">
              <span>{renderInlineFormatting(trimmed.replace('### ', ''))}</span>
            </h4>
          );
        }

        // Subheadings or Section Titles (e.g. ## Title)
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className="font-extrabold text-orange-900 text-sm sm:text-base mt-3 mb-1">
              {renderInlineFormatting(trimmed.replace('## ', ''))}
            </h3>
          );
        }

        // Pro-tip callout box (e.g. 💡 Pro-Tip:)
        if (trimmed.startsWith('💡')) {
          return (
            <div key={idx} className="p-3 my-2 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs flex items-start gap-2 shadow-xs">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>{renderInlineFormatting(trimmed.replace('💡', '').trim())}</div>
            </div>
          );
        }

        // Bullet point (e.g. * or •)
        if (trimmed.startsWith('* ') || trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
          const bulletText = trimmed.replace(/^(\*|•|-)\s+/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 py-0.5">
              <span className="text-orange-500 font-bold shrink-0 mt-0.5">•</span>
              <div className="flex-1">{renderInlineFormatting(bulletText)}</div>
            </div>
          );
        }

        // Standard paragraph
        return (
          <p key={idx} className="text-slate-800">
            {renderInlineFormatting(line)}
          </p>
        );
      })}
    </div>
  );
};

// Helper for inline **bold** and *italic*
function renderInlineFormatting(text: string): React.ReactNode {
  // Regex splitting by **bold** markers
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-slate-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    // Handle *italic* inside standard text
    const italicParts = part.split(/(\*.*?\*)/g);
    return (
      <span key={i}>
        {italicParts.map((subPart, j) => {
          if (subPart.startsWith('*') && subPart.endsWith('*') && !subPart.startsWith('**')) {
            return (
              <em key={j} className="italic text-slate-700">
                {subPart.slice(1, -1)}
              </em>
            );
          }
          return subPart;
        })}
      </span>
    );
  });
}

export const AiConcierge: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Namaskar! 🚩 I am your **Pune AI Concierge** on Explore AI.\n\nI can help you with:\n• **Romantic Date & Western Veg Cuisine:** Sante Spa Cuisine KP, World of Veg rooftop, Le Plaisir, Little Italy, Terttulia.\n• **Authentic Food & Misal:** Bedekar Misal, Cafe Goodluck 1935 Bun Maska, Sujata Mango Mastani, Vaishali SPDP.\n• **Heritage & Forts:** Shaniwar Wada, Aga Khan Palace, Sinhagad trek with woodfire Pithla Bhakri.\n• **Support Local Artisans:** 350-year-old Tambat Ali coppersmiths, Tulshibaug brass, Laxmi Road Paithani sarees.\n• **Pune Customs & Logistics:** The 1 to 4 PM Puneri Siesta, Pune Metro routes, and auto-rickshaw fares.\n\nWhat would you like to explore today?`,
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
  }, [messages, loading]);

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
      const fallbackReply = `Namaskar! Pune has wonderful spots. For dining, check Sante Spa Cuisine in KP or World of Veg in Shivajinagar. For heritage, visit Shaniwar Wada and Tambat Ali coppersmiths!`;
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: fallbackReply,
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
        content: `Namaskar! How may I assist your Pune travel plans? Ask about date spots, food, forts, artisans, or metro directions!`,
        timestamp: 'Just now'
      }
    ]);
  };

  const suggestedQuestions = [
    'Romantic date with Western veg cuisine in Pune 🍷',
    'Where to eat the best authentic Puneri Misal? 🍲',
    'What is the 1 to 4 PM Pune siesta? 😴',
    'How do I visit the 350-year-old copper artisans? 🔨',
    'Sinhagad Fort trek & Pithla Bhakri tips 🏰',
    'Pune Metro routes & timings 🚆',
    'Where to buy authentic Paithani sarees? 🛍️'
  ];

  return (
    <div className="bg-white rounded-3xl border border-orange-100 shadow-xl overflow-hidden flex flex-col h-[700px] max-w-4xl mx-auto">
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
            <p className="text-xs text-orange-100">Live AI Expert for Pune Tourism, Dining & Local MSMEs</p>
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
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-orange-100 border border-orange-200/80 text-[11px] text-slate-800 font-semibold whitespace-nowrap transition-colors shrink-0 shadow-xs"
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
              className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                msg.role === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'bg-gradient-to-tr from-orange-500 to-amber-500 text-white'
              }`}
            >
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] rounded-3xl p-4 sm:p-5 shadow-xs relative group ${
                msg.role === 'user'
                  ? 'bg-slate-900 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200/90 shadow-sm rounded-tl-none'
              }`}
            >
              {msg.role === 'user' ? (
                <p className="text-xs sm:text-sm font-medium leading-relaxed">{msg.content}</p>
              ) : (
                <FormattedMessage content={msg.content} />
              )}

              <div
                className={`flex items-center justify-between text-[10px] pt-2 mt-2 border-t ${
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
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center text-xs shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 flex items-center gap-2.5 shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span className="font-semibold text-slate-700">Pune AI is curating the best recommendations...</span>
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
          placeholder="Ask anything (e.g. 'plan a date with Western veg food', 'best misal', 'copper shops', 'sinhagad fort')..."
          className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-4 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white disabled:opacity-50 transition-colors shadow-sm flex items-center gap-1.5 font-bold text-xs"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Ask</span>
        </button>
      </form>
    </div>
  );
};
