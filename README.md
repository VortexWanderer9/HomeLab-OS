# HomeLab OS - Web Frontend

This is the Next.js 16 frontend application for HomeLab OS.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Styling](#styling)
- [Components](#components)
- [Development Guidelines](#development-guidelines)

---

## Overview

The web frontend provides a premium, unified dashboard for managing and monitoring your self-hosted infrastructure. Built with modern design principles and accessibility in mind.

---

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first CSS
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **ESLint** - Code linting

---

## Getting Started

### Prerequisites

- Node.js 22+
- npm 10+

### Installation

```bash
# Navigate to the web app directory
cd apps/web

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
apps/web/
├── public/             # Static assets
├── src/
│   ├── app/            # App Router pages and layouts
│   │   ├── containers/
│   │   ├── infrastructure/
│   │   ├── monitoring/
│   │   ├── network/
│   │   ├── security/
│   │   ├── settings/
│   │   ├── storage/
│   │   ├── terminal/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/     # React components
│   │   ├── ui/         # shadcn/ui components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── switch.tsx
│   │   │   └── tabs.tsx
│   │   ├── AppLayout.tsx
│   │   └── Sidebar.tsx
│   └── lib/            # Utility functions
│       └── utils.ts
├── .dockerignore
├── .gitignore
├── Dockerfile
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

---

## Styling

This project uses **Tailwind CSS 4** for styling.

### Design Guidelines

- **Spacing**: Use tokenized scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128)
- **Colors**: Use the built-in Tailwind color palette, avoid hardcoded colors
- **Accessibility**: Ensure WCAG AA compliance, proper focus states, and ARIA attributes
- **No arbitrary values**: Avoid `mt-[37px]` style arbitrary values

### Components

shadcn/ui components are located in `src/components/ui/`.

---

## Development Guidelines

### Component Limits

- Components should be < 250 lines
- Pages should be < 150 lines

### Clean Architecture

- Separation of concerns
- Reusable components
- Clear directory structure

### Code Quality

- Run `npm run lint` before committing
- TypeScript strict mode enabled
- No `any` types

---

## Docker

### Build Image

```bash
docker build -t homelab-os-web .
```

### Run Container

```bash
docker run -p 3000:3000 homelab-os-web
```
