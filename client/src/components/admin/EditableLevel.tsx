"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Save, X, Plus, Trash2, BookOpen } from "lucide-react";
import EditableNode from "./EditableNode";

interface EditableLevelProps {
  level: any;
  roadmapId: string;
  onUpdate: (levelData: any) => void;
  onDelete: () => void;
  onAddNode: () => void;
  onUpdateNode: (nodeId: string, nodeData: any) => void;
  onDeleteNode: (nodeId: string) => void;
  onAddTopic: (nodeId: string) => void;
}

export default function EditableLevel({ 
  level, 
  roadmapId, 
  onUpdate, 
  onDelete, 
  onAddNode,
  onUpdateNode,
  onDeleteNode,
  onAddTopic
}: EditableLevelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: level.title || '',
    description: level.description || '',
    estimatedDuration: level.estimatedDuration || '',
    color: level.color || '#3B82F6',
  });

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      title: level.title || '',
      description: level.description || '',
      estimatedDuration: level.estimatedDuration || '',
      color: level.color || '#3B82F6',
    });
    setIsEditing(false);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Level title"
                  className="text-lg font-semibold"
                />
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Level description"
                  rows={2}
                />
                <div className="flex space-x-2">
                  <Input
                    value={formData.estimatedDuration}
                    onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                    placeholder="Duration (e.g., 2 weeks)"
                    className="flex-1"
                  />
                  <Input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-16"
                  />
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold mb-1">{level.title || `Level ${level.order}`}</h3>
                <p className="text-muted-foreground mb-2">{level.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <Badge variant="outline">{level.estimatedDuration}</Badge>
                  <span className="text-muted-foreground">{level.nodes?.length || 0} nodes</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" onClick={onAddNode}>
                  <Plus className="w-4 h-4 mr-1" />
                  Node
                </Button>
                <Button size="sm" variant="outline" onClick={onDelete} className="text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {level.nodes?.map((node: any) => (
            <EditableNode
              key={node.id}
              node={node}
              levelId={level.id}
              roadmapId={roadmapId}
              onUpdate={(nodeData) => onUpdateNode(node.id, nodeData)}
              onDelete={() => onDeleteNode(node.id)}
              onAddTopic={() => onAddTopic(node.id)}
            />
          ))}
          
          {(!level.nodes || level.nodes.length === 0) && (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-muted-foreground">No nodes yet. Add your first node.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}