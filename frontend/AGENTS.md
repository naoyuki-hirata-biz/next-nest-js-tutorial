# Coding Agent Instructions (AGENTS.md)

## Objective
This project is a modern full-stack web application built with **Next.js (App Router)** and **Nest.js**. To ensure code quality and prevent modern/legacy framework mismatches, all AI development agents (e.g., Cursor, Cline, GitHub Copilot) must strictly follow the architectural constraints below.

---

## 1. Frontend Constraints (Next.js)

- **App Router Paradigm**: Always use the `src/app` directory for routing. **NEVER** use the legacy Pages Router (`src/pages`).
- **Server Components by Default**: All components in the `src/app` directory are Server Components by default. Do not add `'use client'` unless explicit browser-only interactive features (like `useState`, `useEffect`, or event handlers) are required.
- **Data Fetching**: Use standard asynchronous Server Components (`async/await`) and native `fetch` with appropriate caching strategies (e.g., `cache: 'no-store'`). **NEVER** use legacy lifecycle methods like `getServerSideProps` or `getStaticProps`.
- **Styling**: Utilize **Tailwind CSS** for all component styling, sticking to clean and responsive utility classes.

---

## 2. Backend Constraints (Nest.js)

- **Separation of Concerns**: Keep business logic inside **Services** and handling of HTTP requests/responses inside **Controllers**.
- **Data Persistence**: Use **Prisma ORM** as the database layer connected to PostgreSQL. Ensure models and DTOs (Data Transfer Objects) are strongly typed with TypeScript.
- **API Boundary**: The backend must act strictly as a REST API. Do not embed frontend serving capabilities inside Nest.js.

---

## 3. Communication and Integration

- **CORS Handling**: The frontend connects to the backend via `http://localhost:3001`. Ensure CORS is properly handled during local development.
- **Type Safety**: Share TypeScript interfaces or DTO contracts between the `frontend` and `backend` layers whenever possible to maintain absolute full-stack type safety.
- **Geofencing Note**: Do not write application-level geofencing or VPN blocking code in either Next.js or Nest.js. This will be handled completely at the Infrastructure/WAF layer (Cloudflare) in production.
