"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Route } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RoadmapCard from "./RoadmapCard";
import RoadmapForm from "./RoadmapForm";
import RoadmapEditor from "./RoadmapEditor";
import { useRoadmapStore } from "@/store/roadmapStore";
import { useCategoryStore } from "@/store/categoryStore";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export default function RoadmapList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState<any>(null);

  const { roadmaps, isLoading, fetchRoadmaps, createRoadmap, updateRoadmap, deleteRoadmap, toggleRoadmapStatus } = useRoadmapStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { token } = useAuthStore();

  useEffect(() => {
    fetchRoadmaps();
    fetchCategories();
  }, []);

  const filteredRoadmaps = roadmaps
    .filter(roadmap => {
      const matchesSearch = roadmap.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           roadmap.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || roadmap.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || roadmap.category?._id === categoryFilter;
      const matchesDifficulty = difficultyFilter === "all" || roadmap.difficulty === difficultyFilter;
      return matchesSearch && matchesStatus && matchesCategory && matchesDifficulty;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleCreate = async (data: any) => {
    try {
      await createRoadmap(data, token!);
      setShowForm(false);
      toast.success('Roadmap created successfully!');
    } catch (error) {
      toast.error('Failed to create roadmap');
    }
  };

  const handleEdit = (roadmap: any) => {
    setEditingRoadmap(roadmap);
    setShowEditor(true);
  };

  const handleUpdate = async (data: any) => {
    if (!editingRoadmap) return;
    
    try {
      await updateRoadmap(editingRoadmap._id, data, token!);
      setShowForm(false);
      setEditingRoadmap(null);
      toast.success('Roadmap updated successfully!');
    } catch (error) {
      toast.error('Failed to update roadmap');
    }
  };

  const handleDelete = async (roadmap: any) => {
    if (!confirm(`Are you sure you want to delete "${roadmap.title}"?`)) return;
    
    try {
      await deleteRoadmap(roadmap._id, token!);
      toast.success('Roadmap deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete roadmap');
    }
  };

  const handleToggleStatus = async (id: string, status: string) => {
    try {
      await toggleRoadmapStatus(id, status, token!);
      toast.success(`Roadmap ${status === 'published' ? 'published' : 'unpublished'} successfully!`);
    } catch (error) {
      toast.error('Failed to update roadmap status');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowEditor(false);
    setEditingRoadmap(null);
  };

  const stats = {
    total: roadmaps.length,
    published: roadmaps.filter(r => r.status === 'published').length,
    draft: roadmaps.filter(r => r.status === 'draft').length,
    official: roadmaps.filter(r => r.isOfficial).length,
  };

  if (showEditor && editingRoadmap) {
    return (
      <RoadmapEditor
        roadmap={editingRoadmap}
        onSave={handleUpdate}
        onBack={handleCancel}
      />
    );
  }

  if (showForm) {
    return (
      <RoadmapForm
        roadmap={editingRoadmap}
        onSubmit={editingRoadmap ? handleUpdate : handleCreate}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Roadmaps</h1>
          <p className="text-muted-foreground">Manage learning roadmaps</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Roadmap
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total Roadmaps</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">{stats.published}</div>
          <div className="text-sm text-muted-foreground">Published</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
          <div className="text-sm text-muted-foreground">Drafts</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">{stats.official}</div>
          <div className="text-sm text-muted-foreground">Official</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search roadmaps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-32">
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
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredRoadmaps.length} of {roadmaps.length} roadmaps
        </p>
        {(searchTerm || statusFilter !== "all" || categoryFilter !== "all" || difficultyFilter !== "all") && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setCategoryFilter("all");
              setDifficultyFilter("all");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Roadmaps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoadmaps.map((roadmap) => (
          <RoadmapCard
            key={roadmap._id}
            roadmap={roadmap}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

      {filteredRoadmaps.length === 0 && (
        <div className="text-center py-12">
          <Route className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No roadmaps found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== "all" || categoryFilter !== "all" || difficultyFilter !== "all"
              ? "Try adjusting your filters"
              : "Create your first roadmap to get started"
            }
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Roadmap
          </Button>
        </div>
      )}
    </div>
  );
}