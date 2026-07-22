import API from "../services/api";

function ExpenseList({
  expenses,
  refreshExpenses,
  setEditingExpense,
}) {
  const deleteExpense = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Expense Deleted Successfully");

      refreshExpenses();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div>
      <h2>Your Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        expenses.map((expense) => (
          <div
            key={expense._id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{expense.title}</h3>

            <p>Amount: ₹{expense.amount}</p>

            <p>Category: {expense.category}</p>

            <p>
              Date:{" "}
              {new Date(expense.date).toLocaleDateString()}
            </p>

            <button
              onClick={() => setEditingExpense(expense)}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>

            <button
              onClick={() => deleteExpense(expense._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;