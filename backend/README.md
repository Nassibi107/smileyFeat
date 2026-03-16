# SMILEY OS Backend (NestJS)

NestJS backend for SMILEY OS dashboard and booking workflow.

## Features

- PostgreSQL + Prisma ORM
- CRM leads API for dashboard
- Booking API for the Book Call page
- Email notification on each new booking to my.yassinenassibi@gmail.com

## Tech Stack

- NestJS
- Prisma ORM
- PostgreSQL (database: smileyOS)
- Nodemailer

## 1) Configure environment

Copy `.env.example` to `.env` and update values.

Required variables:

- `DATABASE_URL` (must point to database name `smileyOS`)
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `MAIL_TO` (default is `my.yassinenassibi@gmail.com`)
- `PORT`
- `CORS_ORIGIN`

## 2) Install dependencies

```bash
npm install
```

## 3) Generate Prisma client and migrate

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

## 4) Run backend

```bash
npm run start:dev
```

Backend runs at `http://localhost:4000` by default.

## API Endpoints

### CRM Leads

- `GET /crm/leads`
- `POST /crm/leads`

Create lead payload:

```json
{
  "company": "Acme Corp",
  "value": 42000,
  "rep": "AL",
  "source": "LinkedIn",
  "stage": "Qualified",
  "daysInStage": 2,
  "contact": "Emma Stone",
  "email": "emma@acme.com",
  "phone": "+1 332 912 0012",
  "industry": "SaaS",
  "website": "https://acme.com",
  "notes": "Warm inbound"
}
```

### Bookings

- `GET /bookings`
- `POST /bookings`

Booking payload:

```json
{
  "companyName": "Acme Corp",
  "website": "https://acme.com",
  "industry": "SaaS",
  "companyStage": "1-3",
  "monthlyRevenue": "10-50k",
  "bottleneck": "Pipeline visibility",
  "budgetRange": "5-15k",
  "email": "founder@acme.com",
  "phone": "+1 555 000 0000"
}
```
