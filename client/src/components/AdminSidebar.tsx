"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard,
  Users,
  BookOpen,
  Map,
  Settings,
  LogOut,
  Shield,
  BarChart3,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: BookOpen, label: 'Categories', href: '/admin/categories' },
    { icon: BookOpen, label: 'Topics', href: '/admin/topics' },
    { icon: Map, label: 'Roadmaps', href: '/admin/roadmaps' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col shadow-xl z-50">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center animate-pulse">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            <p className="text-xs text-gray-400">Growth Tube</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10 ring-2 ring-blue-500">
            <AvatarImage src={user?.profilePic} alt={user?.username} />
            <AvatarFallback className="bg-blue-600 text-white font-semibold">
              {user?.username?.[0]?.toUpperCase() || 'A'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.username}</p>
            <p className="text-xs text-gray-400 truncate">Administrator</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <div 
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-1 group",
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: 'slideInLeft 0.5s ease-out forwards'
                }}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-all duration-300",
                  isActive ? "text-white" : "text-gray-400 group-hover:text-blue-400"
                )} />
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Stats */}
      <div className="px-4 py-4 border-t border-gray-800">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800 p-3 rounded-lg text-center transform hover:scale-105 transition-all duration-300">
            <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Users</p>
            <p className="font-bold text-white">1.2K</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg text-center transform hover:scale-105 transition-all duration-300">
            <BookOpen className="w-4 h-4 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Content</p>
            <p className="font-bold text-white">45</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-400 border-red-800 hover:bg-red-900 hover:text-red-300 transform hover:scale-105 transition-all duration-200"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminSidebar;