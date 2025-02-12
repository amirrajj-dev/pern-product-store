# 🛒 PERN Product Store

🚀 Live Demo: [pern-product-store-hlb3.onrender.com](https://pern-product-store-hlb3.onrender.com)

## 📌 Overview
PERN Product Store is a full-stack e-commerce web application built using the **PERN stack** (**PostgreSQL, Express.js, React, and Node.js**). It allows users to browse, add, update, and delete products, providing a smooth shopping experience with secure API access control.

## 🔥 Features
- 🏬 **Product Management** - Create, Read, Update, and Delete (CRUD) operations for products.
- ⚡ **Fast & Scalable** - Uses PostgreSQL with Neon Serverless for database scalability.
- 🛡 **Security & Bot Protection** - Arcjet is implemented for rate limiting and bot detection.
- 🎨 **Modern UI** - Built with React, Tailwind CSS, and DaisyUI for a sleek design.
- 🚀 **Deployed on Render** - Backend and frontend are hosted on **Render** for live access.

---

## 🛠 Tech Stack & Why It’s Used

### 🔙 Backend
| Technology | Description |
|------------|-------------|
| ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) | **Express.js** - A fast, minimalistic web framework for Node.js to build the REST API. |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | **Node.js** - Used as a runtime for handling server-side logic. |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white) | **PostgreSQL** - A powerful relational database for storing product data. |
| ![Neon Database](https://img.shields.io/badge/Neon_DB-0083FC?style=flat&logo=PostgreSQL&logoColor=white) | **Neon Serverless** - A cloud PostgreSQL provider that offers scalable and cost-efficient database hosting. |
| ![Arcjet](https://img.shields.io/badge/Arcjet-0047AB?style=flat) | **Arcjet** - Used for bot detection, rate limiting, and API security. |

### 🔷 Frontend
| Technology | Description |
|------------|-------------|
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white) | **React** - A component-based library for building an interactive and fast UI. |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) | **React Router** - Manages frontend routes for seamless navigation. |
| ![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white) | **Redux Toolkit** - Used for global state management, ensuring efficient data handling. |
| ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | **TailwindCSS** - A utility-first CSS framework for styling the frontend efficiently. |
| ![DaisyUI](https://img.shields.io/badge/DaisyUI-FFDD57?style=flat) | **DaisyUI** - A plugin for Tailwind that provides beautifully pre-designed components. |

---

## 🛠 Installation & Setup
### 📌 Prerequisites
- Install **Node.js** and **npm**
- Ensure you have **PostgreSQL** installed (or use a cloud service like NeonDB)

### 🚀 Backend Setup
```sh
# Clone the repository
git clone https://github.com/your-username/pern-product-store.git
cd pern-product-store

# Install backend dependencies
npm install

# Create a .env file and configure database settings
cp .env.example .env

# Start the backend
tnpm run dev
```

### 💻 Frontend Setup
```sh
cd frontend
npm install

# Start the frontend
tnpm run dev
```

---

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| **GET** | `/api/products` | Get all products |
| **GET** | `/api/products/:id` | Get a single product by ID |
| **POST** | `/api/products` | Create a new product |
| **PUT** | `/api/products/:id` | Update a product by ID |
| **DELETE** | `/api/products/:id` | Delete a product by ID |

---

## 🚀 Deployment
### 🌍 Live Deployment on Render
The project is deployed on **Render**, allowing it to be accessed via [this live link](https://pern-product-store-hlb3.onrender.com).

### 🏗 Build & Deploy Commands
```sh
npm run build    # Build frontend & backend
npm start       # Start production server
```

## The End 🐘🩶

hope you like it my firend🐘🩶
