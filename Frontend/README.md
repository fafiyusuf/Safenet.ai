# Safenet.ai Frontend

Next.js web application for Safenet.ai - Technology-Facilitated Gender-Based Violence Analysis Platform.

## Features

- 🌐 Bilingual interface (English & Amharic)
- 📤 Screenshot & text upload
- 🤖 Real-time AI analysis
- 📊 Risk level visualization
- 📄 PDF evidence generation
- 🔒 Privacy-focused design
- 🎨 Dark/Light mode support
- 🛡️ Content warning system
- 🚪 Safe exit button

## Prerequisites

- Node.js 18+ (recommended: 20+)
- pnpm (recommended) or npm
- Backend API running (see Backend/README.md)

## Installation

### 1. Install Dependencies

```bash
cd Frontend
pnpm install
# or
npm install
```

### 2. Configure Environment Variables

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
JWT_SECRET=your_random_64_character_secret_here

# Environment
NODE_ENV=development
```

## Running the Development Server

```bash
cd Frontend
pnpm dev
# or
npm run dev
```

Visit: http://localhost:3000

## Building for Production

```bash
# Build
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
Frontend/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── upload/            # Upload page
│   ├── results/           # Analysis results
│   ├── resources/         # Support resources
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes (proxy to backend)
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── header.tsx        # Navigation
│   ├── severity-meter.tsx # Severity visualization
│   ├── risk-banner.tsx   # Risk level display
│   └── ...
├── lib/                   # Utilities
│   ├── i18n.ts           # Translations
│   ├── constants.ts      # Static data
│   ├── types.ts          # TypeScript types
│   └── services/         # API services
└── public/               # Static assets
```

## Key Features

### Bilingual Support
The app supports English and Amharic with real-time language switching.

**Translation files:** `lib/i18n.ts`

### Safety Features

1. **Content Warning Modal** - Warns users before viewing sensitive content
2. **Blurred Content** - Sensitive text is blurred by default
3. **Safe Exit Button** - Quick escape to safe website
4. **Disguise Mode** - Hide interface for privacy

### Upload Flow

1. User uploads screenshot or pastes text
2. Selects platform (Facebook, Telegram, etc.)
3. Frontend proxies to Backend API
4. Backend performs OCR (if image)
5. AI classifies content
6. Results displayed with risk level
7. User can download evidence PDF

## API Integration

The Frontend uses Next.js API routes to proxy requests to the Backend:

- `/api/upload` → `http://localhost:8000/api/upload`
- `/api/reports/{id}` → `http://localhost:8000/api/reports/{id}`
- `/api/evidence/{id}/pdf` → Backend PDF endpoint
- etc.

This provides:
- ✅ Better error handling
- ✅ Environment variable security
- ✅ Consistent error responses
- ✅ Easier CORS management

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |
| `ADMIN_USERNAME` | Admin username | Yes (for admin) |
| `ADMIN_PASSWORD` | Admin password | Yes (for admin) |
| `JWT_SECRET` | JWT signing secret | Yes (for admin) |
| `NODE_ENV` | Environment mode | No |

## Customization

### Adding a New Language

1. Edit `lib/i18n.ts`
2. Add language code to `Language` type
3. Add translations to `translations` object
4. Update language selector in `components/language-toggle.tsx`

### Adding a New Platform

1. Edit `lib/constants.ts`
2. Add to `PLATFORMS` array
3. Import appropriate icon from `lucide-react`

### Adding a Resource Organization

1. Edit `lib/constants.ts`
2. Add to `RESOURCES` array
3. Include both English and Amharic translations

## Styling

The project uses:
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **shadcn/ui** component patterns
- **next-themes** for dark mode

### Customizing Theme

Edit `app/globals.css` to change colors:

```css
:root {
  --primary: ...;
  --secondary: ...;
}
```

## Admin Dashboard

Access at: http://localhost:3000/admin

**Features:**
- View all reports
- Statistics dashboard
- Reports by platform/category
- Severity distribution

**Authentication:**
Uses HTTP Basic Auth with credentials from `.env.local`

## Troubleshooting

### Backend Connection Failed
```bash
# Check Backend is running
curl http://localhost:8000/health

# Check API URL in .env.local
echo $NEXT_PUBLIC_API_URL
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript Errors
```bash
# Check types
pnpm tsc --noEmit
```

## Performance Optimization

The app includes:
- ✅ Server-side rendering (SSR)
- ✅ Static generation where possible
- ✅ Image optimization
- ✅ Code splitting
- ✅ Font optimization

## Security Best Practices

⚠️ **Important:**
- Never commit `.env.local`
- Use HTTPS in production
- Validate all user inputs
- Implement rate limiting
- Enable CSP headers
- Use secure cookies

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm i -g vercel

# Deploy
vercel
```

Add environment variables in Vercel dashboard.

### Docker

See `/deployment/README.md` for Docker deployment.

### Other Platforms

The app can be deployed to any Node.js hosting:
- Netlify
- Railway
- Render
- AWS Amplify
- DigitalOcean App Platform

## Development Tips

### Hot Reload
Next.js dev server has hot reload enabled by default.

### Component Development
```bash
# Install Storybook (optional)
pnpm add -D @storybook/react
```

### Testing
```bash
# Add testing libraries
pnpm add -D @testing-library/react @testing-library/jest-dom jest
```

## Accessibility

The app follows WCAG 2.1 AA standards:
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ High contrast mode
- ✅ Focus indicators
- ✅ Semantic HTML

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

Private - Safenet.ai Project

## Support

For issues or questions, contact the development team.
