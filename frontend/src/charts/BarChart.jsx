import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function BarChart({ expenses }) {

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
        label: "Amount",

        data: Object.values(categoryTotals),

        backgroundColor: "#0d6efd",
      },
    ],
  };

  return (
    <div className="card mt-4">

      <div className="card-body">

        <h4>Expense Bar Chart</h4>

        <Bar data={data} />

      </div>

    </div>
  );
}

export default BarChart;