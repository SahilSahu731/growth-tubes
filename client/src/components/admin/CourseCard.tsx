"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  Clock, 
  Star, 
  BookOpen,
  DollarSign,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

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
  status: string;
  totalDuration: number;
  totalResources: number;
  createdAt: string;
}

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
  onToggleStatus: (id: string, status: string) => void;
}

export default function CourseCard({ course, onEdit, onDelete, onToggleStatus }: CourseCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriceDisplay = () => {
    if (course.pricing.type === 'free') return 'Free';
    if (course.pricing.type === 'freemium') return 'Freemium';
    return `$${course.pricing.amount}`;
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
        {course.thumbnail ? (
          <Image
            width={10}
            height={10}
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        {/* Status Badge */}
        <Badge className={`absolute top-3 left-3 ${getStatusColor(course.status)}`}>
          {course.status}
        </Badge>
        
        {/* Actions Menu */}
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(course)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onToggleStatus(course._id, course.status === 'published' ? 'draft' : 'published')}
              >
                <Eye className="w-4 h-4 mr-2" />
                {course.status === 'published' ? 'Unpublish' : 'Publish'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(course)} className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {course.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div 
                className="w-4 h-4 rounded flex items-center justify-center text-white text-xs"
                style={{ backgroundColor: course.category.color }}
              >
                {course.category.icon}
              </div>
              <span>{course.category.name}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg text-blue-600">{getPriceDisplay()}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Users className="w-4 h-4 text-blue-500" />
            <span>{course.enrollmentCount} enrolled</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-green-500" />
            <span>{course.totalDuration}h</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <BookOpen className="w-4 h-4 text-purple-500" />
            <span>{course.totalResources} resources</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{course.rating.average.toFixed(1)} ({course.rating.count})</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>by {course.creator.username}</span>
          <span>{new Date(course.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}