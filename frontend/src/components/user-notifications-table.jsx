import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { getAllNotification } from "../api";
import { useEffect, useState } from "react";

export function UserNotificationsTable() {
  const [notifications, setNotifications] = useState([
    {
      status: "",
      userId: "",
      type: "",
      message: "",
      createdAt: "",
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getAllNotification();
        setNotifications(res);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        toast.error("Failed to fetch notifications");
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>All Notifications</CardTitle>
            <CardDescription>
              Showing notifications for all users
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-xs font-medium text-muted-foreground">
                <th className="pb-3 pl-10">Status</th>
                <th className="pb-3 pl-10">User ID</th>
                <th className="pb-3 pl-10">Type</th>
                <th className="pb-3 pl-10">Subject</th>
                <th className="pb-3 pl-10">Sent At</th>
              </tr>
            </thead>
            <tbody className="h-96 overflow-y-scroll">
              {notifications.map((notification, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-3 pl-10 ">
                    {getStatusIcon(notification.status)}
                  </td>
                  <td className="py-3 pl-10 font-medium">
                    {notification.userId}
                  </td>
                  <td className="py-3 pl-10">
                    <Badge
                      variant={"outline"}
                      className={`bg-${getBadgeVariant(
                        notification.type
                      )}-500 outline-none border-none`}
                    >
                      {notification.type}
                    </Badge>
                  </td>
                  <td className="max-w-[300px] truncate py-3 pl-10">
                    {notification.message}
                  </td>
                  <td className="py-3 pl-10 ">{notification.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function getStatusIcon(status) {
  switch (status) {
    case "sent":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "failed":
      return <XCircle className="h-5 w-5 text-red-500" />;
    case "pending":
      return <Clock className="h-5 w-5 text-yellow-500" />;
    default:
      return null;
  }
}

function getBadgeVariant(type) {
  switch (type) {
    case "email":
      return "purple";
    case "sms":
      return "yellow";
    case "in-app":
      return "green";
    default:
      return "";
  }
}
