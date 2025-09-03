// components/Sidebar.tsx
"use client";

import { useState } from 'react';
import { useSidebarStore } from '@/store/sidebarStore';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';
import { SidebarNav } from './SidebarNav';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  Heart,
  Briefcase,
  Book,
  Wallet,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Sidebar() {
  const { isCollapsed, toggleCollapse } = useSidebarStore();
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { title: 'Health Hub', icon: Heart, href: '/health' },
    { title: 'Career Command', icon: Briefcase, href: '/career' },
    { title: 'Learning Lab', icon: Book, href: '/learning' },
    { title: 'Financial Fortress', icon: Wallet, href: '/finance' },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <div className="flex h-full max-h-screen flex-col overflow-y-auto bg-white p-4">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Growth Tube</h1>
              </div>
              <SidebarNav isCollapsed={false} links={navLinks} />
              <div className="mt-auto">
                <Separator className="my-4" />
                <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                    <AvatarFallback>{user?.username?.[0] || 'GT'}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-sm">
                    <span className="font-semibold">{user?.username || 'Guest'}</span>
                    <span className="text-xs text-gray-500">{user?.email || ''}</span>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full justify-start mt-2">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 hidden flex-col border-r bg-white p-4 transition-all duration-300 md:flex',
          isCollapsed ? 'w-[72px]' : 'w-[280px]'
        )}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between pb-4">
          {!isCollapsed && <h1 className="text-2xl font-bold text-gray-900">Growth Tube</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="h-9 w-9 text-gray-500 hover:bg-gray-100"
          >
            {isCollapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
          </Button>
        </div>

        {/* Main Navigation Links */}
        <SidebarNav isCollapsed={isCollapsed} links={navLinks} />

        {/* User Profile and Actions at the bottom */}
        <div className="mt-auto">
          <Separator className="my-4" />
          <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="@shadcn" />
              <AvatarFallback>{user?.username?.[0] || 'GT'}</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex flex-col text-sm">
                <span className="font-semibold">{user?.username || 'Guest'}</span>
                <span className="text-xs text-gray-500">{user?.email || ''}</span>
              </div>
            )}
          </div>
          <Button variant="ghost" onClick={logout} className="w-full justify-start mt-2">
            <LogOut className={cn('mr-2 h-4 w-4', isCollapsed && 'mr-0')} />
            {!isCollapsed && 'Logout'}
          </Button>
        </div>
      </aside>
    </>
  );
}