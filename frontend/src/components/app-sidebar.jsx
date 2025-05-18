import { BarChart3, Send, UserPlus, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function AppSidebar() {
  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex items-center px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Menu</span>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
          <div className="flex w-full min-w-0 flex-col gap-1">
            <NavLink to="/">
              <div className="relative flex gap-3 hover:bg-gray-100 p-4 rounded-2xl duration-200">
                <BarChart3 className="h-5 w-5" />
                <span>Dashboard</span>
              </div>
            </NavLink>
            <NavLink to="/create">
              <div className="relative flex gap-3  hover:bg-gray-100 p-4 rounded-2xl duration-200">
                <UserPlus className="h-5 w-5" />
                <span>Create User</span>
              </div>
            </NavLink>
            <NavLink to="/send">
              <div className="relative flex gap-3 hover:bg-gray-100 p-4 rounded-2xl duration-200">
                <Send className="h-5 w-5" />
                <span>Send Notification</span>
              </div>
            </NavLink>
            <NavLink to="/users">
              <div className="relative flex gap-3 hover:bg-gray-100 p-4 rounded-2xl duration-200">
                <Users className="h-5 w-5" />
                <span>All Notifications</span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
