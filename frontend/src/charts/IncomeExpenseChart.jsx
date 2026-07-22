import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function IncomeExpenseChart({ income, expenses }) {
  const totalIncome = income.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const data = {
    labels: ["Finance Overview"],

    datasets: [
      {
        label: "Income",
        data: [totalIncome],
        backgroundColor: "rgba(40,167,69,0.7)",
      },
      {
        label: "Expense",
        data: [totalExpense],
        backgroundColor: "rgba(220,53,69,0.7)",
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income vs Expense",
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default IncomeExpenseChart;