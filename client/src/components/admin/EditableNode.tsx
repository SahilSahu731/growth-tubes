"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Edit, Save, X, Plus, Trash2 } from "lucide-react";

interface EditableNodeProps {
  node: any;
  levelId: string;
  roadmapId: string;
  onUpdate: (nodeData: any) => void;
  onDelete: () => void;
  onAddTopic: () => void;
}

export default function EditableNode({ 
  node, 
  levelId, 
  roadmapId, 
  onUpdate, 
  onDelete, 
  onAddTopic 
}: EditableNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: node.title || '',
    description: node.description || '',
    type: node.type || 'topic',
    difficulty: node.difficulty || 'beginner',
    estimatedDuration: node.estimatedDuration || '',
    icon: node.icon || '📚',
    color: node.color || '#3B82F6',
  });

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      title: node.title || '',
      description: node.description || '',
      type: node.type || 'topic',
      difficulty: node.difficulty || 'beginner',
      estimatedDuration: node.estimatedDuration || '',
      icon: node.icon || '📚',
      color: node.color || '#3B82F6',
    });
    setIsEditing(false);
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      {isEditing ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Node title"
            />
            <Input
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="📚"
              maxLength={2}
            />
          </div>
          
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Node description"
            rows={2}
          />
          
          <div className="grid grid-cols-3 gap-3">
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="topic">Topic</SelectItem>
                <SelectItem value="skill">Skill</SelectItem>
                <SelectItem value="milestone">Milestone</SelectItem>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            
            <Input
              value={formData.estimatedDuration}
              onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
              placeholder="1 week"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{node.icon}</span>
              <h4 className="font-semibold">{node.title || 'Untitled Node'}</h4>
              <Badge variant="outline" className="text-xs">{node.type}</Badge>
              <Badge variant="outline" className="text-xs">{node.difficulty}</Badge>
            </div>
            
            <div className="flex space-x-1">
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
                <Edit className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" onClick={onAddTopic}>
                <Plus className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" onClick={onDelete} className="text-red-600">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          {node.description && (
            <p className="text-sm text-muted-foreground mb-2">{node.description}</p>
          )}
          
          <div className="space-y-1">
            {node.topics?.map((topic: any) => (
              <div key={topic.id} className="text-xs bg-white px-2 py-1 rounded border">
                {topic.title || 'Untitled Topic'}
              </div>
            ))}
            {(!node.topics || node.topics.length === 0) && (
              <p className="text-xs text-muted-foreground italic">No topics yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}