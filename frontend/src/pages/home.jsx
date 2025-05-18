import { DashboardStats } from "../components/dashboard-stats";
import { RecentNotifications } from "../components/recent-notifications";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <DashboardStats />
      <RecentNotifications />
    </div>
  );
}
