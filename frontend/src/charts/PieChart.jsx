import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PieChart({ expenses }) {

  const categoryTotals = {};

  expenses.forEach((expense) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += Number(expense.amount);
    } else {
      categoryTotals[expense.category] = Number(expense.amount);
    }
  });

  const data = {
    labels: Object.keys(categoryTotals),

    datasets: [
      {
        label: "Expenses",

        data: Object.values(categoryTotals),

        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#ffc107",
          "#dc3545",
          "#6f42c1",
          "#fd7e14",
          "#20c997",
        ],

        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="card mt-4">

      <div className="card-body">

        <h4>Expense Category Chart</h4>

        <Pie data={data} />

      </div>

    </div>
  );
}

export default PieChart;