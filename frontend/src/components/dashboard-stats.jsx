import { BellRing, Mail, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getNotifications } from "../api";

export function DashboardStats() {
  const [notificationCount, setNotificationCount] = useState({
    emailNotification: 0,
    inAppNotification: 0,
    smsNotification: 0,
    totalNotification: 0,
  });

  useEffect(() => {
    getNotifications()
      .then((data) => {
        setNotificationCount(data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, []);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-medium">Total Sent</CardTitle>
          <div className="p-3 rounded-full bg-blue-100">
            <BellRing className="h-6 w-6 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {notificationCount.totalNotification}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-medium">Email</CardTitle>
          <div className="p-3 rounded-full bg-blue-100">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {notificationCount.emailNotification}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-medium">SMS</CardTitle>
          <div className="p-3 rounded-full bg-green-100">
            <MessageSquare className="h-6 w-6 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {notificationCount.smsNotification}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-medium">In-App</CardTitle>
          <div className="p-3 rounded-full bg-orange-100">
            <BellRing className="h-6 w-6 text-orange-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {notificationCount.inAppNotification}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
