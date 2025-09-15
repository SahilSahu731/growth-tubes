"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Users, 
  Star, 
  BookOpen,
  Play
} from "lucide-react";
import Link from "next/link";

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: {
    name: string;
    icon: string;
    color: string;
  };
  creator: {
    username: string;
  };
  pricing: {
    type: string;
    amount: number;
  };
  enrollmentCount: number;
  rating: {
    average: number;
    count: number;
  };
  totalDuration: number;
  totalResources: number;
  skillLevel: string;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const getPriceDisplay = () => {
    if (course.pricing.type === 'free') return 'Free';
    if (course.pricing.type === 'freemium') return 'Freemium';
    return `$${course.pricing.amount}`;
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Link href={`/courses/${course._id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
          {course.thumbnail ? (
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-gray-400" />
            </div>
          )}
          
          {/* Price Badge */}
          <Badge className="absolute top-3 left-3 bg-white text-gray-900 font-semibold">
            {getPriceDisplay()}
          </Badge>
          
          {/* Skill Level */}
          <Badge className={`absolute top-3 right-3 ${getSkillLevelColor(course.skillLevel)}`}>
            {course.skillLevel}
          </Badge>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-blue-600 ml-1" />
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Category */}
          <div className="flex items-center space-x-2 mb-3">
            <div 
              className="w-5 h-5 rounded flex items-center justify-center text-white text-xs"
              style={{ backgroundColor: course.category.color }}
            >
              {course.category.icon}
            </div>
            <span className="text-sm text-muted-foreground">{course.category.name}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {course.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{course.totalDuration}h</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-purple-500" />
              <span>{course.totalResources} resources</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-green-500" />
              <span>{course.enrollmentCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{course.rating.average.toFixed(1)}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              by {course.creator.username}
            </span>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Start Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}