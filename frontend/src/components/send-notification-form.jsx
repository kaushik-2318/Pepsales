import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Loader2, Send } from "lucide-react";
import { getUser, sendNotification } from "../api";
import { toast } from "react-toastify";

export function SendNotificationForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    phone: "",
    type: "email",
    message: "",
  });

  useEffect(() => {
    const getUsers = async () => {
      const userData = await getUser();
      setUsers(userData);
    };
    getUsers();
  }, []);

  const handleSelectChange = (value, type) => {
    const selectedUser = users.find(
      (user) =>
        user._id === value || user.email === value || user.phone === value
    );

    if (selectedUser) {
      setFormData({
        userId: selectedUser._id,
        email: selectedUser.email,
        phone: selectedUser.phone,
        type: formData.type,
        message: formData.message,
      });
    }
  };

  const handleTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleMessageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      message: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userId || !formData.type || !formData.message) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const response = await sendNotification(formData);
      toast.success("Notification sent");
      // navigate("/");
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "Error sending notification";
      toast.error(errorMsg);
      console.error("Error:", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="w-1/3">
                <Label>User ID</Label>
                <Select
                  value={formData.userId}
                  onValueChange={(value) => handleSelectChange(value, "_id")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select User ID" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user._id} value={user._id}>
                        {user._id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-1/3">
                <Label>Email</Label>
                <Select
                  value={formData.email}
                  onValueChange={(value) => handleSelectChange(value, "email")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Email" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.email} value={user.email}>
                        {user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-1/3">
                <Label>Phone</Label>
                <Select
                  value={formData.phone}
                  onValueChange={(value) => handleSelectChange(value, "phone")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Phone" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.phone} value={user.phone}>
                        {user.phone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Notification Type</Label>
              <Select value={formData.type} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="in-app">In-App</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Message</Label>
              <Textarea
                placeholder="Enter notification message"
                required
                value={formData.message}
                onChange={handleMessageChange}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-violet-600 hover:bg-violet-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Notification
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
