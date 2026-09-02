# 1Fi SDE1 Assignment — EMI Product Store

A complete full-stack implementation of the 1Fi SDE1 assignment.

## What is included

- React + Vite frontend
- Express + TypeScript backend
- PostgreSQL database
- Prisma ORM
- Dynamic product, variant, pricing, image and EMI-plan data from the database
- 3 products, each with 2 variants
- Unique product URLs:
  - `/products/iphone-17-pro`
  - `/products/samsung-s24-ultra`
  - `/products/google-pixel-9-pro`
- Selectable EMI plans
- "Proceed with plan" confirmation flow
- Responsive UI inspired by the supplied assignment reference
- Database schema + seed data
- Docker Compose PostgreSQL setup
- API documentation
- Health endpoint

The assignment explicitly requires database-backed data, unique product URLs, at least 3 products with 2+ variants, product/EMI APIs, a defined schema, and React/Node/PostgreSQL-compatible technologies. This project implements those requirements.

## Tech stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- Plain CSS (responsive, component-oriented styling)

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- Zod validation

### Database
- PostgreSQL 16

## Project structure

```text
1fi-sde1-assignment/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── prisma.ts
│   │   ├── routes/
│   │   │   └── product.routes.ts
│   │   └── utils/
│   │       └── slug.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js 20+
- npm 10+
- Docker Desktop (recommended) or a PostgreSQL 14+ instance

## 1. Start PostgreSQL

From the project root:

```bash
docker compose up -d db
```

The default database is:

```text
postgresql://postgres:postgres@localhost:5432/onefi_emi
```

## 2. Setup backend

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

## 3. Setup frontend

Open a second terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

Open:

```text
http://localhost:5173/products/iphone-17-pro
```

## API endpoints

### GET `/api/health`

Example response:

```json
{
  "success": true,
  "message": "1Fi EMI API is healthy"
}
```

### GET `/api/products`

Returns product summaries.

Example:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "category": "Smartphone"
    }
  ]
}
```

### GET `/api/products/:slug`

Returns a complete product, its variants, pricing and EMI plans.

Example:

```json
{
  "success": true,
  "data": {
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "variants": [
      {
        "id": 1,
        "color": "Cosmic Orange",
        "storage": "256GB",
        "mrp": 134900,
        "price": 127400,
        "emiPlans": [
          {
            "id": 1,
            "months": 3,
            "interestRate": 0,
            "monthlyPayment": 42467,
            "cashback": 7500
          }
        ]
      }
    ]
  }
}
```

### GET `/api/products/:slug/variants/:variantId`

Returns one selected variant and its EMI plans.

### POST `/api/emi-plans/:planId/proceed`

Simulates the proceed action and returns an application/session reference.

Example request:

```json
{
  "variantId": 1
}
```

Example response:

```json
{
  "success": true,
  "data": {
    "applicationReference": "1FI-AB12CD34",
    "message": "Plan selected successfully"
  }
}
```

## Database schema

The main relationships are:

```text
Product 1 ──────── N Variant
Variant 1 ──────── N EMIPlan
```

- `Product` stores the canonical product identity and URL slug.
- `Variant` stores storage/color, image, MRP and selling price.
- `EMIPlan` stores tenure, interest rate, monthly payment and cashback.
- Prices and plans are therefore not hardcoded in the React UI.

See `backend/prisma/schema.prisma`.

## Seed data

The seed contains:

1. Apple iPhone 17 Pro
   - Cosmic Orange / 256GB
   - Silver / 256GB

2. Samsung Galaxy S24 Ultra
   - Titanium Gray / 256GB
   - Titanium Violet / 512GB

3. Google Pixel 9 Pro
   - Obsidian / 256GB
   - Porcelain / 512GB

Each variant has multiple EMI plans.

## Useful commands

Backend:

```bash
npm run dev
npm run build
npm run start
npm run seed
npm run prisma:studio
```

Frontend:

```bash
npm run dev
npm run build
npm run preview
```

## Environment variables

Backend `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/onefi_emi?schema=public"
PORT=5000
FRONTEND_URL="http://localhost:5173"
```

Frontend `.env`:

```env
VITE_API_URL="http://localhost:5000/api"
```

## Deployment

### Database

Use a managed PostgreSQL provider such as Neon, Supabase or Render PostgreSQL. Set:

```text
DATABASE_URL=<managed-postgresql-url>
```

Run:

```bash
npx prisma migrate deploy
npm run seed
```

### Backend on Render

- Root directory: `backend`
- Build command:

```bash
npm install && npx prisma generate && npm run build
```

- Start command:

```bash
npm start
```

- Environment variables:
  - `DATABASE_URL`
  - `PORT=10000`
  - `FRONTEND_URL=<your-vercel-url>`

### Frontend on Vercel

- Root directory: `frontend`
- Build command:

```bash
npm run build
```

- Output directory:

```text
dist
```

- Environment variable:

```text
VITE_API_URL=https://<your-backend-domain>/api
```

## Demo video checklist

For the required 2–5 minute video, show:

1. Product page and responsive UI
2. Product URL changing by slug
3. Variant switching
4. EMI plan selection
5. Proceed button and confirmation
6. `/api/products` in browser/Postman
7. `/api/products/iphone-17-pro` response
8. Prisma schema
9. PostgreSQL tables / Prisma Studio
10. Brief explanation of frontend → API → database flow

## Assignment compliance checklist

- [x] Dynamic product details
- [x] Variant, MRP, price and image
- [x] Multiple EMI plans
- [x] Monthly payment, tenure, interest rate and cashback
- [x] EMI plan selection
- [x] Proceed button
- [x] Backend API
- [x] PostgreSQL database
- [x] No product/EMI data hardcoded in React
- [x] Unique product URLs
- [x] 3 products
- [x] 2 variants per product
- [x] Database schema
- [x] Seed data
- [x] README with setup/API/schema/tech stack
