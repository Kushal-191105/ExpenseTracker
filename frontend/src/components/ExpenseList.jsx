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
    <div className="card shadow-sm">
      <div className="card-body">

        <h3 className="mb-3">Expense History</h3>

        {expenses.length === 0 ? (
          <div className="alert alert-info">
            No expenses found.
          </div>
        ) : (
          <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

              <thead className="table-dark">

                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {expenses.map((expense, index) => (

                  <tr key={expense._id}>

                    <td>{index + 1}</td>

                    <td>{expense.title}</td>

                    <td>₹ {expense.amount}</td>

                    <td>{expense.category}</td>

                    <td>
                      {new Date(expense.date).toLocaleDateString()}
                    </td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          setEditingExpense(expense)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          deleteExpense(expense._id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
}

export default ExpenseList;