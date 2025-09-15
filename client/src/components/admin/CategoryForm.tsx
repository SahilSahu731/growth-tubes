"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import IconPicker from "./IconPicker";

interface Category {
  _id?: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface CategoryFormProps {
  category?: Category;
  onSubmit: (data: Omit<Category, '_id'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function CategoryForm({ category, onSubmit, onCancel, isLoading }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || '',
    icon: category?.icon || '',
    color: category?.color || '#3B82F6',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{category ? 'Edit Category' : 'Create New Category'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter category name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter category description"
              rows={3}
              required
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Category Icon</Label>
              <div className="mt-2">
                <IconPicker
                  value={formData.icon}
                  onChange={(icon) => setFormData({ ...formData, icon })}
                />
              </div>
            </div>
            
            <div>
              <Label>Category Color</Label>
              <div className="mt-2">
                <div className="flex space-x-3">
                  <Input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-16 h-10 p-1 rounded-md"
                  />
                  <Input
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="#3B82F6"
                    className="flex-1"
                  />
                </div>
                <div className="flex space-x-2 mt-3">
                  {['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6B7280'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData({ ...formData, color })}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Preview */}
          <div>
            <Label>Preview</Label>
            <div className="mt-2 p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm"
                  style={{ backgroundColor: formData.color }}
                >
                  {formData.icon || '📚'}
                </div>
                <div>
                  <h3 className="font-semibold">{formData.name || 'Category Name'}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.description || 'Category description will appear here'}
                  </p>
                </div>
                <Badge>Active</Badge>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (category ? 'Update' : 'Create')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}