import { useState, useEffect } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function ExpenseForm({
  refreshExpenses,
  editingExpense,
  setEditingExpense,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date.split("T")[0]);
    } else {
      clearForm();
    }
  }, [editingExpense]);

  const clearForm = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      if (editingExpense) {
        await API.put(
          `/expenses/${editingExpense._id}`,
          {
            title,
            amount,
            category,
            date,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Expense Updated Successfully");
      } else {
        await API.post(
          "/expenses",
          {
            title,
            amount,
            category,
            date,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Expense Added Successfully");
      }

      clearForm();
      setEditingExpense(null);
      refreshExpenses();

    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">

        <h3 className="mb-4">
          {editingExpense ? "Edit Expense" : "Add Expense"}
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">
              Title
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Expense Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Amount
            </label>

            <input
              type="number"
              className="form-control"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Category
            </label>

            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option>Food</option>
              <option>Travel</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Entertainment</option>
              <option>Health</option>
              <option>Education</option>
              <option>Others</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Date
            </label>

            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <button
            className="btn btn-success"
            type="submit"
          >
            {editingExpense ? "Update Expense" : "Add Expense"}
          </button>

          {editingExpense && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                clearForm();
                setEditingExpense(null);
              }}
            >
              Cancel
            </button>
          )}

        </form>

      </div>
    </div>
  );
}

export default ExpenseForm;