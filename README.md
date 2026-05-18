# 📚 Book Tracker API

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens)
![Passport](https://img.shields.io/badge/Passport-34E27A?logo=passport)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?logo=yarn&logoColor=white)

A modern backend API for managing books, users and personal libraries.

---

## 🌐 Frontend Demo

🚀 https://book-tracker-ui.vercel.app

---

## ✨ Features

- 🔐 JWT Authentication (access + refresh tokens)
- 👤 User registration & login
- 📚 Personal book library
- ➕ Add books to library
- 📖 Reading status tracking
- ⭐ Book rating system
- 🗑 Delete books
- ⚡ Prisma ORM
- 🛡 DTO validation (class-validator)

---

## 🛠 Tech Stack

### Core
- NestJS
- TypeScript

### Database
- PostgreSQL
- Prisma ORM
- Neon (production DB)

### Auth
- JWT
- Passport.js
- bcrypt

### Tooling
- Yarn
- ESLint
- Prettier

### Testing
- Jest
- Supertest

---

## 🚀 Getting Started

Install dependencies:
yarn install

Start development server:
yarn dev

Open API:
http://localhost:3001

---

## 🗄 Database

Start database (Docker):
yarn db:up

Stop database:
yarn db:stop

Run migrations:
yarn prisma:migrate

Generate Prisma client:
yarn prisma:gen

---



## 🔮 Planned Features

- [ ] Swagger documentation
- [ ] Book recommendations
- [ ] Reading statistics
- [ ] Analytics for user library

---

Made with ❤️ using NestJS + Prisma