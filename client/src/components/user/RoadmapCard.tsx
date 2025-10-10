"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Users, 
  Star, 
  Route,
  GitFork,
  Play
} from "lucide-react";
import Link from "next/link";

interface Roadmap {
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
  difficulty: string;
  estimatedDuration: string;
  followersCount: number;
  forksCount: number;
  rating: {
    average: number;
    count: number;
  };
  levels: any[];
  isOfficial: boolean;
}

interface RoadmapCardProps {
  roadmap: Roadmap;
}

export default function RoadmapCard({ roadmap }: RoadmapCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Link href={`/roadmaps/${roadmap._id}`}>
      <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-purple-100 to-blue-100">
          {roadmap.thumbnail ? (
            <img 
              src={roadmap.thumbnail} 
              alt={roadmap.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Route className="w-20 h-20 text-purple-400" />
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex space-x-2">
            <Badge className={getDifficultyColor(roadmap.difficulty)}>
              {roadmap.difficulty}
            </Badge>
            {roadmap.isOfficial && (
              <Badge className="bg-blue-600 text-white">Official</Badge>
            )}
          </div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-purple-600 ml-1" />
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Category */}
          <div className="flex items-center space-x-2 mb-3">
            <div 
              className="w-5 h-5 rounded flex items-center justify-center text-white text-xs"
              style={{ backgroundColor: roadmap.category.color }}
            >
              {roadmap.category.icon}
            </div>
            <span className="text-sm text-muted-foreground">{roadmap.category.name}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {roadmap.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {roadmap.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{roadmap.estimatedDuration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Route className="w-4 h-4 text-purple-500" />
              <span>{roadmap.levels?.length || 0} levels</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-green-500" />
              <span>{roadmap.followersCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{roadmap.rating.average.toFixed(1)}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GitFork className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-muted-foreground">{roadmap.forksCount}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              by {roadmap.creator.username}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}