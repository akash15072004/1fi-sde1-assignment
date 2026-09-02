# 1Fi SDE1 Assignment – EMI & Product Platform

A full-stack web application built as part of the **1Fi SDE1 Assignment**.

The application allows users to explore products, select variants, view EMI plans, compare monthly payments, interest rates and cashback, and proceed with a selected EMI plan.

The application is database-driven and built using React, Node.js, Express, Prisma and PostgreSQL.

---

## Live Demo

**Frontend:**  
https://1fi-sde1-assignment-one.vercel.app

**Backend:**  
https://onefi-sde1-assignment-m43y.onrender.com

**GitHub:**  
https://github.com/akash15072004/1fi-sde1-assignment

### Product Pages

- **iPhone 17 Pro**  
  https://1fi-sde1-assignment-one.vercel.app/products/iphone-17-pro

- **Samsung Galaxy S24 Ultra**  
  https://1fi-sde1-assignment-one.vercel.app/products/samsung-s24-ultra

- **Google Pixel 9 Pro**  
  https://1fi-sde1-assignment-one.vercel.app/products/google-pixel-9-pro

---

## Features

- Product and variant selection
- Storage and color options
- MRP and selling price
- Multiple EMI plans
- 0% and 10.5% interest options
- Monthly EMI calculation
- Cashback information
- EMI plan selection
- Proceed functionality with application reference
- Responsive user interface
- REST API integration
- PostgreSQL database
- Prisma ORM
- Unique URLs for products
- Production deployment

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Routing | React Router |
| Styling | CSS |
| Backend | Node.js, Express.js, TypeScript |
| Validation | Zod |
| ORM | Prisma |
| Database | PostgreSQL |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

---

## Project Structure

```text
1fi-sde1-assignment/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── vercel.json
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml
├── README.md
└── package.json
````

---

## Database Design

The application uses a relational PostgreSQL database with the following relationships:

```text
Product
   │
   └── Variant
          │
          └── EMI Plan
```

### Product

Stores product-level information such as name, slug, image, MRP and selling price.

### Variant

Stores configuration-specific information such as color and storage.

### EMI Plan

Stores tenure, interest rate, monthly payment and cashback for each variant.

---

## Products & Variants

The seeded database contains **3 products with 2 variants each**.

| Product                  | Variants                                       |
| ------------------------ | ---------------------------------------------- |
| iPhone 17 Pro            | Cosmic Orange – 256GB, Silver – 256GB          |
| Samsung Galaxy S24 Ultra | Titanium Gray – 256GB, Titanium Violet – 512GB |
| Google Pixel 9 Pro       | Obsidian – 256GB, Porcelain – 512GB            |

Each variant contains EMI options for **3, 6, 12, 24, 36, 48 and 60 months**.

---

## Backend API

### Health Check

```http
GET /api/health
```

Production:

[https://onefi-sde1-assignment-m43y.onrender.com/api/health](https://onefi-sde1-assignment-m43y.onrender.com/api/health)

### Get All Products

```http
GET /api/products
```

Production:

[https://onefi-sde1-assignment-m43y.onrender.com/api/products](https://onefi-sde1-assignment-m43y.onrender.com/api/products)

### Get Product

```http
GET /api/products/:slug
```

Production examples:

```text
https://onefi-sde1-assignment-m43y.onrender.com/api/products/iphone-17-pro

https://onefi-sde1-assignment-m43y.onrender.com/api/products/samsung-s24-ultra

https://onefi-sde1-assignment-m43y.onrender.com/api/products/google-pixel-9-pro
```

### Get Variant

```http
GET /api/products/:slug/variants/:variantId
```

### Proceed with EMI Plan

```http
POST /api/products/emi-plans/:planId/proceed
```

Request body:

```json
{
  "variantId": 1
}
```

---

## Local Setup

### Prerequisites

* Node.js
* npm
* PostgreSQL

Docker can also be used for PostgreSQL.

### Backend

```bash
cd backend
npm install
```

Create `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/onefi"
PORT=5000
FRONTEND_URL="http://localhost:5173"
```

Run Prisma:

```bash
npx prisma generate
npx prisma migrate dev
npm run seed
```

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Environment Variables

### Backend

```env
DATABASE_URL="your-postgresql-connection-string"
PORT=5000
FRONTEND_URL="your-frontend-url"
```

### Frontend

```env
VITE_API_URL="your-backend-api-url/api"
```

---

## Deployment

### Vercel

Frontend configuration:

```text
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
```

Production API:

```env
VITE_API_URL=https://onefi-sde1-assignment-m43y.onrender.com/api
```

`vercel.json` is included to support direct navigation to product routes.

### Render

Backend build command:

```bash
npm install && npx prisma generate && npx prisma migrate deploy && npm run seed && npm run build
```

Start command:

```bash
npm start
```

---

## Useful Commands

### Backend

```bash
npm install
npm run dev
npm run build
npm start
npm run seed
npx prisma generate
npx prisma migrate dev
npx prisma migrate deploy
```

### Frontend

```bash
npm install
npm run dev
npm run build
```

---

## Assignment Checklist

* [x] React frontend
* [x] Responsive product page
* [x] Product variants
* [x] MRP and selling price
* [x] Multiple EMI plans
* [x] 0% and 10.5% interest rates
* [x] Monthly payment and cashback
* [x] EMI selection
* [x] Proceed functionality
* [x] Backend REST APIs
* [x] PostgreSQL database
* [x] Prisma ORM
* [x] Database seed data
* [x] 3 products with 2 variants each
* [x] Unique product URLs
* [x] Production deployment

---

## Developed By

**Akash**

### Built as part of the 1Fi SDE1 Assignment



