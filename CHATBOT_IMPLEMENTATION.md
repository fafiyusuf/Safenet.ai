# 🤖 Chatbot Feature Implementation

## Overview
Added a **therapeutic chatbot counselor** to SafeNet.ai that provides empathetic, supportive guidance to TFGBV survivors using Google Gemini AI.

## Features Implemented

### Backend
- **`Backend-Express/src/services/chatbot.ts`**
  - `chatWithTherapist()` - Main function for getting AI responses
  - `chatWithTherapistStream()` - Streaming responses (future use)
  - Dual-language support (English/Amharic)
  - Therapist system prompts with:
    - Emotional validation
    - Safety advice
    - Resource recommendations
    - Emergency hotline guidance
    - Crisis support protocols

- **`Backend-Express/src/routes/chat.ts`**
  - `POST /api/chat` - Send message to counselor
    - Input validation
    - Conversation history management (last 10 messages)
    - Token optimization
    - Error handling with helpful messages
  - `GET /api/chat/health` - Health check endpoint

### Frontend
- **`Frontend/components/chat-interface.tsx`**
  - Full-featured chat UI component with:
    - Message history with timestamps
    - Typing indicators
    - Smooth scrolling
    - Bilingual support (English/Amharic)
    - Emergency hotline buttons (7711, 6388, 8044, 991)
    - Error handling and display
    - Loading states
    - Responsive design
  - Beautiful gradient background
  - Dark mode support
  - Real-time message updates

- **`Frontend/app/chat/page.tsx`**
  - New `/chat` route for the counselor interface
  - Metadata for SEO

### Navigation
- **`Frontend/components/header.tsx`**
  - Added "Support" link to navigation (both desktop and mobile)
  - MessageSquare icon for chat feature
  - Links to `/chat` route

### Translations
- **`Frontend/lib/i18n.ts`**
  - English translations:
    - `chat.title`: "Support Counselor"
    - `chat.placeholder`: "Share what's on your mind... (you're safe here)"
    - And 8 more language strings
  - Amharic translations:
    - `chat.title`: "ድጋፍ ምክር"
    - Full bilingual support
    - Culturally appropriate messaging

## Technical Details

### API Endpoint
```
POST /api/chat
Content-Type: application/json

{
  "message": "I'm scared and don't know what to do",
  "conversationHistory": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ],
  "language": "en"
}

Response:
{
  "success": true,
  "message": "I understand your fear...",
  "conversationHistory": [...],
  "language": "en",
  "timestamp": "2025-12-21T..."
}
```

### System Prompts
The chatbot uses specialized system prompts for:
- **Emotional Support**: Validating feelings, showing empathy
- **Safety Advice**: Concrete steps to stay safe
- **Empowerment**: Recognizing survivor strength
- **Resources**: Referrals to verified organizations
- **Crisis Response**: Hotline numbers for emergencies

### Conversation Management
- Maintains conversation history (limited to last 10 messages)
- Uses conversation context for better responses
- Validates input length (max 5000 characters)
- Implements token optimization for API cost management

### Emergency Integration
Built-in emergency buttons for:
- **7711** - GBV Hotline
- **6388** - GBV Hotline
- **8044** - GBV Hotline
- **991** - Police Emergency

One-click calling with `tel:` links for mobile users.

## User Experience

### Desktop
- Full-width chat interface
- Message bubbles with timestamps
- Typing indicators during AI response
- Smooth auto-scrolling
- Language toggle button
- Emergency hotline banner
- Dark mode support

### Mobile
- Optimized for smaller screens
- Responsive message layout
- Touch-friendly buttons
- Full-screen chat experience
- Safe exit integration

## Bilingual Support
- **English**: Full professional language with therapeutic language
- **Amharic**: Complete translations with cultural sensitivity
- Language toggle in header
- Real-time language switching
- Conversations respect user language preference

## Safety Features
- No user accounts required
- No data storage (stateless API)
- Confidential conversations
- Immediate help for crisis situations
- Clear escalation to professional help
- Privacy-first design

## Next Steps (Optional)
1. Add conversation history to database (PostgreSQL)
2. Implement chat history persistence
3. Add sentiment analysis for crisis detection
4. Integrate with SMS for offline support
5. Add support for additional languages (Oromo, Tigrinya)
6. Implement conversation logging for research (opt-in)

## Files Modified/Created
- ✅ Created: `Backend-Express/src/services/chatbot.ts`
- ✅ Created: `Backend-Express/src/routes/chat.ts`
- ✅ Updated: `Backend-Express/src/server.ts` (added chat route)
- ✅ Created: `Frontend/components/chat-interface.tsx`
- ✅ Created: `Frontend/app/chat/page.tsx`
- ✅ Updated: `Frontend/components/header.tsx` (added chat navigation)
- ✅ Updated: `Frontend/lib/i18n.ts` (added chat translations)

## Testing
The chatbot is ready for testing:
1. Visit `/chat` route
2. Type a message about your situation
3. Receive empathetic AI response
4. Continue conversation
5. Use emergency buttons if needed
6. Toggle language to test Amharic

The chatbot will provide:
- Emotional validation
- Practical safety advice
- Resource recommendations
- Crisis support guidance
