| ![Home Page](https://i.ibb.co/DfmqFFx3/work-nest-client-web-app-4-1.png) |

---

# 🚀 WorkNest — Employee Management Dashboard (Client)

**WorkNest** is a sleek, modern **employee management system** that streamlines daily workflows through role-based dashboards, intuitive work tracking, and integrated payroll — now with full **Tailwind CSS dark mode** support for enhanced accessibility and user comfort.

This is the **client-side** built with **React 19**, powered by a modular stack including **Tailwind**, **Framer Motion**, **Firebase**, and **Stripe**.

---

## 🌐 Live Demo

🔗 [Visit Live Site](https://work-nest-client.web.app)

---

## ✨ Features

- 🔐 **Secure Authentication** with Firebase & JWT
- 🧑‍💼 **Role-Based Dashboards**: Admin, HR, Employee
- 📈 **Real-Time Work Tracking** for daily task reports
- 💸 **Integrated Stripe Payments** for salary disbursement
- 🛠 **Admin Controls** for managing users and payroll
- 📅 **Worksheet Submissions** with editable history
- 🌗 **Full Dark Mode** using `dark:` Tailwind variants
- 🎨 **Theme-Based Design** (primary, accent, text, btn)
- 🎬 **Framer Motion** for UI animation
- 🔄 **React Query (TanStack)** for optimized data fetching
- 📬 **Public Contact Page** for visitors

---

## 🧰 Tech Stack

### ⚛️ Frontend

| Tech                     | Purpose                        |
|--------------------------|---------------------------------|
| **React 19**             | Component-based UI              |
| **Vite**                 | Lightning-fast dev/build tool   |
| **React Router v7**      | Declarative routing             |

---

### 🎨 UI/UX & Styling

| Tech                     | Purpose                        |
|--------------------------|---------------------------------|
| **Tailwind CSS**         | Utility-first styling framework |
| **Framer Motion**        | Animations & transitions        |
| **Lucide React**         | Beautiful SVG icons             |
| **React Icons**          | Popular icon sets               |
| **SweetAlert2**          | Alert/confirmation modals       |
| **React Toastify**       | Toast notifications             |
| **Swiper**               | Slider components               |

---

### 📅 Forms & Tables

| Tech                             | Purpose                       |
|----------------------------------|--------------------------------|
| **React Hook Form**              | Easy form management           |
| **TanStack Table v8**            | Customizable table rendering   |
| **Prop Types**                   | Component prop validation      |
| **React Datepicker**             | Date selection input           |

---

### 🔌 Data & State

| Tech                         | Purpose                          |
|------------------------------|-----------------------------------|
| **Axios**                    | HTTP requests                     |
| **React Query (TanStack v5)**| API caching, sync, pagination     |

---

### 🔐 Auth, SEO & Storage

| Tech               | Purpose                          |
|--------------------|-----------------------------------|
| **Firebase v11**   | Auth, storage, real-time DB       |
| **JWT**            | Secure token-based roles          |
| **React Helmet**   | Dynamic meta & SEO management     |

---

### 💳 Payments

| Tech                         | Purpose               |
|------------------------------|------------------------|
| **@stripe/react-stripe-js** | Secure salary payments |

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/Md-Sufian-Jidan/work-nest-client.git
cd work-nest-client

# Install dependencies
npm install

# Create your .env file
cp .env.example .env

VITE_API_BASE_URL=https://your-backend-api.com
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

npm run dev

📬 Contact
For business inquiries, collaborations, or support:
Email: jidanjiyaj03@gmail.com
LinkedIn: https://www.linkedin.com/in/md-abu-sufian-jidan/