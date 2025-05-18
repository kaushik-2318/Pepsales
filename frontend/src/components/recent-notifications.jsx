import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllNotification } from "../api";
import { toast } from "react-toastify";

export function RecentNotifications() {
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
        <CardTitle>Recent Notifications</CardTitle>
        <CardDescription>
          Latest notifications sent through the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8 ">
          <div className="overflow-x-auto ">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-xs font-medium text-muted-foreground">
                  <th className="pb-3 pl-2">Status</th>
                  <th className="pb-3">Recipient</th>
                  <th className="pb-3  ">Type</th>
                </tr>
              </thead>
              <tbody>
                {notifications.slice(0, 6).map((notification, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3 pl-2">
                      {getStatusIcon(notification.status)}
                    </td>
                    <td className="py-3 font-medium">{notification.userId}</td>

                    <td className="py-3">
                      <Badge variant={getBadgeVariant(notification.type)}>
                        {notification.type}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
