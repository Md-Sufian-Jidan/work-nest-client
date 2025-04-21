# 🚀 WorkNest — Employee Management Platform (Client)

Welcome to **WorkNest**, a modern role-based employee management system designed for seamless collaboration between Employees, HR, and Admins.

This is the **client-side** of the application, built with React 19 and a powerful modern tech stack including Tailwind CSS, Framer Motion, React Query, React Router v7, and more.

---

## 🌐 Live Demo

👉 [Live Preview](https://work-nest-client.web.app/)

---

## 👤 Roles & Permissions

| Role       | Capabilities                                                                 |
|------------|-------------------------------------------------------------------------------|
| **Admin**  | View all employees, assign HR roles, fire users, adjust salaries             |
| **HR**     | View employee work progress, pay salaries, verify employees                  |
| **Employee** | Submit daily work, view salary history                                      |
| **Visitor**  | Submit feedback through contact form                                        |

---

## ✨ Features

- 🔐 Firebase Auth (Email/Password)
- 🧑‍💼 Role-based Dashboards
- 📝 Employee Work Sheets
- 📈 HR Progress Tracker
- 💸 Salary Payments with History
- 📨 Contact Us Form (Public)
- 🧾 Admin Employee Management
- 🎨 Fully Responsive Tailwind UI
- ⚡ Animations with Framer Motion
- 🔄 Data Management via React Query

---

## 📦 Tech Stack

### ⚛️ Frontend

| Tech                     | Use Case                             |
|--------------------------|--------------------------------------|
| **React 19**             | Core UI framework                    |
| **React DOM**            | DOM rendering                        |
| **React Router v7**      | Routing & navigation                 |
| **Vite**                 | Development server & bundler         |

---

### 🎨 UI & UX

| Tech                     | Use Case                             |
|--------------------------|--------------------------------------|
| **Tailwind CSS**         | Utility-first styling                |
| **Framer Motion**        | Animations & transitions             |
| **Lucide React**         | Icon library                         |
| **React Icons**          | Extended icon options                |
| **SweetAlert2**          | Stylish alerts/modals                |
| **Swiper**               | Responsive sliders                   |
| **React Toastify**       | Toast notifications                  |
| **React Datepicker**     | Date inputs                          |

---

### 📊 Forms & Tables

| Tech                             | Use Case                        |
|----------------------------------|---------------------------------|
| **React Hook Form**              | Form control & validation       |
| **TanStack React Table v8**      | Customizable table rendering    |
| **Prop Types**                   | Prop validation                 |

---

### 🔌 Data & State

| Tech                             | Use Case                         |
|----------------------------------|----------------------------------|
| **Axios**                        | API requests                     |
| **TanStack React Query v5**      | Data fetching & caching          |

---

### 🔐 Auth & SEO

| Tech               | Use Case                         |
|--------------------|----------------------------------|
| **Firebase v11**   | Authentication & session storage |
| **React Helmet**   | Dynamic page titles & meta tags  |

---


## 📦 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/Md-Sufian-Jidan/work-nest-client.git

# Go into the project directory
cd work-nest-client

# Install dependencies
npm install

# Create your .env file
cp .env.example .env

# Run the development server
npm run dev

VITE_API_BASE_URL=https://your-backend-api.com
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
# ...other Firebase envs

