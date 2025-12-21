'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/i18n';
import { MessageSquare, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export function ChatInterface() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: language === 'en' 
        ? "Hi, I'm here to listen and support you. You're not alone. How are you feeling today? 💙"
        : "ሰላም፣ እዚህ ላቆም እና ድጋፊ ነኝ። ብቻ አይደለህም። ዛሬ እንዴት ይሰማህ? 💙",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages.filter(m => m.role === 'user' || m.role === 'assistant').map(m => ({
            role: m.role,
            content: m.content,
          })),
          language,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      const data = await response.json();

      // Add assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: data.timestamp,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Chat error:', err);

      // Add error message
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: language === 'en'
            ? `I'm sorry, I encountered an error: ${errorMessage}. Please try again.`
            : `ይህን አንሞ፣ ስህተት አጋጥሞኛል: ${errorMessage}። እንደገና ሞክር።`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const emergencyNumbers = language === 'en'
    ? [
        { number: '7711', name: 'GBV Hotline', color: 'bg-red-500' },
        { number: '6388', name: 'GBV Hotline', color: 'bg-orange-500' },
        { number: '8044', name: 'GBV Hotline', color: 'bg-pink-500' },
        { number: '991', name: 'Police Emergency', color: 'bg-blue-600' },
      ]
    : [
        { number: '7711', name: 'ጠፊ ስልክ', color: 'bg-red-500' },
        { number: '6388', name: 'ጠፊ ስልክ', color: 'bg-orange-500' },
        { number: '8044', name: 'ጠፊ ስልክ', color: 'bg-pink-500' },
        { number: '991', name: 'ፖሊስ አስቸኳይ', color: 'bg-blue-600' },
      ];

  return (
    <div className="flex flex-col h-screen bg-linear-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {language === 'en' ? 'Support Counselor' : 'ድጋፍ ምክር'}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'en' ? 'Always here to listen' : 'ሁልጊዜ ለመስማት እዚህ ነኝ'}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
            className="gap-2"
          >
            {language === 'en' ? 'አማርኛ' : 'English'}
          </Button>
        </div>
      </div>

      {/* Emergency Banner */}
      {/* <div className="bg-red-50 dark:bg-red-950 border-b border-red-200 dark:border-red-800 p-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-red-700 dark:text-red-200">
                {language === 'en' ? 'In Immediate Danger?' : 'በወቅታዊ አደጋ?'}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {emergencyNumbers.map((item) => (
                  <a
                    key={item.number}
                    href={`tel:${item.number}`}
                    className={`${item.color} text-white px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity`}
                  >
                    <Phone className="w-4 h-4" />
                    {item.number}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-4 pb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card
                className={`max-w-xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-green-500 text-white rounded-3xl rounded-tr-sm shadow-md'
                    : 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-3xl rounded-tl-sm shadow-sm border border-gray-200 dark:border-slate-700'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
                {msg.timestamp && (
                  <p
                    className={`text-xs mt-2 ${
                      msg.role === 'user'
                        ? 'text-green-100'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
              </Card>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <Card className="bg-white dark:bg-slate-800 p-4 rounded-3xl rounded-tl-sm shadow-sm border border-gray-200 dark:border-slate-700">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' } as any} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' } as any} />
                </div>
              </Card>
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 p-4 shadow-lg">
        <form onSubmit={sendMessage} className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-3 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-200">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                language === 'en'
                  ? "Share what's on your mind... (you're safe here)"
                  : "ምን እንደሚያስብ ሙግት... (እዚህ ደህንነት ነው)"
              }
              disabled={isLoading}
              className="rounded-full border-2 border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-400"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 font-semibold flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {isLoading ? (language === 'en' ? 'Thinking...' : 'ሲያስብ...') : (language === 'en' ? 'Send' : 'ላክ')}
            </Button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            {language === 'en'
              ? 'Your conversations are private and confidential'
              : 'ሕቶ ስውር እና በምስጢር ይቀመጣል'}
          </p>
        </form>
      </div>
    </div>
  );
}
