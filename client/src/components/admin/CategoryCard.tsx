"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";

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

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export default function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: category.color }}
            >
              {category.icon || category.name[0]}
            </div>
            <div>
              <CardTitle className="text-lg">{category.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                by {category.createdBy.username}
              </p>
            </div>
          </div>
          <Badge variant={category.isActive ? "default" : "secondary"}>
            {category.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {category.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {new Date(category.createdAt).toLocaleDateString()}
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(category)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDelete(category._id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}