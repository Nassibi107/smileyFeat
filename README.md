# SMILEY Frontend

SMILEY is a marketing website for a revenue infrastructure brand. The project is built as a frontend-only Next.js application with animated landing-page sections, supporting detail pages, and a client-side booking form for strategic calls.

## Overview

This codebase presents SMILEY as a premium consulting and growth systems company. The experience is centered around a long-form homepage that explains the offer, shows proof and positioning, introduces the team, and drives users toward a booking flow.

Core experience includes:

- A scroll-based homepage assembled from reusable section components
- Dedicated pages for About, Infrastructure, Case Studies, and Book Call
- Framer Motion transitions and reveal animations across the site
- A custom animated cursor and styled scrollbar for a more branded feel
- Responsive navigation with desktop and mobile menu states

## Tech Stack

- Next.js 14 with the App Router
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Main landing page composed of multiple marketing sections |
| `/about` | Brand story and team presentation |
| `/infrastructure` | Four-phase revenue engine / delivery process |
| `/case-studies` | Industry-specific transformation examples and outcomes |
| `/book-call` | Client-side intake form for booking a strategy call |

## Homepage Composition

The homepage is defined in `app/page.tsx` and is composed from reusable components in `components/`.

Sections currently rendered on the homepage:

- Hero
- Dashboard
- Reality Check
- Positioning
- Client Types
- Revenue Engine
- Our Team
- Partnerships
- Why Smiley
- Case Studies
- Final CTA
- Footer

Shared site-level UI is provided through the root layout:

- `Navbar` is rendered globally from `app/layout.tsx`
- `CustomCursor` is injected globally from `app/layout.tsx`
- Global colors, cursor styling, and scrollbar styling live in `app/globals.css`

## Project Structure

```text
app/
	layout.tsx              Root layout with metadata, navbar, and custom cursor
	page.tsx                Homepage composition
	about/page.tsx          About page
	book-call/page.tsx      Booking form page
	case-studies/page.tsx   Case studies page
	infrastructure/page.tsx Infrastructure process page

components/
	Hero.tsx
	Dashboard.tsx
	RealityCheck.tsx
	Positioning.tsx
	ClientTypes.tsx
	RevenueEngine.tsx
	OurTeam.tsx
	Partnerships.tsx
	WhySmiley.tsx
	CaseStudies.tsx
	FinalCTA.tsx
	Navbar.tsx
	Footer.tsx
	CustomCursor.tsx
```

## Local Development

### Prerequisites

- Node.js 18 or later
- npm

### Install

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Backend (NestJS + Prisma + PostgreSQL)

This repository now includes a backend service in `backend/` for dashboard data and booking notifications.

Stack:

- NestJS API
- Prisma ORM
- PostgreSQL database named `smileyOS`
- Nodemailer email alerts

Frontend and backend connection:

- Frontend uses `NEXT_PUBLIC_API_URL` from `.env.local`
- Copy `.env.local.example` to `.env.local`
- Default backend URL is `http://localhost:4000`

Quick start:

1. Backend setup

```bash
cd backend
npm install
copy .env.example .env
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run start:dev
```

2. Frontend setup

```bash
cd ..
copy .env.local.example .env.local
npm install
npm run dev
```

Booking notifications:

- Every successful `POST /bookings` creates a booking record and sends an email notification to `my.yassinenassibi@gmail.com` (via your configured SMTP provider).

## Available Scripts

```bash
npm run dev    # Start the local development server
npm run build  # Create a production build
npm run start  # Start the production server
npm run lint   # Run project linting
```

## Content and Interaction Notes

- The site content is currently hardcoded in page and component files.
- The Book Call flow is frontend-only at the moment. Submitting the form sets local component state and shows a success message; it does not send data to a backend or third-party form service.
- Team data, case study data, and infrastructure phase data are stored inline inside their page or component files.

## Styling Notes

- Global theme variables are defined in `app/globals.css`
- The current visual direction uses a dark background with violet accent gradients
- Most layout and UI styling is implemented with Tailwind utility classes
- Motion behavior is handled with Framer Motion rather than CSS-only animation patterns

## Deployment

This project can be deployed on any platform that supports Next.js applications, including Vercel.

Typical production flow:

```bash
npm install
npm run build
npm run start
```

## Recommended Next Improvements

- Connect the booking form to a real submission target such as an API route, CRM, or form provider
- Move repeated content into structured data files or a CMS if non-developers need to edit copy
- Add automated tests for page rendering and key interactions if the site will continue evolving
