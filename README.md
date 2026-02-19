# CommerceCore

A full-featured e-commerce admin dashboard built with React. Manage products, orders, and customers from a clean, responsive interface.

🔗 **[Live Demo]((https://commerce-core-mu.vercel.app/))** &nbsp;|&nbsp; ⭐ Star this repo if you find it useful!

---

## Screenshots

><img width="1366" height="768" alt="Screenshot (62)" src="https://github.com/user-attachments/assets/65fe5832-f40c-4844-9143-cb3c1f5dd3c3" />

 <img width="1366" height="768" alt="Screenshot (63)" src="https://github.com/user-attachments/assets/91ed0de4-46cc-4024-ba3c-55dfec5e00cc" />
<img width="1366" height="768" alt="Screenshot (64)" src="https://github.com/user-attachments/assets/3facdc18-a17f-441a-8e92-3e040211250d" />

<img width="1366" height="768" alt="Screenshot (65)" src="https://github.com/user-attachments/assets/ae61d389-38ce-429d-a5a1-e0ec5c580ddf" />
<img width="1366" height="768" alt="Screenshot (66)" src="https://github.com/user-attachments/assets/52f03eea-4e2b-4caf-8961-107102326f6d" />

---

## Features

- **Authentication** — Mock login with protected routes. Session persists via localStorage.
- **Dashboard** — Revenue overview with an interactive line chart and animated KPI cards.
- **Products** — Full CRUD: add, edit, delete products. Search, filter by stock, sort by price, paginated table.
- **Orders** — Track order status (Processing → Shipped → Delivered → Cancelled). Search, filter, sort, and update status inline.
- **Customers** — Browse customers by status (Active / VIP / Inactive). Add new customers, view profiles, update status.
- **404 Page** — Graceful fallback for unknown routes.
- **Responsive** — Works across desktop and tablet screen sizes.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| React Router v7 | Client-side routing |
| Tailwind CSS v4 | Styling |
| Recharts | Revenue chart |
| Framer Motion | Card animations |
| Vite | Build tool |

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/commercecore.git
cd commercecore

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Demo credentials:**
```
Email:    admin@commerce.com
Password: 1234
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx          # Active link highlighting via NavLink
│   ├── StatsCard.jsx
│   ├── RevenueChart.jsx
│   └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx      # Auth state, login/logout, localStorage
├── data/
│   └── mockData.js
└── pages/
    ├── Login.jsx
    ├── Dashboard.jsx
    ├── Products.jsx
    ├── Orders.jsx
    ├── Customers.jsx
    └── NotFound.jsx
```

---

## Deployment (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Click **Deploy** — no configuration needed

Then update the live demo link at the top of this README.

---

## Author

Arian Tech

Portfolio: your-portfolio.com
GitHub: ariantechzone-stack
LinkedIn: linkedin.com/in/arian-varx-0660b539b
