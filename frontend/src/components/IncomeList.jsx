import API from "../services/api";

function IncomeList({
  income,
  refreshIncome,
  setEditingIncome,
}) {
  const deleteIncome = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this income?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/income/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Income Deleted Successfully");

      refreshIncome();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">

        <h3 className="mb-3">Income History</h3>

        {income.length === 0 ? (
          <div className="alert alert-info">
            No income records found.
          </div>
        ) : (
          <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

              <thead className="table-success">

                <tr>
                  <th>#</th>
                  <th>Source</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {income.map((item, index) => (

                  <tr key={item._id}>

                    <td>{index + 1}</td>

                    <td>{item.source}</td>

                    <td>₹ {item.amount}</td>

                    <td>
                      {new Date(item.date).toLocaleDateString()}
                    </td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => setEditingIncome(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteIncome(item._id)}
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

export default IncomeList;