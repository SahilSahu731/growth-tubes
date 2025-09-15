"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useCategoryStore } from "@/store/categoryStore";

interface RoadmapFormProps {
  roadmap?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function RoadmapForm({ roadmap, onSubmit, onCancel, isLoading }: RoadmapFormProps) {
  const { categories } = useCategoryStore();
  const [formData, setFormData] = useState({
    title: roadmap?.title || '',
    description: roadmap?.description || '',
    shortDescription: roadmap?.shortDescription || '',
    category: roadmap?.category?._id || '',
    difficulty: roadmap?.difficulty || 'mixed',
    estimatedDuration: roadmap?.estimatedDuration || '',
    tags: roadmap?.tags?.join(', ') || '',
    defaultView: roadmap?.defaultView || 'space',
    viewTypes: roadmap?.viewTypes || ['space'],
    targetAudience: roadmap?.targetAudience?.join(', ') || '',
    prerequisites: roadmap?.prerequisites?.join(', ') || '',
    outcomes: roadmap?.outcomes?.join(', ') || '',
    isOfficial: roadmap?.isOfficial || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const roadmapData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      targetAudience: formData.targetAudience.split(',').map(item => item.trim()).filter(Boolean),
      prerequisites: formData.prerequisites.split(',').map(item => item.trim()).filter(Boolean),
      outcomes: formData.outcomes.split(',').map(item => item.trim()).filter(Boolean),
      nodes: roadmap?.nodes || [],
      connections: roadmap?.connections || [],
    };
    onSubmit(roadmapData);
  };

  const viewTypeOptions = [
    { value: 'space', label: 'Space View' },
    { value: 'linear', label: 'Linear View' },
    { value: 'tree', label: 'Tree View' },
    { value: 'grid', label: 'Grid View' },
  ];

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{roadmap ? 'Edit Roadmap' : 'Create New Roadmap'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title">Roadmap Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Full Stack Developer Roadmap"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Brief roadmap summary"
                maxLength={200}
              />
            </div>
            
            <div>
              <Label htmlFor="estimatedDuration">Estimated Duration</Label>
              <Input
                id="estimatedDuration"
                value={formData.estimatedDuration}
                onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                placeholder="6 months"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Full Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed roadmap description"
              rows={4}
              required
            />
          </div>
          
          {/* Category & Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Difficulty Level</Label>
              <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* View Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Default View</Label>
              <Select value={formData.defaultView} onValueChange={(value) => setFormData({ ...formData, defaultView: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {viewTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Available View Types</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {viewTypeOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.value}
                      checked={formData.viewTypes.includes(option.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({ ...formData, viewTypes: [...formData.viewTypes, option.value] });
                        } else {
                          setFormData({ ...formData, viewTypes: formData.viewTypes.filter(v => v !== option.value) });
                        }
                      }}
                    />
                    <Label htmlFor={option.value} className="text-sm">{option.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="javascript, react, nodejs, backend"
              />
            </div>
            
            <div>
              <Label htmlFor="targetAudience">Target Audience (comma separated)</Label>
              <Input
                id="targetAudience"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder="Beginners, Career changers, Students"
              />
            </div>
            
            <div>
              <Label htmlFor="prerequisites">Prerequisites (comma separated)</Label>
              <Input
                id="prerequisites"
                value={formData.prerequisites}
                onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
                placeholder="Basic programming knowledge, HTML/CSS basics"
              />
            </div>
            
            <div>
              <Label htmlFor="outcomes">Learning Outcomes (comma separated)</Label>
              <Input
                id="outcomes"
                value={formData.outcomes}
                onChange={(e) => setFormData({ ...formData, outcomes: e.target.value })}
                placeholder="Build full-stack apps, Deploy to production, Master React"
              />
            </div>
          </div>
          
          {/* Settings */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isOfficial"
              checked={formData.isOfficial}
              onCheckedChange={(checked) => setFormData({ ...formData, isOfficial: !!checked })}
            />
            <Label htmlFor="isOfficial">Mark as Official Roadmap</Label>
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (roadmap ? 'Update Roadmap' : 'Create Roadmap')}
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