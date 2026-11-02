import React, { useState } from 'react';
import { 
  BookOpen, 
  Volume2, 
  ShieldAlert, 
  Train, 
  Clock, 
  PhoneCall, 
  HeartHandshake, 
  AlertTriangle,
  Check
} from 'lucide-react';
import { MARATHI_PHRASES, PUNE_ESSENTIAL_TIPS, MarathiPhrase } from '../../data/marathiPhrases';

export const PuneSurvivalGuide: React.FC = () => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handleSpeak = (phrase: MarathiPhrase, index: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase.marathi);
      utterance.lang = 'mr-IN'; // Marathi Indian voice
      utterance.rate = 0.85;

      utterance.onstart = () => setPlayingIndex(index);
      utterance.onend = () => setPlayingIndex(null);
      utterance.onerror = () => setPlayingIndex(null);

      window.speechSynthesis.speak(utterance);
    }
  };

  const emergencyContacts = [
    { title: 'Pune Police Emergency', number: '112 / 100', desc: 'Central emergency response' },
    { title: 'Tourist Police Help Desk', number: '+91 20 2612 2880', desc: 'Assistance for domestic & foreign visitors' },
    { title: 'Pune Metro 24/7 Helpline', number: '1800 270 5501', desc: 'Train schedules, smart card & lost items' },
    { title: 'Auto-Rickshaw Grievance Cell', number: '+91 20 2605 8080', desc: 'RTO complaint for excess fare or refusal' }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
            Traveler Handbook
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Pune Traveler Survival & Etiquette Guide
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 leading-relaxed">
            Everything you need to know about navigating the Oxford of the East like a respectful, savvy insider.
          </p>
        </div>
      </div>

      {/* Pune Culture & Norms Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PUNE_ESSENTIAL_TIPS.map((tip, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-white border border-orange-100/90 shadow-sm space-y-2"
          >
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                {idx + 1}
              </span>
              <h3 className="text-sm font-bold text-slate-900">{tip.title}</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-10">
              {tip.tip}
            </p>
          </div>
        ))}
      </div>

      {/* Marathi Phrases for Tourists with Audio */}
      <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span>Essential Marathi Phrases for Tourists</span>
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                Audio Enabled
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Speaking even a few Marathi words warms local hearts in shops and auto-rickshaws!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {MARATHI_PHRASES.map((phrase, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-orange-300 transition-all flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-900">{phrase.english}</div>
                <div className="text-sm font-extrabold text-orange-600 font-serif">
                  {phrase.marathi}
                </div>
                <div className="text-xs font-mono text-slate-600 bg-white px-2 py-0.5 rounded-md inline-block border border-slate-200">
                  {phrase.phonetic}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">{phrase.context}</p>
              </div>

              <button
                onClick={() => handleSpeak(phrase, idx)}
                className={`p-2.5 rounded-xl transition-all shrink-0 ${
                  playingIndex === idx
                    ? 'bg-orange-600 text-white animate-pulse'
                    : 'bg-white hover:bg-orange-50 text-slate-600 hover:text-orange-600 border border-slate-200 shadow-xs'
                }`}
                title="Hear Marathi pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency & Tourist Assistance Helplines */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-rose-400">
          <ShieldAlert className="w-5 h-5" />
          <h3 className="text-base font-bold text-white">Emergency & Tourist Helpline Contacts</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {emergencyContacts.map((c, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
              <div className="text-xs font-bold text-slate-300">{c.title}</div>
              <div className="text-sm font-extrabold text-orange-400 font-mono">{c.number}</div>
              <p className="text-[10px] text-slate-400 leading-tight">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
