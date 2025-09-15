"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  BookOpen
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import CourseCard from "./CourseCard";
import CreateCourseCard from "./CreateCourseCard";
import CourseForm from "./CourseForm";
import DeleteCourseDialog from "./DeleteCourseDialog";
import { useCourseStore } from "@/store/courseStore";
import { useCategoryStore } from "@/store/categoryStore";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export default function CourseList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; course: any }>({ open: false, course: null });
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { courses, isLoading, fetchCourses, createCourse, deleteCourse, toggleCourseStatus } = useCourseStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { token } = useAuthStore();

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || course.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || course.category?._id === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest": return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "title": return (a.title || '').localeCompare(b.title || '');
        case "enrollments": return (b.enrollmentCount || 0) - (a.enrollmentCount || 0);
        default: return 0;
      }
    });

  const handleDelete = (course: any) => {
    setDeleteDialog({ open: true, course });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.course) return;
    
    try {
      await deleteCourse(deleteDialog.course._id, token!);
      toast.success('Course deleted successfully!');
      setDeleteDialog({ open: false, course: null });
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  const handleToggleStatus = async (id: string, status: string) => {
    try {
      await toggleCourseStatus(id, status, token!);
      toast.success(`Course ${status === 'published' ? 'published' : 'unpublished'} successfully!`);
    } catch (error) {
      toast.error('Failed to update course status');
    }
  };

  const handleCreateCourse = async (data: any) => {
    try {
      console.log('Submitting course data:', data);
      console.log('Using token:', token);
      await createCourse(data, token!);
      setShowCreateForm(false);
      toast.success('Course created successfully!');
    } catch (error: any) {
      console.error('Course creation failed:', error);
      toast.error(error.response?.data?.message || 'Failed to create course');
    }
  };

  const stats = {
    total: courses.length,
    published: courses.filter(c => c.status === 'published').length,
    draft: courses.filter(c => c.status === 'draft').length,
    archived: courses.filter(c => c.status === 'archived').length,
  };

  if (showCreateForm) {
    return (
      <CourseForm
        onSubmit={handleCreateCourse}
        onCancel={() => setShowCreateForm(false)}
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
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground">Manage your course content</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total Courses</div>
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
          <div className="text-2xl font-bold text-gray-600">{stats.archived}</div>
          <div className="text-sm text-muted-foreground">Archived</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
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

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="enrollments">Enrollments</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCourses.length} of {courses.length} courses
        </p>
        {(searchTerm || statusFilter !== "all" || categoryFilter !== "all") && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setCategoryFilter("all");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Courses Grid */}
      <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
        {/* Create Course Card - Only show in grid view and when there are courses */}
        {viewMode === "grid" && courses.length > 0 && (
          <CreateCourseCard onClick={() => setShowCreateForm(true)} />
        )}
        
        {filteredCourses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            onEdit={() => {}}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No courses found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
              ? "Try adjusting your filters"
              : "Create your first course to get started"
            }
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Course
          </Button>
        </div>
      )}

      <DeleteCourseDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, course: null })}
        onConfirm={confirmDelete}
        courseName={deleteDialog.course?.title || ''}
      />
    </div>
  );
}