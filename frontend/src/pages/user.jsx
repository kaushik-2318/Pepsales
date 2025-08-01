import { UserNotificationsTable } from "../components/user-notifications-table";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">All Notifications</h1>
      </div>
      <UserNotificationsTable />
    </div>
  );
}
