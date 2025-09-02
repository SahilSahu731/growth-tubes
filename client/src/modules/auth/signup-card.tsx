"use client";

import { useState } from "react";
import {
  FaGoogle,
  FaGithub,
  FaLinkedinIn,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserCircle,
} from "react-icons/fa";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Link from "next/link";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined
  );

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 p-8 dark:bg-zinc-950">
      <Card className="w-[700px] p-6 shadow-2xl dark:shadow-xl dark:shadow-indigo-500/20 border-gray-200 dark:border-zinc-700">
        <CardHeader className="space-y-2 text-center">
          {/* More space below header */}
          <CardTitle className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">
            Create a new Account
          </CardTitle>
          <CardDescription className="text-base text-gray-600 dark:text-gray-400">
            Join us to start your journey
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-7">
          {" "}
          {/* Increased gap between sections */}
          <div className="grid gap-2">
            <Label
              htmlFor="username"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Username
            </Label>
            <div className="relative">
              <FaUserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <Input
                id="username"
                type="text"
                placeholder="Your name"
                className="h-12 pl-12 pr-4 text-base bg-gray-100 dark:bg-zinc-800 dark:text-gray-50 dark:border-zinc-700 focus:border-indigo-500 dark:focus:border-indigo-500"
              />
            </div>
          </div>
          {/* Email Input */}
          <div className="grid gap-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email
            </Label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <Input
                id="email"
                type="email"
                placeholder="Enter Your Email"
                className="h-12 pl-12 pr-4 text-base bg-gray-100 dark:bg-zinc-800 dark:text-gray-50 dark:border-zinc-700 focus:border-indigo-500 dark:focus:border-indigo-500"
              />
            </div>
          </div>
          {/* Password Input */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Password
              </Label>
            </div>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="h-12 pl-12 pr-12 bg-gray-100 text-base dark:bg-zinc-800 dark:text-gray-50 dark:border-zinc-700 focus:border-indigo-500 dark:focus:border-indigo-500"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-500 hover:bg-transparent dark:text-gray-400 dark:hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FiEyeOff className="h-4 w-4" />
                ) : (
                  <FiEye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-right hover:underline text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
            >
              Forgot Password?
            </a>
          </div>
          {/* Role Selection */}
          <div className="grid gap-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Role
            </Label>
            <ToggleGroup
              type="single"
              value={selectedRole}
              onValueChange={(value) => {
                if (value) setSelectedRole(value);
              }}
              className="grid grid-cols-2 gap-4 w-full h-10" // Ensure ToggleGroup items fill width
            >
              <ToggleGroupItem
                value="student"
                aria-label="Select student role"
                className="flex items-center justify-center gap-3 h-12 rounded-xl border border-gray-300 dark:border-zinc-700 data-[state=on]:bg-indigo-600 data-[state=on]:text-white data-[state=on]:border-indigo-600 dark:data-[state=on]:bg-indigo-700 dark:data-[state=on]:border-indigo-700 transition-all text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 text-base"
              >
                <FaUserGraduate className="h-5 w-5" />
                <span>Student</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="teacher"
                aria-label="Select teacher role"
                className="flex items-center justify-center gap-3 h-12 rounded-xl border border-gray-300 dark:border-zinc-700 data-[state=on]:bg-indigo-600 data-[state=on]:text-white data-[state=on]:border-indigo-600 dark:data-[state=on]:bg-indigo-700 dark:data-[state=on]:border-indigo-700 transition-all text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 text-base"
              >
                <FaChalkboardTeacher className="h-5 w-5" />
                <span>Teacher</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          {/* Login Button */}
          <Button className="w-full h-16 uppercase tracking-widest text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 focus:ring-indigo-500 transition-all rounded-xl">
            Login
          </Button>
          {/* Separator */}
          <div className="relative flex justify-center text-xs uppercase pt-2">
            <Separator className="absolute inset-x-0 top-1/2 -z-10 h-[1px] bg-gray-200 dark:bg-zinc-700" />
            <span className="bg-white px-3 text-gray-500 dark:bg-zinc-950 dark:text-gray-400 font-medium">
              Or continue with
            </span>
          </div>
          {/* OAuth Buttons */}
          <div className="flex items-center justify-center space-x-4 pb-2">
            {" "}
            {/* More padding below buttons */}
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Sign in with Google"
            >
              <FaGoogle className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Sign in with Github"
            >
              <FaGithub className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Sign in with LinkedIn"
            >
              <FaLinkedinIn className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-4 text-sm text-gray-500 dark:text-gray-400">
          {" "}
          {/* More padding above footer */}
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
