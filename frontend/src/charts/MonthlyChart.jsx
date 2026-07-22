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

function MonthlyChart({ expenses }) {
  const monthlyTotals = {};

  expenses.forEach((expense) => {
    const month = new Date(expense.date).toLocaleString("default", {
      month: "short",
    });

    monthlyTotals[month] =
      (monthlyTotals[month] || 0) + Number(expense.amount);
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels: months,

    datasets: [
      {
        label: "Monthly Expenses",

        data: months.map((month) => monthlyTotals[month] || 0),

        backgroundColor: "#198754",
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h4 className="mb-3">Monthly Expense Analytics</h4>

        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default MonthlyChart;