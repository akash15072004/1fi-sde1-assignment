# 1Fi SDE1 Assignment — EMI Product Store

A full-stack EMI product application built for the 1Fi SDE1 assignment. The application displays smartphone products, variants, pricing and EMI plans using data stored in PostgreSQL and accessed through a REST API.

## Live Demo

- **Frontend:** https://1fi-sde1-assignment-one.vercel.app
- **Backend:** https://onefi-sde1-assignment-m43y.onrender.com
- **Repository:** https://github.com/akash15072004/1fi-sde1-assignment

### Product Pages

- `/products/iphone-17-pro`
- `/products/samsung-s24-ultra`
- `/products/google-pixel-9-pro`

## Features

- Database-driven product and EMI information
- 3 smartphones with 2 variants each
- Unique product pages using URL slugs
- Variant selection by storage and color
- MRP, selling price, discount and product images
- Multiple EMI plans per variant
- 0% and 10.5% interest options
- Monthly payment, tenure and cashback details
- EMI plan selection
- Proceed flow with application reference
- Responsive frontend
- REST APIs with validation
- Prisma ORM and PostgreSQL
- Seed data for local and production setup

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, React Router |
| Styling | CSS |
| Backend | Node.js, Express 5, TypeScript |
| Validation | Zod |
| ORM | Prisma |
| Database | PostgreSQL 16 |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

## Project Structure

```text
1fi-sde1-assignment/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── src/
│       ├── routes/
│       │   └── product.routes.ts
│       ├── utils/
│       │   └── slug.ts
│       ├── app.ts
│       ├── prisma.ts
│       └── server.ts
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── vercel.json
│   └── vite.config.ts
├── docker-compose.yml
├── .gitignore
└── README.md
````

## Database Design

The application uses three main entities:

```text
Product
   │
   └── Variant
          │
          └── EMIPlan
```

### Product

Stores product-level information such as:

* Name
* Brand
* Category
* URL slug

### Variant

Stores:

* Storage
* Color
* Image
* MRP
* Selling price

### EMIPlan

Stores:

* Tenure
* Interest rate
* Monthly payment
* Cashback

Relationship:

```text
Product 1 ──── N Variant
Variant 1 ──── N EMIPlan
```

The schema is available in:

```text
backend/prisma/schema.prisma
```

## Products

### Apple iPhone 17 Pro

* Cosmic Orange / 256GB
* Silver / 256GB

### Samsung Galaxy S24 Ultra

* Titanium Gray / 256GB
* Titanium Violet / 512GB

### Google Pixel 9 Pro

* Obsidian / 256GB
* Porcelain / 512GB

Each variant has multiple EMI plans.

## API

Base URL:

```text
https://onefi-sde1-assignment-m43y.onrender.com/api
```

### Health Check

```http
GET /api/health
```

Example:

```json
{
  "success": true,
  "message": "1Fi EMI API is healthy"
}
```

### Get Products

```http
GET /api/products
```

Returns available product summaries.

### Get Product

```http
GET /api/products/:slug
```

Returns product details, variants, pricing and EMI plans.

Example:

```http
GET /api/products/iphone-17-pro
```

### Get Variant

```http
GET /api/products/:slug/variants/:variantId
```

Returns the selected variant and its EMI plans.

### Proceed With EMI Plan

```http
POST /api/products/emi-plans/:planId/proceed
```

Request:

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

## Local Setup

### Requirements

* Node.js 20+
* npm 10+
* Docker Desktop
* PostgreSQL 14+ if Docker is not used

### Start Database

From the project root:

```bash
docker compose up -d db
```

### Backend

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Example product page:

```text
http://localhost:5173/products/iphone-17-pro
```

## Environment Variables

### Backend

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/onefi_emi?schema=public"
PORT=5000
FRONTEND_URL="http://localhost:5173"
```

### Frontend

```env
VITE_API_URL="http://localhost:5000/api"
```

Production values should be configured through the respective deployment platform. Do not commit secrets to GitHub.

## Seed Data

The project includes seed data for all three products and their variants.

Run:

```bash
npm run seed
```

For production migrations:

```bash
npx prisma migrate deploy
```

## Deployment

### Backend — Render

* Root directory: `backend`
* Build command:

```bash
npm install && npx prisma generate && npx prisma migrate deploy && npm run seed && npm run build
```

* Start command:

```bash
npm start
```

Required environment variables:

```text
DATABASE_URL
PORT
FRONTEND_URL
```

### Frontend — Vercel

* Root directory: `frontend`
* Build command:

```bash
npm run build
```

* Output directory:

```text
dist
```

Environment variable:

```text
VITE_API_URL=https://onefi-sde1-assignment-m43y.onrender.com/api
```

`vercel.json` provides SPA routing support for direct product URLs.

## Useful Commands

### Backend

```bash
npm run dev
npm run build
npm start
npm run seed
npm run prisma:studio
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

## Demo Video

The 2–5 minute demonstration covers:

1. Product page and responsive UI
2. Product URL and slug-based navigation
3. Variant switching
4. EMI plan selection
5. Interest rate and cashback
6. Proceed confirmation flow
7. Backend API responses
8. Prisma database schema
9. PostgreSQL data
10. Frontend → API → database architecture

## Assignment Checklist

* [x] Dynamic product details
* [x] Product variants
* [x] MRP and selling price
* [x] Product images
* [x] Multiple EMI plans
* [x] Monthly payment
* [x] Tenure
* [x] Interest rate
* [x] Cashback
* [x] EMI selection
* [x] Proceed flow
* [x] REST backend API
* [x] PostgreSQL database
* [x] Prisma schema
* [x] Seed data
* [x] 3 products
* [x] 2 variants per product
* [x] Unique product URLs
* [x] Responsive frontend
* [x] Deployed frontend and backend


---

### Built with ❤️ by Akash

Developed as part of the 1Fi SDE1 Assignment.
