"use client";

import { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
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
import Link from "next/link";
import axios from "axios";
import { USER_API_ROUTE } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const login = useAuthStore((state) => state.login);


  const handleGoogleSignup = () => {
  window.location.href = `${USER_API_ROUTE}/auth/google`;
};

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${USER_API_ROUTE}/register`, {
        username,
        email,
        password,
      });

      login(
        { 
          _id: response.data._id, 
          username: response.data.username, 
          email: response.data.email 
        }, 
        response.data.token
      );

      // Redirect user to a dashboard or home page
      router.push("/dashboard");

    } catch (err: any) {  // eslint-disable-line
      console.error("Signup error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Create account</h1>
        <p className="text-gray-600 text-lg">Join Growth Tubes today</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-6">
        <div>
          <Label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <FiEye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignup}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-red-50 hover:border-red-300 transition-colors"
          >
            <FaGoogle className="h-4 w-4 text-red-500" />
            Google
          </Button>
          {/* <Button
            type="button"
            variant="outline"
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <FaFacebook className="h-4 w-4 text-blue-600" />
            Facebook
          </Button> */}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-green-600 hover:text-green-500 transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <p className="text-center text-sm text-gray-500">
          By creating an account, you agree to our{' '}
          <Link href="#" className="text-green-600 hover:text-green-500">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="#" className="text-green-600 hover:text-green-500">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}