"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import { USER_API_ROUTE } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { user, token, login } = useAuthStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState < string | null > (null);
  const [success, setSuccess] = useState < string | null > (null);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setBio(user.bio || "");
    }
  }, [user]);

  const handleUpdate = async (e: React.FormEvent < HTMLFormElement > ) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.put(
        `${USER_API_ROUTE}/profile`, {
          username,
          email,
          bio,
          ...(password && {
            password
          }),
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      login(res.data, res.data.token);
      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div> Loading... </div>;
  }

  return (
    <div className = "container mx-auto p-4" >
      <Card>
        <CardHeader>
          <CardTitle> Your Profile </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.profilePic || "/mike.jpg"} alt={user.username} />
                <AvatarFallback> {user.username[0]} </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold"> {user.username} </h2>
                <p className="text-gray-500"> {user.email} </p>
              </div>
            </div>
            <div className = "grid grid-cols-1 md:grid-cols-2 gap-4" >
              <div>
                <Label htmlFor="username"> Username </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email"> Email </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bio"> Bio </Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password"> New Password (optional) </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500"> {error} </p>}
            {success && <p className="text-green-500"> {success} </p>}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}