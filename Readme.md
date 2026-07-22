# Expense Tracker

A full-stack web application to help you manage your personal finances, track your expenses, and monitor your monthly budget.

## Features

- **Dashboard:** Overview of total income, total expenses, current balance, and savings.
- **Transactions:** Add, edit, and delete both income and expense records.
- **Budgeting:** Set a monthly budget and track your spending against it with a progress bar.
- **Analytics & Charts:** Visualize your financial data using pie charts and bar charts for category comparisons, and monthly analysis charts.
- **Export to PDF:** Download your filtered expenses as a PDF report.
- **Filtering & Sorting:** Search transactions by title, filter by category or date, and sort by newest/oldest or amount.
- **Dark Mode:** Seamlessly toggle between light and dark themes.

## Tech Stack

- **Frontend:** React, React Router, Bootstrap, Chart.js / Recharts
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (using Mongoose)

## Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB instance (local or Atlas)

### Installation

1. **Clone the repository (or download the source):**
   ```bash
   git clone <your-repo-url>
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` directory and add your environment variables (e.g., `PORT`, `MONGO_URI`, `JWT_SECRET`).
   - Run the development server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```
   - Run the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to the frontend URL (usually `http://localhost:5173` or `http://localhost:3000`).
2. Register a new account or log in with your credentials.
3. Start adding your incomes and expenses to see the dashboard populate with data.

