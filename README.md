# Trexo — Finance Tracking Frontend

Trexo is a personal finance tracker. Log your income and expenses, set a monthly budget per category, and keep track of recurring payments like rent or subscriptions, all in one dashboard.

This repo is the web client. It talks to the [FinanceTrackingBackend](https://github.com/riaars/FinanceTrackingBackend) REST API.

## Features

- **Dashboard**: income vs. expense cash flow, spending by category, budget vs. actual, latest and upcoming transactions, filterable by day, week, month or year
- **Transactions**: add, edit and delete income and expenses; search and filter by type or category; export to CSV or PDF
- **Budgets**: set a monthly budget per category and track progress as you spend
- **Recurring payments**: mark a transaction as recurring (daily, weekly, monthly or yearly), then edit or cancel active plans
- **Account**: sign up with email verification, log in, reset a forgotten password, change your password
- **Light and dark theme**, responsive layout with a sidebar on desktop and a bottom bar on mobile

## Getting started

### Prerequisites

- Node.js 24 (the version CI uses)
- The [backend](https://github.com/riaars/FinanceTrackingBackend) running locally, on `http://localhost:3000` by default

### Setup

```bash
git clone https://github.com/riaars/FinanceTrackingFrontend.git
cd FinanceTrackingFrontend
npm install

cp .env.example .env   # VITE_API_URL points to the backend
npm run dev
```

The app runs at http://localhost:5173.

Login uses an HTTP-only cookie set by the backend, so the backend's `FRONTEND_URL` must match this URL (`http://localhost:5173`). Otherwise CORS blocks the requests.

### Environment variables

| Variable       | Description          | Example                 |
| -------------- | -------------------- | ----------------------- |
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` |

### Scripts

| Command             | Description                         |
| ------------------- | ----------------------------------- |
| `npm run dev`       | Start the dev server with hot reload |
| `npm run build`     | Production build into `dist/`       |
| `npm run preview`   | Serve the production build locally  |
| `npm run lint`      | Run ESLint                          |
| `npm run typecheck` | Run the TypeScript compiler checks  |

## Tech stack

| Area                  | Tools                                                                  |
| --------------------- | ---------------------------------------------------------------------- |
| Framework             | [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org), React Compiler |
| Build                 | [Vite 6](https://vite.dev)                                             |
| State & data fetching | [Redux Toolkit](https://redux-toolkit.js.org) + RTK Query              |
| Routing               | [React Router 7](https://reactrouter.com), with lazy-loaded pages      |
| Forms & validation    | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| Charts                | [Recharts](https://recharts.org)                                       |
| Styling               | SCSS                                                                   |
| Export                | jsPDF + jspdf-autotable                                                |
| Utilities             | dayjs, react-icons, react-error-boundary                               |
| CI/CD                 | GitHub Actions → AWS EC2, served by Nginx                              |

## How it works

- **Auth**: the backend sets a session cookie at login. Every request sends it (`credentials: "include"`). `PrivateRoute` checks the session through `/getCurrentUser`, and any `401` response logs you out and sends you to the login page.
- **Data**: all API calls go through a single RTK Query `baseApi`. Each feature injects its own endpoints. Cache tags refresh the dashboard, transactions and budgets automatically after any change.
- **Layout**: logged-in pages share one `AppLayout` (sidebar + bottom bar) as a layout route, and each page is loaded on demand.

## Project structure

```
src/
├── app/            # Redux store and typed hooks
├── assets/         # Images and SCSS (base, components, layout, pages)
├── components/     # Shared UI: Button, Input, Dialog, Pagination, route guards
├── config/         # Route paths
├── features/       # One folder per feature: api/, pages/, ui/, utils/
│   ├── auth/
│   ├── budgets/
│   ├── dashboard/
│   ├── recurring/
│   ├── settings/
│   ├── theme/
│   └── transaction/
├── hooks/          # Shared hooks (useDebounce)
├── layout/         # AppLayout, Sidebar, BottomBar, Content
├── schemas/        # Zod form schemas
├── services/       # RTK Query base API
├── utils/          # Helpers, constants, CSV/PDF export
├── App.tsx         # Routes
└── main.tsx        # Entry point
```

## Deployment

Every push to `main` triggers the [GitHub Actions workflow](.github/workflows/frontend.yml). It runs lint and type checks, builds the app with `VITE_API_URL` from the repo variables or secrets, uploads `dist/` to an EC2 instance, and reloads Nginx.
