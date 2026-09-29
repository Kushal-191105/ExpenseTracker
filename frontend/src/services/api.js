import axios from "axios";

const isProduction = import.meta.env.MODE === "production";

const API = axios.create({
  baseURL: isProduction 
    ? "https://expensetracker-4f9b.onrender.com/api" 
    : "http://localhost:5000/api",
});

export default API;