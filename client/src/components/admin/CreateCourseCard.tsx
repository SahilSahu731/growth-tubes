"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Zap } from "lucide-react";

interface CreateCourseCardProps {
  onClick: () => void;
}

export default function CreateCourseCard({ onClick }: CreateCourseCardProps) {
  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100"
      onClick={onClick}
    >
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <Plus className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="font-bold text-xl mb-2 text-gray-800">Create New Course</h3>
        <p className="text-gray-600 mb-6">
          Start building your next masterpiece course with levels and resources
        </p>
        
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>Multi-level</span>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="w-4 h-4" />
            <span>Rich content</span>
          </div>
        </div>
        
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}