import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import IncomeForm from "../components/IncomeForm";
import IncomeList from "../components/IncomeList";
import BudgetForm from "../components/BudgetForm";

import PieChart from "../charts/PieChart";
import BarChart from "../charts/BarChart";
import MonthlyChart from "../charts/MonthlyChart";
import IncomeExpenseChart from "../charts/IncomeExpenseChart";
import exportPDF from "../utils/exportPDF";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import {
  isToday,
  isThisWeek,
  isThisMonth,
  isThisYear,
} from "date-fns";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const { darkMode, toggleTheme } = useTheme();

  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [budget, setBudget] = useState(0);

  const [editingExpense, setEditingExpense] = useState(null);
  const [editingIncome, setEditingIncome] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [dateFilter, setDateFilter] = useState("All");

  useEffect(() => {
    getExpenses();
    getIncome();
    getBudget();
  }, []);

  const getExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getIncome = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/income", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIncome(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getBudget = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get("/budget", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data) {
      setBudget(res.data.monthlyBudget);
    }
  } catch (error) {
    console.log(error);
  }
};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalIncome = income.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const balance = totalIncome - totalExpense;
  const remainingBudget = budget - totalExpense;

const budgetPercentage =
  budget > 0
    ? Math.min((totalExpense / budget) * 100, 100)
    : 0;

  const filteredExpenses = useMemo(() => {
    let data = [...expenses];

    if (search) {
      data = data.filter((expense) =>
        expense.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      data = data.filter((expense) => expense.category === category);
    }

    if (dateFilter !== "All") {
  data = data.filter((expense) => {
    const expenseDate = new Date(expense.date);

    switch (dateFilter) {
      case "Today":
        return isToday(expenseDate);

      case "This Week":
        return isThisWeek(expenseDate);

      case "This Month":
        return isThisMonth(expenseDate);

      case "This Year":
        return isThisYear(expenseDate);

      default:
        return true;
    }
  });
}



    switch (sortBy) {
      case "Newest":
        data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        break;

      case "Oldest":
        data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        break;

      case "Amount Low":
        data.sort(
          (a, b) => Number(a.amount) - Number(b.amount)
        );
        break;

      case "Amount High":
        data.sort(
          (a, b) => Number(b.amount) - Number(a.amount)
        );
        break;

      default:
        break;
    }

    return data;
  }, [expenses, search, category, sortBy,dateFilter]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar onExport={() => exportPDF(filteredExpenses)} />

      <div className="container my-4">
        <h2>Personal Finance Dashboard</h2>
        <p className="text-muted">
          Welcome, {user?.name}
        </p>

      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <div className="card border-success shadow-sm">
            <div className="card-body text-center">
              <h6>Total Income</h6>
              <h4 className="text-success">
                ₹ {totalIncome}
              </h4>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-danger shadow-sm">
            <div className="card-body text-center">
              <h6>Total Expense</h6>
              <h4 className="text-danger">
                ₹ {totalExpense}
              </h4>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-primary shadow-sm">
            <div className="card-body text-center">
              <h6>Current Balance</h6>
              <h4 className="text-primary">
                ₹ {balance}
              </h4>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-warning shadow-sm">
            <div className="card-body text-center">
              <h6>Savings</h6>
              <h4 className="text-warning">
                ₹ {balance}
              </h4>
            </div>
          </div>
        </div>

      </div>

      <div className="row mb-4">

        <div className="col-md-3">

          <input
            type="text"
            className="form-control"
            placeholder="Search Expense..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="col-md-3">

          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Others</option>
          </select>

        </div>

        <div className="col-md-3">

          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Amount Low</option>
            <option>Amount High</option>
          </select>

        </div>
      <div className="col-md-3">

  <select
    className="form-select"
    value={dateFilter}
    onChange={(e) => setDateFilter(e.target.value)}
  >
    <option>All</option>
    <option>Today</option>
    <option>This Week</option>
    <option>This Month</option>
    <option>This Year</option>
  </select>

</div>  

      </div>
            <div className="row">

        <div className="col-lg-6">
          <ExpenseForm
            refreshExpenses={getExpenses}
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
          />
        </div>

        <div className="col-lg-6">
          <IncomeForm
            refreshIncome={getIncome}
            editingIncome={editingIncome}
            setEditingIncome={setEditingIncome}
          />
        </div>

      </div>
<div className="row mt-4">

  <div className="col-lg-6">
    <BudgetForm refreshBudget={getBudget} />
  </div>

  <div className="col-lg-6">

    <div className="card shadow-sm">

      <div className="card-body">

        <h4 className="mb-3">Monthly Budget</h4>

        <h5>Budget : ₹ {budget}</h5>

        <h5>Spent : ₹ {totalExpense}</h5>

        <h5>Remaining : ₹ {remainingBudget}</h5>

        <div className="progress mt-3" style={{ height: "25px" }}>

          <div
            className={`progress-bar ${
              budgetPercentage > 80
                ? "bg-danger"
                : budgetPercentage > 50
                ? "bg-warning"
                : "bg-success"
            }`}
            role="progressbar"
            style={{ width: `${budgetPercentage}%` }}
          >
            {budgetPercentage.toFixed(0)}%
          </div>

        </div>

      </div>

    </div>

  </div>

</div>

<div className="row mt-4">
  <div className="col-lg-6">
    <ExpenseList
      expenses={filteredExpenses}
      refreshExpenses={getExpenses}
      setEditingExpense={setEditingExpense}
    />
  </div>

  <div className="col-lg-6">
    <IncomeList
      income={income}
      refreshIncome={getIncome}
      setEditingIncome={setEditingIncome}
    />
  </div>
</div>

      <div className="row mt-5">

        <div className="col-lg-6 mb-4">

          <div className="card shadow-sm">
            <div className="card-body">

              <h4 className="mb-3">
                Expense Categories
              </h4>

              {expenses.length > 0 ? (
                <PieChart expenses={expenses} />
              ) : (
                <div className="alert alert-info">
                  No expense data available.
                </div>
              )}

            </div>
          </div>

        </div>

        <div className="col-lg-6 mb-4">

          <div className="card shadow-sm">
            <div className="card-body">

              <h4 className="mb-3">
                Category Comparison
              </h4>

              {expenses.length > 0 ? (
                <BarChart expenses={expenses} />
              ) : (
                <div className="alert alert-info">
                  No expense data available.
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      <div className="row">

        <div className="col-12">

          <div className="card shadow-sm">

            <div className="card-body">

              <h4 className="mb-3">
                Monthly Expense Analysis
              </h4>
{expenses.length > 0 ? (
  <MonthlyChart expenses={expenses} />
) : (
  <div className="alert alert-info">
    No monthly data available.
  </div>
)}

      </div>

    </div>

  </div>

</div>

{/* Income vs Expense Chart */}

<div className="row mt-4">

  <div className="col-12">

    <div className="card shadow-sm">

      <div className="card-body">

        <h4 className="mb-3">
          Income vs Expense
        </h4>

        <IncomeExpenseChart
          income={income}
          expenses={expenses}
        />
        

      </div>

    </div>

  </div>

</div>

      </div>
    </>
  );
}

export default Dashboard;