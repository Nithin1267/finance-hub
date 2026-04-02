import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowUpDown, Plus, Pencil, Trash2 } from "lucide-react";
import { Category, TransactionType } from "@/types/finance";
import AddTransactionDialog from "./AddTransactionDialog";

const categories: Category[] = [
  "Salary", "Freelance", "Investments", "Food & Dining", "Shopping",
  "Transportation", "Entertainment", "Utilities", "Healthcare", "Rent", "Travel", "Education",
];

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const TransactionsTable = () => {
  const { filteredTransactions, filters, setFilters, role, deleteTransaction } = useFinance();
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleSort = (field: "date" | "amount") => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === "desc" ? "asc" : "desc",
    }));
  };

  return (
    <>
      <Card className="animate-fade-in border-border/50" style={{ animationDelay: "360ms" }}>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base font-heading">Transactions</CardTitle>
            {role === "admin" && (
              <Button size="sm" onClick={() => setDialogOpen(true)} className="gap-1.5">
                <Plus className="h-4 w-4" />
                Add Transaction
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={filters.search}
                onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                className="pl-9 h-9"
              />
            </div>
            <Select
              value={filters.type}
              onValueChange={(v) => setFilters((p) => ({ ...p, type: v as TransactionType | "all" }))}
            >
              <SelectTrigger className="w-full sm:w-[140px] h-9">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.category}
              onValueChange={(v) => setFilters((p) => ({ ...p, category: v as Category | "all" }))}
            >
              <SelectTrigger className="w-full sm:w-[160px] h-9">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-border/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/50">
                  <th
                    className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer select-none"
                    onClick={() => toggleSort("date")}
                  >
                    <span className="inline-flex items-center gap-1">
                      Date <ArrowUpDown className="h-3 w-3" />
                    </span>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                  <th
                    className="text-right py-3 px-4 font-medium text-muted-foreground cursor-pointer select-none"
                    onClick={() => toggleSort("amount")}
                  >
                    <span className="inline-flex items-center gap-1 justify-end">
                      Amount <ArrowUpDown className="h-3 w-3" />
                    </span>
                  </th>
                  {role === "admin" && (
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={role === "admin" ? 6 : 5} className="text-center py-12 text-muted-foreground">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </td>
                      <td className="py-3 px-4 font-medium">{tx.description}</td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <Badge variant="secondary" className="text-xs font-normal">
                          {tx.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={
                            tx.type === "income"
                              ? "text-income border-income/30 bg-income/5"
                              : "text-expense border-expense/30 bg-expense/5"
                          }
                        >
                          {tx.type}
                        </Badge>
                      </td>
                      <td className={`py-3 px-4 text-right font-medium ${tx.type === "income" ? "text-income" : "text-expense"}`}>
                        {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                      </td>
                      {role === "admin" && (
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            onClick={() => deleteTransaction(tx.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <AddTransactionDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
};

export default TransactionsTable;
