"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Route } from "lucide-react";
import RoadmapCard from "./RoadmapCard";
import { useRoadmapStore } from "@/store/roadmapStore";
import { useCategoryStore } from "@/store/categoryStore";

export default function RoadmapGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { roadmaps, isLoading, fetchRoadmaps } = useRoadmapStore();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchRoadmaps();
    fetchCategories();
  }, []);

  const filteredRoadmaps = roadmaps
    .filter(roadmap => roadmap.status === 'published')
    .filter(roadmap => {
      const matchesSearch = roadmap.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           roadmap.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || roadmap.category?._id === categoryFilter;
      const matchesDifficulty = difficultyFilter === "all" || roadmap.difficulty === difficultyFilter;
      return matchesSearch && matchesCategory && matchesDifficulty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "popular": return (b.followersCount || 0) - (a.followersCount || 0);
        case "rating": return (b.rating?.average || 0) - (a.rating?.average || 0);
        case "title": return (a.title || '').localeCompare(b.title || '');
        default: return 0;
      }
    });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search roadmaps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.icon} {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="title">A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {filteredRoadmaps.length} roadmaps
        </p>
        
        {/* Quick Filters */}
        <div className="flex space-x-2">
          <Badge 
            variant={difficultyFilter === "beginner" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setDifficultyFilter(difficultyFilter === "beginner" ? "all" : "beginner")}
          >
            Beginner
          </Badge>
          <Badge 
            variant={difficultyFilter === "intermediate" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setDifficultyFilter(difficultyFilter === "intermediate" ? "all" : "intermediate")}
          >
            Intermediate
          </Badge>
          <Badge 
            variant={difficultyFilter === "advanced" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setDifficultyFilter(difficultyFilter === "advanced" ? "all" : "advanced")}
          >
            Advanced
          </Badge>
        </div>
      </div>

      {/* Roadmaps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRoadmaps.map((roadmap) => (
          <RoadmapCard key={roadmap._id} roadmap={roadmap} />
        ))}
      </div>

      {filteredRoadmaps.length === 0 && (
        <div className="text-center py-16">
          <Route className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold mb-2">No roadmaps found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm || categoryFilter !== "all" || difficultyFilter !== "all"
              ? "Try adjusting your filters to find more roadmaps"
              : "No roadmaps available yet"
            }
          </p>
        </div>
      )}
    </div>
  );
}