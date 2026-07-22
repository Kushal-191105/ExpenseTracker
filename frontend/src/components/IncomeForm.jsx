import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function IncomeForm({
  refreshIncome,
  editingIncome,
  setEditingIncome,
}) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingIncome) {
      setSource(editingIncome.source);
      setAmount(editingIncome.amount);
      setDate(editingIncome.date.split("T")[0]);
    } else {
      clearForm();
    }
  }, [editingIncome]);

  const clearForm = () => {
    setSource("");
    setAmount("");
    setDate("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (editingIncome) {
        await API.put(
          `/income/${editingIncome._id}`,
          {
            source,
            amount,
            date,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Income Updated Successfully");
      } else {
        await API.post(
          "/income",
          {
            source,
            amount,
            date,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Income Added Successfully");
      }

      clearForm();
      setEditingIncome(null);
      refreshIncome();

    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="card shadow-sm mt-4">

      <div className="card-body">

        <h3 className="mb-4">
          {editingIncome ? "Edit Income" : "Add Income"}
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Income Source
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Salary, Freelancing..."
              value={source}
              onChange={(e) => setSource(e.target.value)}
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
            type="submit"
            className="btn btn-success"
          >
            {editingIncome ? "Update Income" : "Add Income"}
          </button>

          {editingIncome && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                clearForm();
                setEditingIncome(null);
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

export default IncomeForm;