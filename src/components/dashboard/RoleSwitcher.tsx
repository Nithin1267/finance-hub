import { useFinance } from "@/context/FinanceContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Eye } from "lucide-react";
import { UserRole } from "@/types/finance";

const RoleSwitcher = () => {
  const { role, setRole } = useFinance();

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {role === "admin" ? <Shield className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        <span className="hidden sm:inline">Role:</span>
      </div>
      <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
        <SelectTrigger className="w-[110px] h-8 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleSwitcher;
