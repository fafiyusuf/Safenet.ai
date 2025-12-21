import { Request, Response, Router } from 'express';
import { chatWithTherapist } from '../services/chatbot.js';

const router = Router();

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  message: string;
  conversationHistory: ChatMessage[];
  language?: 'en' | 'am';
}

// POST /api/chat - Send a message to the therapist chatbot
router.post('/', async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory = [], language = 'en' } = req.body as ChatRequest;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a string' });
    }

    if (message.trim().length === 0) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message is too long (max 5000 characters)' });
    }

    // Validate conversation history
    if (!Array.isArray(conversationHistory)) {
      return res.status(400).json({ error: 'conversationHistory must be an array' });
    }

    // Limit conversation history to last 10 messages to manage tokens
    const limitedHistory = conversationHistory.slice(-10);

    // Validate language
    if (!['en', 'am'].includes(language)) {
      return res.status(400).json({ error: 'Language must be "en" or "am"' });
    }

    // Call therapist chatbot
    const response = await chatWithTherapist(message, limitedHistory, language);

    // Add new messages to history
    const updatedHistory: ChatMessage[] = [
      ...limitedHistory,
      { role: 'user', content: message },
      { role: 'assistant', content: response.message },
    ];

    res.json({
      success: true,
      message: response.message,
      conversationHistory: updatedHistory,
      language: response.language,
      timestamp: response.timestamp,
    });
  } catch (error) {
    console.error('Chat endpoint error:', error);

    if (error instanceof Error) {
      if (error.message.includes('GEMINI_API_KEY')) {
        return res.status(500).json({
          error: 'AI service not configured',
          message: 'The chatbot service is not available. Please try again later.',
        });
      }
      return res.status(500).json({
        error: 'Chat service error',
        message: error.message,
      });
    }

    res.status(500).json({
      error: 'Chat service error',
      message: 'An unexpected error occurred',
    });
  }
});

// GET /api/chat/health - Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'Chat service operational' });
});

export default router;
