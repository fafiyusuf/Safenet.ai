import { ChatInterface } from '@/components/chat-interface';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support Counselor - SafeNet.ai',
  description: 'Talk to our AI-powered therapeutic counselor for support and advice',
};

export default function ChatPage() {
  return <ChatInterface />;
}
