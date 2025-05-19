# 🚀 WorkNest — Employee Management Dashboard (Client)

Welcome to **WorkNest**, a sleek and secure **employee management dashboard** designed to streamline company operations with **role-based access**, dynamic tracking, and seamless payment features.

This is the **client-side** of the platform, developed with **React 19**, and powered by modern technologies such as **Tailwind CSS**, **Framer Motion**, **Firebase**, and **Stripe**.

---

## 🌐 Live Demo

👉 [Live Preview](https://work-nest-client.web.app)

---

## ✨ Features

- 🔐 **Secure Authentication** with Firebase & JWT
- 👥 **Role-Based Dashboards** for Admin, HR, and Employees
- 📊 **Real-Time Progress Tracking** for Employees
- 💳 **Stripe Integration** for salary payments
- 🧾 **Admin Controls** for employee management
- 🗓️ **Work Submissions** and salary history view
- 🎨 **Responsive UI** built with Tailwind CSS
- 🎬 **Smooth Animations** using Framer Motion
- 🔄 **React Query** for optimized data handling
- 📨 **Public Contact Form** for visitors

---

## 📸 Screenshots

| Dashboard View         | Progress Tracker          |
|------------------------|---------------------------|
| ![Admin Dashboard](https://via.placeholder.com/600x400) | ![HR Tracker](https://via.placeholder.com/600x400) |

| Salary Payment Flow    | Mobile Responsiveness     |
|------------------------|---------------------------|
| ![Stripe Checkout](https://via.placeholder.com/600x400) | ![Mobile View](https://via.placeholder.com/600x400) |

---

## 🛠 Tech Stack

### ⚛️ Frontend

| Tech                     | Purpose                        |
|--------------------------|---------------------------------|
| **React 19**             | Component-based UI              |
| **Vite**                 | Fast dev server & bundler       |
| **React Router v7**      | Routing & navigation            |

---

### 🎨 UI/UX

| Tech                     | Purpose                        |
|--------------------------|---------------------------------|
| **Tailwind CSS**         | Utility-first styling           |
| **Framer Motion**        | Animation & transitions         |
| **React Icons**          | Icon integration                |
| **Lucide React**         | Icon components                 |
| **Swiper**               | Sliders for testimonials/etc.   |
| **SweetAlert2**          | Alert modals                    |
| **React Toastify**       | Toast notifications             |
| **React Datepicker**     | Date input handling             |

---

### 📊 Forms & Tables

| Tech                             | Purpose                      |
|----------------------------------|-------------------------------|
| **React Hook Form**              | Form management               |
| **TanStack React Table v8**      | Table rendering & filtering   |
| **Prop Types**                   | Component props validation    |

---

### 🔌 Data & State

| Tech                         | Purpose                          |
|------------------------------|-----------------------------------|
| **Axios**                    | HTTP client                       |
| **React Query (TanStack v5)**| API caching & sync                |

---

### 🔐 Auth & SEO

| Tech               | Purpose                          |
|--------------------|-----------------------------------|
| **Firebase v11**   | Auth & user sessions              |
| **JWT**            | Secure role-based authorization   |
| **React Helmet**   | SEO & meta tag management         |

---

### 💳 Payments

| Tech                         | Purpose              |
|------------------------------|-----------------------|
| **@stripe/react-stripe-js** | Payment processing     |

---

## 📦 Installation Instructions

```bash
# Clone the repository
git clone https://github.com/your-username/worknest-client.git

# Navigate to the project folder
cd worknest-client

# Install dependencies
npm install

# Create your .env file
cp .env.example .env

# Run the development server
npm run dev

VITE_API_BASE_URL=https://your-backend-api.com
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

▶️ Usage Guide

-Login/Register via Firebase Auth
-Navigate to your role-specific dashboard
-Admin: Manage employees, assign HR, adjust payroll
-HR: Track employee progress, process salaries
-Employee: Submit daily reports, view salary history
-Visitor: Use the Contact Us page for inquiries

📄 License
-This project is licensed under the MIT License.
-See the LICENSE file for details.
