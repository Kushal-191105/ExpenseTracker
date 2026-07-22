import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function BudgetForm({ refreshBudget }) {
  const [monthlyBudget, setMonthlyBudget] = useState("");

  useEffect(() => {
    getBudget();
  }, []);

  const getBudget = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setMonthlyBudget(res.data.monthlyBudget);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveBudget = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/budget",
        { monthlyBudget },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Budget updated Successfully");

      refreshBudget();
    } catch (error) {
        console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">

        <h3 className="mb-3">Monthly Budget</h3>

        <form onSubmit={saveBudget}>

          <div className="mb-3">

            <input
              type="number"
              className="form-control"
              placeholder="Enter Monthly Budget"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              required
            />

          </div>

          <button
            className="btn btn-success"
            type="submit"
          >
            Save Budget
          </button>

        </form>

      </div>
    </div>
  );
}

export default BudgetForm;