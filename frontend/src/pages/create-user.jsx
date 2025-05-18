import { useState } from "react";
import { NavLink } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus } from "lucide-react";
import { createUser } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateUserPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      createUser(formData)
        .then((res) => {
          toast.success("User created");
          navigate("/");
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.response.data.error);

          setLoading(false);
        })
        .finally(() => {
          setFormData({
            username: "",
            name: "",
            email: "",
            phone: "",
          });
        });
    } catch (err) {
      toast.error("Error creating user");
      setFormData({
        username: "",
        name: "",
        email: "",
        phone: "",
      });
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Create User</h1>
      </div>
      <Card className="">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>
            Add a new user to the notification system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            id="create-user-form"
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="username">User Name</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter unique username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter user's full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">
                  Include country code for SMS notifications
                </p>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <NavLink to="/">
            <Button variant="outline">Cancel</Button>
          </NavLink>
          <Button
            type="submit"
            form="create-user-form"
            className="relative bg-violet-600 hover:bg-violet-700 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            disabled={loading}
          >
            <span className="relative z-10">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create User
                </>
              )}
            </span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
