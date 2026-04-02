import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const SummaryCards = () => {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();

  const cards = [
    {
      title: "Total Balance",
      value: formatCurrency(totalBalance),
      icon: Wallet,
      iconClass: "text-primary bg-primary/10",
    },
    {
      title: "Total Income",
      value: formatCurrency(totalIncome),
      icon: TrendingUp,
      iconClass: "text-income bg-income/10",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(totalExpenses),
      icon: TrendingDown,
      iconClass: "text-expense bg-expense/10",
    },
    {
      title: "Savings Rate",
      value: `${totalIncome > 0 ? ((totalBalance / totalIncome) * 100).toFixed(1) : 0}%`,
      icon: DollarSign,
      iconClass: "text-chart-5 bg-chart-5/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <Card
          key={card.title}
          className="animate-fade-in border-border/50 hover:shadow-md transition-shadow"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">{card.title}</span>
              <div className={`p-2 rounded-lg ${card.iconClass}`}>
                <card.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl font-heading font-bold tracking-tight">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
