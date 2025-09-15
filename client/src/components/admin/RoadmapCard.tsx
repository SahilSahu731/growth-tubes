"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  GitFork, 
  Star,
  Route,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  status: string;
  nodes: any[];
  createdAt: string;
}

interface RoadmapCardProps {
  roadmap: Roadmap;
  onEdit: (roadmap: Roadmap) => void;
  onDelete: (roadmap: Roadmap) => void;
  onToggleStatus: (id: string, status: string) => void;
}

export default function RoadmapCard({ roadmap, onEdit, onDelete, onToggleStatus }: RoadmapCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
      onClick={() => onEdit(roadmap)}
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-purple-50 to-blue-100">
        {roadmap.thumbnail ? (
          <img 
            src={roadmap.thumbnail} 
            alt={roadmap.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Route className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        {/* Status Badge */}
        <Badge className={`absolute top-3 left-3 ${getStatusColor(roadmap.status)}`}>
          {roadmap.status}
        </Badge>
        
        {/* Difficulty Badge */}
        <Badge className={`absolute top-3 right-3 ${getDifficultyColor(roadmap.difficulty)}`}>
          {roadmap.difficulty}
        </Badge>
        
        {/* Actions Menu */}
        <div className="absolute bottom-3 right-3" onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(roadmap); }}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Structure
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => { e.stopPropagation(); onToggleStatus(roadmap._id, roadmap.status === 'published' ? 'draft' : 'published'); }}
              >
                <Eye className="w-4 h-4 mr-2" />
                {roadmap.status === 'published' ? 'Unpublish' : 'Publish'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDelete(roadmap); }} className="text-red-600">
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
            <h3 className="font-bold text-lg mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
              {roadmap.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div 
                className="w-4 h-4 rounded flex items-center justify-center text-white text-xs"
                style={{ backgroundColor: roadmap.category.color }}
              >
                {roadmap.category.icon}
              </div>
              <span>{roadmap.category.name}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-sm text-purple-600">{roadmap.estimatedDuration}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {roadmap.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Users className="w-4 h-4 text-blue-500" />
            <span>{roadmap.followersCount} followers</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <GitFork className="w-4 h-4 text-green-500" />
            <span>{roadmap.forksCount} forks</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Route className="w-4 h-4 text-purple-500" />
            <span>{roadmap.nodes?.length || 0} nodes</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{roadmap.rating.average.toFixed(1)} ({roadmap.rating.count})</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>by {roadmap.creator.username}</span>
          <span>{new Date(roadmap.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}