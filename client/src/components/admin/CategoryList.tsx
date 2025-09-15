"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import CategoryCard from "./CategoryCard";
import CategoryForm from "./CategoryForm";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import { useAuthStore } from "@/store/authStore";
import { useCategoryStore } from "@/store/categoryStore";
import { toast } from "sonner";

interface Category {
  _id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  createdBy: {
    username: string;
  };
  createdAt: string;
}

export default function CategoryList() {
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; category: Category | null }>({ open: false, category: null });
  const { token } = useAuthStore();
  const { categories, isLoading, error, fetchCategories, createCategory, updateCategory, deleteCategory } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categories, searchTerm]);



  const handleCreate = async (data: Omit<Category, '_id' | 'createdBy' | 'createdAt' | 'isActive'>) => {
    try {
      await createCategory(data, token!);
      setShowForm(false);
      toast.success('Category created successfully!');
    } catch (error) {
      toast.error('Failed to create category');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleUpdate = async (data: Omit<Category, '_id' | 'createdBy' | 'createdAt' | 'isActive'>) => {
    if (!editingCategory) return;
    
    try {
      await updateCategory(editingCategory._id, data, token!);
      setShowForm(false);
      setEditingCategory(null);
      toast.success('Category updated successfully!');
    } catch (error) {
      toast.error('Failed to update category');
    }
  };

  const handleDelete = (category: Category) => {
    setDeleteDialog({ open: true, category });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.category) return;
    
    try {
      await deleteCategory(deleteDialog.category._id, token!);
      toast.success('Category deleted successfully!');
      setDeleteDialog({ open: false, category: null });
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  if (showForm) {
    return (
      <CategoryForm
        category={editingCategory || undefined}
        onSubmit={editingCategory ? handleUpdate : handleCreate}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">Manage your content categories</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            onEdit={handleEdit}
            onDelete={(id) => {
              const category = categories.find(c => c._id === id);
              if (category) handleDelete(category);
            }}
          />
        ))}
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading categories...</p>
        </div>
      )}

      {!isLoading && filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchTerm ? 'No categories found matching your search.' : 'No categories yet. Create your first one!'}
          </p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-600">Error: {error}</p>
          <Button onClick={fetchCategories} className="mt-4">Retry</Button>
        </div>
      )}

      <DeleteCategoryDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, category: null })}
        onConfirm={confirmDelete}
        categoryName={deleteDialog.category?.name || ''}
      />
    </div>
  );
}