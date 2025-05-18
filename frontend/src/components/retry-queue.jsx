import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { RefreshCw } from "lucide-react";

export function RetryQueue() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Retry Queue</CardTitle>
          <CardDescription>
            Failed notifications waiting to be retried
          </CardDescription>
        </div>
        <Button variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {retryItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant={getBadgeVariant(item.type)}>
                    {item.type}
                  </Badge>
                  <span className="text-sm font-medium">{item.recipient}</span>
                </div>
                <p className="text-xs text-muted-foreground">{item.error}</p>
              </div>
              <Button size="sm" variant="secondary">
                Retry
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function getBadgeVariant(type) {
  switch (type) {
    case "Email":
      return "purple";
    case "SMS":
      return "default";
    case "In-App":
      return "green";
    default:
      return "secondary";
  }
}

const retryItems = [
  {
    recipient: "user123@example.com",
    type: "Email",
    error: "SMTP connection timeout",
  },
  {
    recipient: "+1234567890",
    type: "SMS",
    error: "Invalid phone number format",
  },
  {
    recipient: "user456",
    type: "In-App",
    error: "User not found",
  },
  {
    recipient: "user789@example.com",
    type: "Email",
    error: "Mailbox full",
  },
];
