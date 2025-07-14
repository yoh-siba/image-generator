# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (fast refresh enabled)
- `npm run build` - Create production build (runs TypeScript checking and linting)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Technology Stack

- **Next.js 15.3.5** with App Router architecture
- **React 19** with TypeScript 5
- **Tailwind CSS 4** for styling
- **Google Gemini API** (`@google/genai`) for image generation using Imagen 4.0 model

## Architecture Overview

This is a Japanese-language AI image generation application with a three-page flow:

1. **Root (`/`)** - Automatic redirect to login
2. **Login (`/login`)** - Simple password authentication 
3. **Generate (`/generate`)** - Main image generation interface

### Key Directories

- `src/app/api/` - API routes for authentication and image generation
- `src/app/components/` - Reusable React components
- `src/app/lib/` - Utility functions for auth and Gemini API integration
- `src/app/[page]/` - Page-level routes using App Router

### Authentication Pattern

Uses simple password-based authentication with localStorage persistence:
- `checkPassword()` in `lib/auth.ts` validates against `APP_PASSWORD` env var
- Client-side state managed through localStorage
- No complex session management or JWT tokens

### Image Generation Architecture

**API Flow:**
1. `POST /api/generate` receives text prompt (max 1000 chars)
2. `lib/imagen.ts` calls Google Gemini Imagen 4.0 model
3. Returns base64 data URL instead of saving files (Vercel-compatible)

**Key Implementation Details:**
- Uses `imagen-4.0-generate-preview-06-06` model
- Generates single images per request
- Returns `GeneratedImage` interface with id, url (base64), prompt, and timestamp
- Images displayed using Next.js `Image` component
- Clipboard API integration for copying generated images

### Component Structure

- `ImageGenerator.tsx` - Main UI with prompt input, generation logic, and image display
- `LoadingAnimation.tsx` - Educational loading screen with AI tips
- All components use Tailwind for styling with gradient-based modern design

## Environment Variables

Required for functionality:
- `GOOGLE_API_KEY` - Google Gemini API key for image generation
- `APP_PASSWORD` - Simple password for application access

## Development Notes

- TypeScript strict mode enabled with path mapping (`@/*` → `./src/*`)
- ESLint configured with Next.js and TypeScript rules
- Turbopack enabled for faster development builds
- Japanese language interface throughout
- No complex state management - uses React useState and localStorage

## Special Considerations

- **Vercel Deployment**: Image generation returns base64 data URLs instead of saving to filesystem (read-only environment compatible)
- **Error Handling**: Comprehensive error states in both API routes and components
- **Performance**: Uses Next.js Image component and component-level loading states
- **Security**: Simple password auth suitable for personal use, environment variables properly secured