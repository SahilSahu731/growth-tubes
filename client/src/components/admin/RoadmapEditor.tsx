"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Save, ArrowLeft, Trash2, FolderPlus, BookOpen } from "lucide-react";
import { useRoadmapStore } from "@/store/roadmapStore";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

interface Topic {
  id: string;
  title: string;
  description: string;
  resources: any[];
  estimatedTime: string;
}

interface Node {
  id: string;
  title: string;
  description: string;
  type: string;
  difficulty: string;
  estimatedDuration: string;
  topics: Topic[];
  position: { x: number; y: number };
  color: string;
  icon: string;
}

interface Level {
  id: string;
  title: string;
  description: string;
  order: number;
  nodes: Node[];
  estimatedDuration: string;
  color: string;
}

interface RoadmapEditorProps {
  roadmap: any;
  onSave: (data: any) => void;
  onBack: () => void;
}

export default function RoadmapEditor({ roadmap, onSave, onBack }: RoadmapEditorProps) {
  const [levels, setLevels] = useState<Level[]>(roadmap.levels || []);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [activeTab, setActiveTab] = useState("levels");
  const { addLevel: addLevelAPI, addNode: addNodeAPI, addTopic: addTopicAPI } = useRoadmapStore();
  const { token } = useAuthStore();

  const handleAddLevel = async () => {
    try {
      const levelData = {
        title: `Level ${levels.length + 1}`,
        description: "New level description",
        order: levels.length + 1,
        estimatedDuration: "2 weeks",
        color: "#3B82F6",
      };
      
      const updatedRoadmap = await addLevelAPI(roadmap._id, levelData, token!);
      setLevels(updatedRoadmap.levels);
      toast.success('Level added successfully!');
    } catch (error) {
      toast.error('Failed to add level');
    }
  };

  const handleAddNode = async (levelId: string) => {
    try {
      const nodeData = {
        title: "New Node",
        description: "Node description",
        type: "topic",
        difficulty: "beginner",
        estimatedDuration: "1 week",
        position: { x: Math.random() * 400, y: Math.random() * 300 },
        color: "#3B82F6",
        icon: "📚",
      };
      
      const updatedRoadmap = await addNodeAPI(roadmap._id, levelId, nodeData, token!);
      setLevels(updatedRoadmap.levels);
      toast.success('Node added successfully!');
    } catch (error) {
      toast.error('Failed to add node');
    }
  };

  const handleAddTopic = async (levelId: string, nodeId: string) => {
    try {
      const topicData = {
        title: "New Topic",
        description: "Topic description",
        estimatedTime: "30 minutes",
      };
      
      const updatedRoadmap = await addTopicAPI(roadmap._id, levelId, nodeId, topicData, token!);
      setLevels(updatedRoadmap.levels);
      toast.success('Topic added successfully!');
    } catch (error) {
      toast.error('Failed to add topic');
    }
  };

  const saveRoadmap = () => {
    onSave({
      ...roadmap,
      levels,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{roadmap.title}</h1>
            <p className="text-muted-foreground">Edit roadmap structure</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button onClick={saveRoadmap} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save Roadmap
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="levels">Levels</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="levels" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Roadmap Levels ({levels.length})</h3>
            <Button onClick={handleAddLevel}>
              <FolderPlus className="w-4 h-4 mr-2" />
              Add Level
            </Button>
          </div>
          
          <div className="space-y-4">
            {levels.map((level) => (
              <Card key={level.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{level.title || `Level ${level.order}`}</CardTitle>
                      <p className="text-sm text-muted-foreground">{level.nodes.length} nodes</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleAddNode(level.id)}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add Node
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {level.nodes.map((node) => (
                      <div key={node.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span>{node.icon}</span>
                            <span className="font-medium text-sm">{node.title || 'Untitled'}</span>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => handleAddTopic(level.id, node.id)}>
                            <BookOpen className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="space-y-1">
                          {node.topics.map((topic) => (
                            <div key={topic.id} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {topic.title || 'Untitled Topic'}
                            </div>
                          ))}
                          {node.topics.length === 0 && (
                            <p className="text-xs text-muted-foreground">No topics yet</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {levels.length === 0 && (
              <Card>
                <CardContent className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">No levels yet. Create your first level.</p>
                    <Button onClick={handleAddLevel}>
                      <FolderPlus className="w-4 h-4 mr-2" />
                      Add First Level
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="structure">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Visual structure editor coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

