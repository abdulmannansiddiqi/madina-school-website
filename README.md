# Madina Model Higher Secondary School — Website

A full-stack website for **Madina Model Higher Secondary School** (Faqirwali), a PEF-registered institution providing free education. Built to give the school an easy-to-manage online presence, with an admin panel for staff to update content independently.

🔗 **Live Site:** https://madina-school-website.vercel.app
🔗 **Admin Panel:** https://madina-school-website.vercel.app/admin/login

## Tech Stack

**Frontend**
- Next.js (React)
- Tailwind CSS

**Backend**
- Node.js + Express
- Prisma ORM (v5.20.0)
- JWT authentication + bcrypt

**Database**
- MySQL (hosted on Aiven)

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → Aiven

## Features

- Public pages: Home, About, Academics, Admissions, Gallery, News, Contact
- Admin panel (JWT-protected) to manage:
  - News & Announcements
  - Teachers
  - Achievements
  - Student records (private, not shown publicly)

## Project Structure

madina-school-website/
├── frontend/ # Next.js app
└── backend/ # Express API + Prisma


## Running Locally

**Backend**
```bash
cd backend
npm install
npx prisma generate
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Both need a `.env` / `.env.local` file with the appropriate variables (`DATABASE_URL`, `JWT_SECRET` for backend; `NEXT_PUBLIC_API_URL` for frontend) — see `.env.example` if provided, or ask the maintainer.

## Author

**Abdul Mannan Siddiqi**
