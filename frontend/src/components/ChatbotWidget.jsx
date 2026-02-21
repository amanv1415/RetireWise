import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMessageCircle, FiSend, FiUser, FiX } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';

const QUICK_QUESTIONS = [
  'How do I save a forecast?',
  'How do I see dashboard data?',
  'How do I create account?',
  'Where is My Account?',
];

const getBotResponse = (input) => {
  const message = input.toLowerCase();

  if (message.includes('save') && message.includes('forecast')) {
    return 'Go to Calculator → enter values → click Calculate → click Save Forecast. Then open Dashboard to view it.';
  }

  if (message.includes('dashboard') || message.includes('forecast')) {
    return 'Login first, then open Dashboard. If no data is shown, create and save a forecast from Calculator.';
  }

  if (message.includes('register') || message.includes('create account') || message.includes('sign up')) {
    return 'Open Register from the top-right menu, fill in your details, and submit. You can login right after registration.';
  }

  if (message.includes('login') || message.includes('log in')) {
    return 'Use the Login page with your registered email and password. After login, Dashboard and My Account become available.';
  }

  if (message.includes('account') || message.includes('profile')) {
    return 'Click the profile icon in the top-right corner and choose My Account to view your account details.';
  }

  if (message.includes('calculator')) {
    return 'Calculator helps estimate retirement corpus and pension. Enter your age, contribution, and return assumptions, then click Calculate.';
  }

  if (message.includes('estimator')) {
    return 'Estimator tells you required monthly contribution for your target pension amount.';
  }

  if (message.includes('comparison') || message.includes('scenario')) {
    return 'Comparison shows conservative/moderate/aggressive scenarios so you can compare retirement outcomes side-by-side.';
  }

  return 'I can help you with login, registration, calculator, saving forecasts, dashboard, and account navigation. Ask me anything about using RetireWise.';
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hi! I am your RetireWise assistant. Ask me how to use this app.',
    },
  ]);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isOpen]);

  const handleSend = (rawText) => {
    const text = (rawText ?? input).trim();
    if (!text) {
      return;
    }

    const userMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
    };

    const botMessage = {
      id: `b-${Date.now() + 1}`,
      sender: 'bot',
      text: getBotResponse(text),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {isOpen && (
        <div
          className="w-[340px] max-w-[88vw] h-[470px] bg-[#EEEFE0] border-2 border-[#1E2A27] rounded-2xl shadow-2xl mb-3 flex flex-col overflow-hidden overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="bg-[#1E2A27] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HiOutlineSparkles size={18} />
              <span className="font-semibold text-white">RetireWise Assistant</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-[#16211f]"
              aria-label="Close chatbot"
            >
              <FiX className="text-white" />
            </button>
          </div>

          <div className="px-3 py-2 border-b border-[#D1D8BE] bg-[#EEEFE0]">
            <div className="flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => handleSend(question)}
                  className="text-xs px-2 py-1 rounded-full bg-[#D1D8BE] text-[#1E2A27] hover:bg-[#A7C1A8]"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#EEEFE0] overscroll-contain"
            onWheel={(e) => e.stopPropagation()}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    message.sender === 'user'
                      ? 'bg-[#1E2A27] text-white'
                      : 'bg-[#D1D8BE] text-[#1E2A27]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === 'user' ? (
                      <FiUser size={13} className="text-white" />
                    ) : (
                      <HiOutlineSparkles size={13} className="text-[#1E2A27]" />
                    )}
                    <span className={`text-[11px] font-semibold ${message.sender === 'user' ? 'text-white' : 'text-[#1E2A27]'}`}>
                      {message.sender === 'user' ? 'You' : 'Assistant'}
                    </span>
                  </div>
                  <p className={message.sender === 'user' ? 'text-white' : 'text-[#1E2A27]'}>{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-[#D1D8BE] bg-[#EEEFE0]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask how to use RetireWise..."
                className="flex-1 input-field bg-white border-[#A7C1A8] text-[#1E2A27]"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!canSend}
                className="p-2 rounded-lg bg-[#1E2A27] text-white disabled:opacity-50"
                aria-label="Send message"
              >
                <FiSend size={16} className="text-white" />
              </button>
            </div>
            <div className="mt-2 text-[11px] text-[#1E2A27]">
              Need help with your profile? Open <Link to="/account" className="underline text-[#1E2A27]">My Account</Link>.
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-14 w-14 rounded-full bg-[#1E2A27] text-white shadow-2xl flex items-center justify-center hover:bg-[#16211f] transition"
        aria-label="Open AI assistant"
      >
        <FiMessageCircle size={22} className="text-white" />
      </button>
    </div>
  );
};

export default ChatbotWidget;
