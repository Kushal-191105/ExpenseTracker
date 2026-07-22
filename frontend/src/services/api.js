import axios from "axios";

const API = axios.create({
  baseURL: "https://expensetracker-4f9b.onrender.com/api",
});

export default API;