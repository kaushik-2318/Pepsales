import { SendNotificationForm } from "../components/send-notification-form";

export default function SendPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Send Notification</h1>
      </div>
      <SendNotificationForm />
    </div>
  );
}
