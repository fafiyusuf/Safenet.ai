# 🚀 Chatbot Integration Guide

## Quick Start

### For Users
1. Navigate to the **Support** link in the header navigation
2. Or visit `/chat` directly
3. Start typing to chat with the AI counselor
4. Toggle language between English and Amharic anytime

### For Developers

#### Backend Setup
The backend is already configured. Ensure:
```bash
# Backend-Express/.env
GEMINI_API_KEY=your_key_here
DATABASE_URL=your_neon_url_here
CORS_ORIGIN=https://your-frontend.vercel.app
```

#### Frontend Setup
The frontend is already configured. Ensure:
```bash
# Frontend/.env.local
NEXT_PUBLIC_API_URL=https://your-api.onrender.com
```

#### Testing Locally
```bash
# Terminal 1: Start Backend
cd Backend-Express
npm install
npm run dev
# Runs on http://localhost:8000

# Terminal 2: Start Frontend
cd Frontend
pnpm install
pnpm dev
# Runs on http://localhost:3000
```

Visit `http://localhost:3000/chat` to test the chatbot.

## Features

### What the Chatbot Does
✅ Listens with empathy  
✅ Validates your feelings  
✅ Provides practical safety advice  
✅ Recommends verified resources  
✅ Offers crisis support hotlines  
✅ Responds in English or Amharic  
✅ Maintains conversation context  

### What the Chatbot Does NOT Do
❌ Provide legal advice (refers to lawyers)  
❌ Provide medical advice (refers to doctors)  
❌ Judge or blame you  
❌ Store your personal data  
❌ Track you in any way  
❌ Share conversations with anyone  

## Architecture

```
User Browser
    ↓ (HTTP POST)
Vercel Frontend (/chat page)
    ↓ (API call)
Render Backend (/api/chat)
    ↓ (Gemini API)
Google Gemini AI (gemini-2.0-flash-exp)
    ↓ (Response)
Browser → Display message
```

## API Reference

### Endpoint
```
POST /api/chat
```

### Request Body
```json
{
  "message": "User's message here",
  "conversationHistory": [
    { "role": "user", "content": "Previous message" },
    { "role": "assistant", "content": "AI response" }
  ],
  "language": "en"  // or "am" for Amharic
}
```

### Response
```json
{
  "success": true,
  "message": "AI counselor response here",
  "conversationHistory": [ /* updated history */ ],
  "language": "en",
  "timestamp": "2025-12-21T10:30:00Z"
}
```

### Error Responses
```json
{
  "error": "Message is required and must be a string"
}

{
  "error": "AI service not configured",
  "message": "The chatbot service is not available. Please try again later."
}
```

## Customization

### Modify System Prompt
Edit `Backend-Express/src/services/chatbot.ts`:
```typescript
const THERAPIST_SYSTEM_PROMPT = {
  en: "Your custom prompt here",
  am: "Your custom Amharic prompt here"
}
```

### Customize UI
Edit `Frontend/components/chat-interface.tsx`:
- Colors: Change `bg-purple-500` to your brand color
- Messages: Update placeholder text
- Emergency numbers: Update hotline buttons
- Font sizes: Adjust Tailwind classes

### Add New Languages
1. Create system prompt in `Backend-Express/src/services/chatbot.ts`
2. Add translations in `Frontend/lib/i18n.ts`
3. Update language type: `type Language = "en" | "am" | "new_lang"`

## Conversation Management

### Token Optimization
- Stores last 10 messages to manage API tokens
- Clears older messages automatically
- Optimized for cost efficiency

### Context Awareness
- AI considers full conversation history
- Provides consistent, contextual responses
- Remembers user's situation within session

### Privacy
- No permanent storage by default
- Conversations cleared on page refresh
- Optional database storage (see database setup below)

## Optional Database Storage

To store chat history (requires database setup):

```sql
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  language VARCHAR(5),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES chat_sessions(id),
  role VARCHAR(20), -- 'user' or 'assistant'
  content TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

Then update the backend to persist conversations.

## Security Considerations

✅ **What's Protected**
- HTTPS/TLS encryption in transit
- Input validation (5000 char limit)
- API rate limiting (implement if needed)
- No sensitive data stored

⚠️ **What to Add**
- Rate limiting per IP
- DDOS protection
- API key rotation
- Monitoring and logging
- User feedback mechanism

## Troubleshooting

### Chatbot not responding
1. Check `GEMINI_API_KEY` is set correctly
2. Verify backend is running: `curl http://localhost:8000/api/chat/health`
3. Check browser console for errors
4. Verify `NEXT_PUBLIC_API_URL` points to correct backend

### Slow responses
1. Check Gemini API status
2. Review conversation history (limit is 10 messages)
3. Check network connection
4. Review backend logs

### Language not switching
1. Reload the page
2. Check browser cache
3. Verify localStorage is enabled
4. Check browser console for errors

## Monitoring

### Health Check
```bash
curl http://localhost:8000/api/chat/health
# Response: { "status": "Chat service operational" }
```

### Logs
- Backend: Check console output in terminal
- Frontend: Check browser DevTools (F12)
- Render Dashboard: View deployment logs

## Future Enhancements

🔄 **Planned Features**
- [ ] Conversation history UI
- [ ] Export chat as PDF
- [ ] Sentiment analysis for crisis detection
- [ ] SMS support for offline users
- [ ] Conversation feedback system
- [ ] Additional languages (Oromo, Tigrinya)
- [ ] Voice chat support
- [ ] Integration with professional counselors

## Support

For issues or questions:
1. Check this guide
2. Review error messages in console
3. Check browser DevTools network tab
4. Review backend logs in Render dashboard
5. Open issue on GitHub

## Resources

- **Gemini API Docs**: https://ai.google.dev/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Express Docs**: https://expressjs.com
- **Tailwind CSS**: https://tailwindcss.com

---

**Last Updated:** December 21, 2025  
**Status:** Production Ready ✅
