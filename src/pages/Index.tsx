import { FinanceProvider } from "@/context/FinanceContext";
import RoleSwitcher from "@/components/dashboard/RoleSwitcher";
import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceTrendChart from "@/components/dashboard/BalanceTrendChart";
import SpendingBreakdown from "@/components/dashboard/SpendingBreakdown";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import InsightsPanel from "@/components/dashboard/InsightsPanel";
import DarkModeToggle from "@/components/dashboard/DarkModeToggle";
import { LayoutDashboard } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <LayoutDashboard className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-heading font-bold tracking-tight">FinDash</h1>
          </div>
          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <RoleSwitcher />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <SummaryCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BalanceTrendChart />
          <SpendingBreakdown />
        </div>

        <TransactionsTable />

        <InsightsPanel />
      </main>
    </div>
  );
};

const Index = () => (
  <FinanceProvider>
    <Dashboard />
  </FinanceProvider>
);

export default Index;
