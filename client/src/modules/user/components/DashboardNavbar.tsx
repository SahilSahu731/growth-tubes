"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LogOut,
  Menu,
  User,
  Search,
  Bell,
  Settings,
  Award,
  Book
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function DashboardNavbar() {
  const { user, logout, isAdmin } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { title: 'Categories', href: '/categories' },
    { title: 'Roadmaps', href: '/roadmaps' },
    { title: 'Learn', href: '/learn' },
    { title: 'Practice', href: '/practice' },
    { title: 'Quizzes', href: '/quizzes' },
    { title: 'Explore', href: '/explore' },
    { title: 'Manage', href: '/manage' },
  ];

  useEffect(() => {
    console.log(user)
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo & Nav Links */}
        <div className="flex items-center space-x-8">
          <Link href="/dashboard">
            <h1 className="text-xl cursor-pointer font-bold text-white">Growth Tube</h1>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-green-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-400 after:transition-all after:duration-300 hover:after:w-full",
                    isActive ? "text-green-400 after:w-full after:bg-green-400" : "text-gray-300"
                  )}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Search & User Menu */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64 bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="hidden md:flex text-gray-300 hover:text-white hover:bg-gray-800">
            <Bell className="h-5 w-5" />
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-gray-800">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={user?.profilePic} alt="@shadcn" />
                  <AvatarFallback>{user?.username?.[0].toUpperCase() || 'GT'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.username || 'Guest'}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || 'guest@example.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/user/profile" className="flex items-center cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/my-learnings" className="flex items-center cursor-pointer">
                  <Book className="mr-2 h-4 w-4" />
                  My Learnings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/my-badges" className="flex items-center cursor-pointer">
                  <Award className="mr-2 h-4 w-4" />
                  My Badges
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin/categories" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer hover:text-white ">
                <LogOut className="mr-2 h-4 w-4 text-red-500" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-0">
                <div className="flex h-full flex-col bg-black p-4">
                  <div className="mb-6">
                    <h1 className="text-xl font-bold text-white">Growth Tube</h1>
                  </div>
                  <div className="space-y-2">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            isActive
                              ? "bg-gray-800 text-green-400"
                              : "text-gray-300 hover:text-white hover:bg-gray-800"
                          )}
                        >
                          {link.title}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-800">
                    <div className="flex items-center space-x-3 p-2 mb-2 ">
                      <Avatar className="h-9 w-9 cursor-pointer">
                        <AvatarImage src={user?.profilePic || "/avatars/01.png"} alt="@shadcn" />
                        <AvatarFallback> {user?.profilePic ? <AvatarImage src={user?.profilePic} alt={user?.username || 'GT'} /> : <>{user?.username?.[0] || 'GT'}</>}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col text-sm">
                        <span className="font-semibold text-white">{user?.username || 'Guest'}</span>
                        <span className="text-xs text-gray-400">{user?.email || ''}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={() => { logout(); setIsMobileMenuOpen(false); }} 
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}