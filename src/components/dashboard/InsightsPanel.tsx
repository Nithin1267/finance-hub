import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertTriangle, BarChart3 } from "lucide-react";

const InsightsPanel = () => {
  const { transactions } = useFinance();

  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const incomes = transactions.filter((t) => t.type === "income");

    // Highest spending category
    const catMap: Record<string, number> = {};
    expenses.forEach((t) => {
      catMap[t.category] = (catMap[t.category] || 0) + t.amount;
    });
    const topCategory = Object.entries(catMap).sort((a, b) => b[1] - a[1])[0];

    // Monthly comparison
    const marchExpenses = expenses.filter((t) => t.date.startsWith("2026-03")).reduce((s, t) => s + t.amount, 0);
    const febExpenses = expenses.filter((t) => t.date.startsWith("2026-02")).reduce((s, t) => s + t.amount, 0);
    const marchIncome = incomes.filter((t) => t.date.startsWith("2026-03")).reduce((s, t) => s + t.amount, 0);
    const febIncome = incomes.filter((t) => t.date.startsWith("2026-02")).reduce((s, t) => s + t.amount, 0);

    const expenseChange = febExpenses > 0 ? ((marchExpenses - febExpenses) / febExpenses) * 100 : 0;
    const incomeChange = febIncome > 0 ? ((marchIncome - febIncome) / febIncome) * 100 : 0;

    // Average transaction
    const avgExpense = expenses.length > 0 ? expenses.reduce((s, t) => s + t.amount, 0) / expenses.length : 0;

    return [
      {
        title: "Top Spending Category",
        value: topCategory ? topCategory[0] : "N/A",
        detail: topCategory ? `$${topCategory[1].toLocaleString()} total` : "",
        icon: BarChart3,
        iconClass: "text-chart-4 bg-chart-4/10",
      },
      {
        title: "Monthly Expenses",
        value: `${expenseChange >= 0 ? "+" : ""}${expenseChange.toFixed(1)}%`,
        detail: "vs last month",
        icon: expenseChange >= 0 ? TrendingUp : TrendingDown,
        iconClass: expenseChange >= 0 ? "text-expense bg-expense/10" : "text-income bg-income/10",
      },
      {
        title: "Monthly Income",
        value: `${incomeChange >= 0 ? "+" : ""}${incomeChange.toFixed(1)}%`,
        detail: "vs last month",
        icon: incomeChange >= 0 ? TrendingUp : TrendingDown,
        iconClass: incomeChange >= 0 ? "text-income bg-income/10" : "text-expense bg-expense/10",
      },
      {
        title: "Avg. Expense",
        value: `$${avgExpense.toFixed(0)}`,
        detail: `across ${expenses.length} transactions`,
        icon: AlertTriangle,
        iconClass: "text-chart-6 bg-chart-6/10",
      },
    ];
  }, [transactions]);

  return (
    <Card className="animate-fade-in border-border/50" style={{ animationDelay: "440ms" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-heading">Insights</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {insights.map((insight) => (
            <div
              key={insight.title}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
            >
              <div className={`p-2 rounded-lg flex-shrink-0 ${insight.iconClass}`}>
                <insight.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{insight.title}</p>
                <p className="text-lg font-heading font-semibold">{insight.value}</p>
                <p className="text-xs text-muted-foreground">{insight.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsPanel;
