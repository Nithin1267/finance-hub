import { Transaction } from "@/types/finance";

export const mockTransactions: Transaction[] = [
  { id: "1", date: "2026-03-01", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "2", date: "2026-03-02", description: "Grocery Store", amount: 87.50, category: "Food & Dining", type: "expense" },
  { id: "3", date: "2026-03-03", description: "Uber Ride", amount: 24.00, category: "Transportation", type: "expense" },
  { id: "4", date: "2026-03-04", description: "Freelance Project", amount: 1500, category: "Freelance", type: "income" },
  { id: "5", date: "2026-03-05", description: "Netflix Subscription", amount: 15.99, category: "Entertainment", type: "expense" },
  { id: "6", date: "2026-03-06", description: "Electric Bill", amount: 120.00, category: "Utilities", type: "expense" },
  { id: "7", date: "2026-03-07", description: "Online Shopping", amount: 249.99, category: "Shopping", type: "expense" },
  { id: "8", date: "2026-03-08", description: "Dividend Payment", amount: 340, category: "Investments", type: "income" },
  { id: "9", date: "2026-03-10", description: "Restaurant Dinner", amount: 65.00, category: "Food & Dining", type: "expense" },
  { id: "10", date: "2026-03-11", description: "Gym Membership", amount: 50.00, category: "Healthcare", type: "expense" },
  { id: "11", date: "2026-03-12", description: "Rent Payment", amount: 1800.00, category: "Rent", type: "expense" },
  { id: "12", date: "2026-03-13", description: "Coffee Shop", amount: 12.50, category: "Food & Dining", type: "expense" },
  { id: "13", date: "2026-03-15", description: "Book Purchase", amount: 29.99, category: "Education", type: "expense" },
  { id: "14", date: "2026-03-16", description: "Freelance Design Work", amount: 800, category: "Freelance", type: "income" },
  { id: "15", date: "2026-03-18", description: "Gas Station", amount: 55.00, category: "Transportation", type: "expense" },
  { id: "16", date: "2026-03-20", description: "Movie Tickets", amount: 32.00, category: "Entertainment", type: "expense" },
  { id: "17", date: "2026-03-22", description: "Water Bill", amount: 45.00, category: "Utilities", type: "expense" },
  { id: "18", date: "2026-03-23", description: "Weekend Trip", amount: 380.00, category: "Travel", type: "expense" },
  { id: "19", date: "2026-03-25", description: "Online Course", amount: 99.00, category: "Education", type: "expense" },
  { id: "20", date: "2026-03-28", description: "Stock Gains", amount: 620, category: "Investments", type: "income" },
  // February data for monthly comparison
  { id: "21", date: "2026-02-01", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "22", date: "2026-02-03", description: "Groceries", amount: 95.00, category: "Food & Dining", type: "expense" },
  { id: "23", date: "2026-02-05", description: "Rent Payment", amount: 1800.00, category: "Rent", type: "expense" },
  { id: "24", date: "2026-02-08", description: "Freelance Work", amount: 1200, category: "Freelance", type: "income" },
  { id: "25", date: "2026-02-10", description: "Shopping Spree", amount: 450.00, category: "Shopping", type: "expense" },
  { id: "26", date: "2026-02-12", description: "Utilities", amount: 135.00, category: "Utilities", type: "expense" },
  { id: "27", date: "2026-02-15", description: "Dining Out", amount: 78.00, category: "Food & Dining", type: "expense" },
  { id: "28", date: "2026-02-18", description: "Investment Return", amount: 450, category: "Investments", type: "income" },
  { id: "29", date: "2026-02-20", description: "Transport", amount: 60.00, category: "Transportation", type: "expense" },
  { id: "30", date: "2026-02-25", description: "Entertainment", amount: 55.00, category: "Entertainment", type: "expense" },
];

export const balanceTrendData = [
  { month: "Oct", balance: 12400 },
  { month: "Nov", balance: 13200 },
  { month: "Dec", balance: 11800 },
  { month: "Jan", balance: 14500 },
  { month: "Feb", balance: 15300 },
  { month: "Mar", balance: 16940 },
];
