"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Home,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Toggle this to see logged in/out states
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);

  const navigation = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GT</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Growth Tube
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-gray-600 font-medium transition-colors hover:text-gray-900
                           after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900
                           after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side - Login/Signup */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Button variant="outline" className="text-sm">
                  Log out
                </Button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
                >
                  Sign in
                </Link>
                <Button asChild>
                  <Link href="/signup">Get started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6 flex flex-col">
              <SheetHeader className="mb-8">
                <SheetTitle>
                  <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">GT</span>
                    </div>
                    <span className="ml-2 text-xl font-semibold text-gray-900">
                      Growth Tube
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Navigation */}
              <div className="flex flex-col space-y-4 flex-grow">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-lg font-medium text-gray-600 hover:text-blue-600 rounded-md transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* Mobile User Profile/Auth Section */}
              {isLoggedIn ? (
                <div className="border-t border-gray-200 pt-6 space-y-2">
                  <div className="flex items-center space-x-4 mb-4">
                    <User className="w-6 h-6 text-gray-600" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">John Doe</p>
                      <p className="text-xs text-gray-500">john@example.com</p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <LayoutDashboard className="w-5 h-5 mr-2" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { /* handle logout */ setIsMobileMenuOpen(false); }}
                    className="w-full text-left flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Log out
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-6 space-y-2">
                  <Button asChild className="w-full">
                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      Get started
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign in
                    </Link>
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}