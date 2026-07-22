# 💰 Expense Tracker

A full-stack Expense Tracker web application that helps users manage their personal finances by tracking income, expenses, monthly budgets, and financial insights through interactive charts.

---

## 🚀 Features

- 📊 Dashboard with Total Income, Total Expenses, Current Balance, and Savings
- ➕ Add Income and Expense Transactions
- ✏️ Edit and Delete Transactions
- 💵 Monthly Budget Management
- 📈 Budget Progress Bar
- 📊 Analytics with Pie Charts and Bar Charts
- 📅 Monthly Expense Analysis
- 🔍 Search and Filter Transactions
- ↕️ Sort Transactions by Date or Amount
- 📄 Export Transactions to PDF
- 🌙 Dark Mode Support
- 🔐 User Authentication (JWT)

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Bootstrap
- Chart.js / Recharts
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- MongoDB
- Mongoose

---

## 📂 Project Structure

```
Expense-Tracker/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Expense-Tracker.git
```

```bash
cd Expense-Tracker
```

---

### 2. Backend Setup

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend

```bash
npm run dev
```

---

### 3. Frontend Setup

Open a new terminal.

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run the frontend

```bash
npm run dev
```

---

## ▶️ Usage

1. Open your browser.
2. Visit:

```
http://localhost:5173
```

3. Register a new account.
4. Login.
5. Add your income and expenses.
6. Set your monthly budget.
7. View charts and analytics.
8. Export your report as a PDF.

---

## 👨‍💻 Author

**Kushal U**

Computer Science and Design Student

