# PrepGenie - Project Structure

## Overview

The project follows a modular folder structure to keep the code organized, scalable, and easy to maintain.

---

## Folder Structure

```
prepgenie/
│
├── app/
│   ├── api/
│   ├── auth/
│   ├── dashboard/
│   ├── resume/
│   ├── interview/
│   └── settings/
│
├── components/
│   ├── common/
│   ├── layout/
│   ├── ui/
│   └── cards/
│
├── lib/
│   ├── ai/
│   ├── database/
│   ├── auth/
│   └── utils/
│
├── hooks/
│
├── types/
│
├── public/
│
├── styles/
│
├── prisma/
│
├── docs/
│
├── .env
├── package.json
└── README.md
```

---

## Folder Responsibilities

### app/
Contains all application pages, routing, and API routes.

### components/
Reusable UI components shared across the application.

### lib/
Business logic, AI integrations, authentication, database utilities, and helper functions.

### hooks/
Custom React hooks.

### types/
Shared TypeScript interfaces and types.

### public/
Static assets such as images and icons.

### styles/
Global styles and Tailwind configuration.

### prisma/
Database schema and migrations.

### docs/
Project documentation including architecture, setup guides, API documentation, and summaries.

---

## Design Principles

- Modular architecture
- Easy scalability
- Reusable components
- Clear separation of concerns
- Beginner-friendly organization

---

## Current Status

✅ Project structure finalized

✅ Ready for feature implementation
