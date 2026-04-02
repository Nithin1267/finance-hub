import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, TransactionType } from "@/types/finance";

const categories: Category[] = [
  "Salary", "Freelance", "Investments", "Food & Dining", "Shopping",
  "Transportation", "Entertainment", "Utilities", "Healthcare", "Rent", "Travel", "Education",
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddTransactionDialog = ({ open, onOpenChange }: Props) => {
  const { addTransaction } = useFinance();
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Food & Dining" as Category,
    type: "expense" as TransactionType,
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = () => {
    if (!form.description || !form.amount) return;
    addTransaction({
      description: form.description,
      amount: parseFloat(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
    });
    setForm({ description: "", amount: "", category: "Food & Dining", type: "expense", date: new Date().toISOString().split("T")[0] });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="font-heading">Add Transaction</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Input value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="e.g., Grocery Store" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Amount</Label>
              <Input type="number" value={form.amount} onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))} placeholder="0.00" />
            </div>
            <div className="space-y-1.5">
              <Label>Date</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm((p) => ({ ...p, type: v as TransactionType }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm((p) => ({ ...p, category: v as Category }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;
