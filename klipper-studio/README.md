# Klipper Studio

A modern, web-based audio editor built with Next.js 15, TypeScript, and the Web Audio API.

## Features

- **Multi-track Audio Editing**: Import multiple audio files and arrange them on a visual timeline
- **Real-time Playback**: Listen to your edits with synchronized playback and visual feedback
- **Professional Export**: Export your finished tracks in multiple formats (MP3, WAV, AAC, M4A)
- **User Authentication**: Secure sign-up and sign-in with email/password and Google OAuth
- **Subscription Plans**: Free tier with limitations, Pro tier with unlimited features
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Authentication**: Better-Auth
- **Database**: Prisma with PostgreSQL
- **Payments**: Stripe
- **Audio Processing**: Web Audio API

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payments)
- Google OAuth credentials (for social login)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd klipper-studio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual values:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/klipper_studio"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"
```

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/auth/          # Authentication API routes
│   ├── dashboard/         # User dashboard
│   ├── editor/[projectId]/ # Audio editor
│   ├── pricing/           # Pricing page
│   ├── sign-in/           # Sign in page
│   └── sign-up/           # Sign up page
├── components/ui/          # shadcn/ui components
├── lib/
│   ├── auth/              # Authentication configuration
│   ├── stores/            # Zustand stores
│   └── utils.ts           # Utility functions
└── prisma/                # Database schema
```

## Features Overview

### Free Plan
- 1 Project
- Up to 5 audio file imports per project
- 10-minute max total audio length
- MP3 export only

### Pro Plan ($10/month)
- Unlimited Projects
- Unlimited audio file imports
- 90-minute max audio length
- MP3, AAC, M4A & WAV export

## Development

### Adding New Features

1. **Audio Processing**: The core audio functionality is in `src/lib/stores/audio-store.ts`
2. **UI Components**: Add new components in `src/components/ui/`
3. **Pages**: Add new pages in `src/app/`
4. **API Routes**: Add new API routes in `src/app/api/`

### Database Changes

When modifying the Prisma schema:
```bash
npx prisma migrate dev --name your-migration-name
npx prisma generate
```

## Deployment

The application is designed to be deployed on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
