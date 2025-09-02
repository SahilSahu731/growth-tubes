// components/admin-sidebar.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  Search,
  Settings,
  FileQuestion,
  LogOut,
  Shield,
  ScissorsSquareIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "All Users", icon: Users, href: "/admin/users" },
    { name: "All Members", icon: UserCheck, href: "/admin/members" },
    { name: "Subjects", icon: BookOpen, href: "/admin/subjects" },
    { name: "Browse", icon: Search, href: "/admin/browse" },
    { name: "Labs", icon: ScissorsSquareIcon, href: "/admin/labs" },
    { name: "Quizzes", icon: FileQuestion, href: "/admin/quizzes" },
  ];

  const bottomNavItems = [
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div
      className={cn(
        "hidden md:flex flex-col h-screen transition-all duration-300 ease-in-out border-r-2 bg-background",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Link 
            href="/admin" 
            className={cn(
              "flex items-center transition-all duration-300",
              isCollapsed ? "space-x-0" : "space-x-3"
            )}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md flex-shrink-0">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 
              className={cn(
                "text-lg font-bold transition-opacity duration-300",
                isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              )}
            >
              Admin Panel
            </h1>
          </Link>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full flex-shrink-0"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronsRight className="h-5 w-5" />
          ) : (
            <ChevronsLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center p-2 hover:bg-muted transition-all duration-200 group",
                isCollapsed 
                  ? "justify-center rounded-full w-10 h-10 mx-auto" 
                  : "space-x-3 rounded-md"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span 
                className={cn(
                  "text-sm transition-opacity duration-300",
                  isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                )}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </ScrollArea>

      <div className="mt-auto p-4 border-t-2">
        <nav className="space-y-2">
          {bottomNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center p-2 hover:bg-muted transition-all duration-200 group",
                isCollapsed 
                  ? "justify-center rounded-full w-10 h-10 mx-auto" 
                  : "space-x-3 rounded-md"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span 
                className={cn(
                  "text-sm transition-opacity duration-300",
                  isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                )}
              >
                {item.name}
              </span>
            </Link>
          ))}
          <Button
            variant={"destructive"}
            className={cn(
              "flex items-center hover:bg-red-700 transition-all duration-200 mt-2",
              isCollapsed 
                ? "justify-center rounded-full w-10 h-10 mx-auto p-0" 
                : "justify-start w-full space-x-3 p-3 rounded-md"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span 
              className={cn(
                "text-sm transition-opacity duration-300",
                isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              )}
            >
              Logout
            </span>
          </Button>
        </nav>
      </div>
    </div>
  );
}