export type TransactionType = "income" | "expense";

export type Category =
  | "Salary"
  | "Freelance"
  | "Investments"
  | "Food & Dining"
  | "Shopping"
  | "Transportation"
  | "Entertainment"
  | "Utilities"
  | "Healthcare"
  | "Rent"
  | "Travel"
  | "Education";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
}

export type UserRole = "admin" | "viewer";

export interface FilterState {
  search: string;
  type: TransactionType | "all";
  category: Category | "all";
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}
