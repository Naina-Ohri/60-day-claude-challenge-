# PrepGenie - Setup Guide

## Overview

This document explains how to set up the PrepGenie project for local development.

---

# Prerequisites

Before running the project, install:

- Node.js (v20+)
- npm
- Git
- Visual Studio Code

Recommended VS Code Extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitLens
- Thunder Client
- Prisma
- DotENV

---

# Clone Repository

```bash
git clone <repository-url>
cd prepgenie
```

---

# Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
OPENAI_API_KEY=
```

---

# Run Development Server

```bash
npm run dev
```

Open:

http://localhost:3000

---

# Build Project

```bash
npm run build
```

---

# Start Production Server

```bash
npm start
```

---

# Folder Structure

```
app/
components/
lib/
hooks/
types/
public/
styles/
```

---

# Git Workflow

Main Branch

```
main
```

Development Branch

```
dev
```

Feature Branch Example

```
feature/auth
feature/resume
feature/interview
```

---

# Verification Checklist

- Node installed
- Dependencies installed
- Environment configured
- Project runs successfully
- Git repository connected
- Ready for feature implementation
