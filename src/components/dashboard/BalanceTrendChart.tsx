import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { balanceTrendData } from "@/data/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const BalanceTrendChart = () => {
  return (
    <Card className="animate-fade-in border-border/50" style={{ animationDelay: "200ms" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-heading">Balance Trend</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={balanceTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 15%, 90%)",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Balance"]}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="hsl(220, 70%, 50%)"
                strokeWidth={2.5}
                fill="url(#balanceGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceTrendChart;
