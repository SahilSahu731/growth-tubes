"use client";

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  BookOpen, 
  Trophy, 
  Settings, 
  LogOut, 
  Bell,
  Heart,
  Calendar,
  BarChart3
} from 'lucide-react';

const ProfileSidebar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();

  const menuItems = [
    { icon: User, label: 'Profile', href: '/profile', active: true },
    { icon: BookOpen, label: 'My Courses', href: '/courses' },
    { icon: Trophy, label: 'Achievements', href: '/achievements' },
    { icon: BarChart3, label: 'Progress', href: '/progress' },
    { icon: Calendar, label: 'Schedule', href: '/schedule' },
    { icon: Heart, label: 'Favorites', href: '/favorites' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="fixed left-0 top-15 w-72 h-sceen bg-white border-r border-green-100 flex flex-col shadow-lg z-40">

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-x-2 ${
                item.active 
                  ? 'bg-green-600 text-white shadow-lg animate-pulse' 
                  : 'text-green-700 hover:bg-green-100 hover:text-green-800'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}>
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

            {/* Streak Card */}
      <div className="p-4 border-b mt-20 border-green-100">
        <Card className="bg-green-100 border-green-300 transform hover:scale-105 transition-transform duration-200">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-green-700">Learning Streak</p>
                <p className="font-bold text-green-800">7 days</p>
              </div>
              <Trophy className="w-6 h-6 text-green-600 animate-bounce" />
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Quick Stats */}
      <div className="px-4 py-4 mt-4 border-t border-green-100">
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-green-100 border-green-300 transform hover:scale-110 transition-all duration-300">
            <CardContent className="p-3 text-center">
              <BookOpen className="w-5 h-5 text-green-600 mx-auto mb-1 animate-pulse" />
              <p className="text-xs text-green-700">Courses</p>
              <p className="font-bold text-green-800">12</p>
            </CardContent>
          </Card>
          <Card className="bg-green-100 border-green-300 transform hover:scale-110 transition-all duration-300">
            <CardContent className="p-3 text-center">
              <Trophy className="w-5 h-5 text-green-600 mx-auto mb-1 animate-pulse" />
              <p className="text-xs text-green-700">Badges</p>
              <p className="font-bold text-green-800">8</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t mt-16 border-green-100">
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50 transform hover:scale-105 transition-all duration-200"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
