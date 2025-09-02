// components/sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  User,
  Book,
  FileQuestion,
  History,
  Settings,
  LogOut,
  MenuIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileToggle?: () => void;
}

export function Sidebar({ isMobileOpen = false, onMobileToggle }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/user" },
    { name: "Profile", icon: User, href: "/user/profile" },
    { name: "Learning", icon: Book, href: "/user/learning" },
    { name: "Quizzes", icon: FileQuestion, href: "/user/quizzes" },
    { name: "History", icon: History, href: "/user/history" },
  ];

  const bottomNavItems = [
    { name: "Settings", icon: Settings, href: "/user/settings" },
    { name: "More", icon: MenuIcon, href: "/user/more" },
  ];

  // Close mobile menu when clicking outside or pressing escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen && onMobileToggle) {
        onMobileToggle();
      }
    };

    if (isMobileOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen, onMobileToggle]);

  const handleLinkClick = () => {
    // Close mobile menu when a link is clicked
    if (onMobileToggle && isMobileOpen) {
      onMobileToggle();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onMobileToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "flex flex-col h-screen transition-all duration-300 ease-in-out border-r-2 bg-background z-50",
          // Desktop styles
          "hidden md:flex",
          isCollapsed ? "md:w-20" : "md:w-64",
          // Mobile styles
          "md:relative fixed inset-y-0 left-0",
          isMobileOpen
            ? "flex w-64 translate-x-0"
            : "md:flex -translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <Link 
              href="/" 
              className={cn(
                "flex items-center transition-all duration-300",
                isCollapsed ? "md:space-x-0" : "space-x-3"
              )}
              onClick={handleLinkClick}
            >
              <Image
                src="/logo.svg"
                alt="Growth Tubes Logo"
                width={32}
                height={32}
                className="h-8 w-8 flex-shrink-0"
              />
              <h1 
                className={cn(
                  "text-lg font-bold transition-opacity duration-300",
                  isCollapsed ? "md:opacity-0 md:w-0 md:overflow-hidden" : "opacity-100"
                )}
              >
                Growth Tubes
              </h1>
            </Link>
          </div>
          
          {/* Desktop collapse button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full flex-shrink-0 hidden md:flex"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronsRight className="h-5 w-5" />
            ) : (
              <ChevronsLeft className="h-5 w-5" />
            )}
          </Button>

          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full flex-shrink-0 md:hidden"
            onClick={onMobileToggle}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center p-2 hover:bg-muted transition-all duration-200 group",
                  isCollapsed 
                    ? "md:justify-center md:rounded-full md:w-10 md:h-10 md:mx-auto space-x-3 rounded-md" 
                    : "space-x-3 rounded-md"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span 
                  className={cn(
                    "text-sm transition-opacity duration-300",
                    isCollapsed ? "md:opacity-0 md:w-0 md:overflow-hidden" : "opacity-100"
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
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center p-2 hover:bg-muted transition-all duration-200 group",
                  isCollapsed 
                    ? "md:justify-center md:rounded-full md:w-10 md:h-10 md:mx-auto space-x-3 rounded-md" 
                    : "space-x-3 rounded-md"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span 
                  className={cn(
                    "text-sm transition-opacity duration-300",
                    isCollapsed ? "md:opacity-0 md:w-0 md:overflow-hidden" : "opacity-100"
                  )}
                >
                  {item.name}
                </span>
              </Link>
            ))}
            <Button
              variant={"destructive"}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center hover:bg-red-700 transition-all duration-200 mt-2",
                isCollapsed 
                  ? "md:justify-center md:rounded-full md:w-10 md:h-10 md:mx-auto md:p-0 justify-start w-full space-x-3 p-3 rounded-md" 
                  : "justify-start w-full space-x-3 p-3 rounded-md"
              )}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span 
                className={cn(
                  "text-sm transition-opacity duration-300",
                  isCollapsed ? "md:opacity-0 md:w-0 md:overflow-hidden" : "opacity-100"
                )}
              >
                Logout
              </span>
            </Button>
          </nav>
        </div>
      </div>
    </>
  );
}

// Mobile Header Component for triggering the sidebar
export function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 border-b-2 bg-background md:hidden">
      <Link href="/" className="flex items-center space-x-3">
        <Image
          src="/logo.svg"
          alt="Growth Tubes Logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <h1 className="text-lg font-bold">Growth Tubes</h1>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={onMenuClick}
      >
        <MenuIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}