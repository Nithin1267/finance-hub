import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { Transaction, UserRole, FilterState, Category, TransactionType } from "@/types/finance";
import { mockTransactions } from "@/data/mockData";

interface FinanceContextType {
  transactions: Transaction[];
  role: UserRole;
  setRole: (role: UserRole) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  filteredTransactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  editTransaction: (id: string, tx: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
};

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [role, setRole] = useState<UserRole>("admin");
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    type: "all",
    category: "all",
    sortBy: "date",
    sortOrder: "desc",
  });

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(s) ||
          t.category.toLowerCase().includes(s)
      );
    }
    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }
    if (filters.category !== "all") {
      result = result.filter((t) => t.category === filters.category);
    }

    result.sort((a, b) => {
      const mul = filters.sortOrder === "asc" ? 1 : -1;
      if (filters.sortBy === "date") return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return mul * (a.amount - b.amount);
    });

    return result;
  }, [transactions, filters]);

  const totalIncome = useMemo(
    () => transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const totalExpenses = useMemo(
    () => transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const totalBalance = totalIncome - totalExpenses;

  const addTransaction = useCallback((tx: Omit<Transaction, "id">) => {
    setTransactions((prev) => [{ ...tx, id: crypto.randomUUID() }, ...prev]);
  }, []);

  const editTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        role,
        setRole,
        filters,
        setFilters,
        filteredTransactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
        totalIncome,
        totalExpenses,
        totalBalance,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
