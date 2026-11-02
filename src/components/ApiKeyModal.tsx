import React, { useState } from 'react';
import { Key, CheckCircle2, AlertCircle, RefreshCw, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { getApiKey, saveApiKey, resetApiKey } from '../services/aiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState(getApiKey());
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey.trim()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-5.4-nano',
          messages: [{ role: 'user', content: 'Say OK' }],
          max_tokens: 5
        })
      });

      if (res.ok) {
        setTestResult({
          success: true,
          message: 'Connected successfully to Pollinations AI (gpt-5.4-nano)!'
        });
      } else {
        setTestResult({
          success: false,
          message: `API returned status ${res.status}. Falling back to high-precision local synthesizer.`
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: 'Network error or offline. Offline local synthesizer will handle all itinerary requests.'
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    saveApiKey(apiKey);
    onClose();
  };

  const handleResetToDefault = () => {
    resetApiKey();
    setApiKey(getApiKey());
    setTestResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-orange-100 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Pollinations AI Configuration
              </h3>
              <p className="text-xs text-slate-500">Live API Key for Explore AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold p-1 text-sm"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Secret API Key</span>
            <button
              onClick={() => setShowKey(!showKey)}
              className="text-orange-600 hover:text-orange-700 flex items-center gap-1 font-semibold"
            >
              {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showKey ? 'Hide' : 'Show'}</span>
            </button>
          </div>

          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Model: <strong className="text-slate-700">openai/gpt-5.4-nano</strong></span>
            <button
              onClick={handleResetToDefault}
              className="text-orange-600 hover:underline"
            >
              Reset to Original Key
            </button>
          </div>
        </div>

        {/* Test Result Message */}
        {testResult && (
          <div
            className={`p-3 rounded-2xl text-xs flex items-start gap-2 ${
              testResult.success
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-amber-50 border border-amber-200 text-amber-800'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            )}
            <span className="leading-snug">{testResult.message}</span>
          </div>
        )}

        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={handleTestConnection}
            disabled={testing}
            className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            {testing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-500" />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            )}
            <span>{testing ? 'Testing connection...' : 'Test Connection'}</span>
          </button>

          <button
            onClick={handleSave}
            className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-sm"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
