import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportPDF = (expenses) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Expense Report", 14, 20);

  const tableColumn = [
    "Title",
    "Category",
    "Amount",
    "Date",
  ];

  const tableRows = [];

  expenses.forEach((expense) => {
    tableRows.push([
      expense.title,
      expense.category,
      `₹ ${expense.amount}`,
      new Date(expense.date).toLocaleDateString(),
    ]);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
  });

  doc.save("Expense_Report.pdf");
};

export default exportPDF;