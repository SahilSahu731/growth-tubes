"use client";

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useTopicStore } from '@/store/topicStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, BookOpen } from 'lucide-react';

export default function AdminTopicsPage() {
  const { token } = useAuthStore();
  const { 
    topics, 
    parentTopics, 
    loading, 
    error,
    fetchTopics, 
    fetchParentTopics, 
    createTopic,
    deleteTopic,
    clearError 
  } = useTopicStore();
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parent_topic_id: '',
    icon: '',
    color: '#3B82F6',
    is_featured: false,
    tags: [] as string[],
    seo: {
      title: '',
      keywords: [] as string[],
      meta_description: ''
    }
  });
  const [newTag, setNewTag] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    if (token) {
      fetchTopics(token);
      fetchParentTopics(token);
    }
  }, [token, fetchTopics, fetchParentTopics]);

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    await createTopic(token, formData);
    if (!error) {
      setIsCreateOpen(false);
      resetForm();
    }
  };

  const handleDeleteTopic = async (id: string) => {
    if (!token || !confirm('Are you sure you want to delete this topic?')) return;
    await deleteTopic(token, id);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      parent_topic_id: '',
      icon: '',
      color: '#3B82F6',
      is_featured: false,
      tags: [],
      seo: { title: '', keywords: [], meta_description: '' }
    });
    setNewTag('');
    setNewKeyword('');
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.seo.keywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        seo: { ...prev.seo, keywords: [...prev.seo.keywords, newKeyword.trim()] }
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      seo: { ...prev.seo, keywords: prev.seo.keywords.filter(k => k !== keyword) }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={clearError} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Topics Management</h1>
          <p className="text-gray-600">Create and manage learning topics</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Topic
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Topic</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTopic} className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <Label htmlFor="name">Topic Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter topic name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the topic..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="parent_topic">Parent Topic (Optional)</Label>
                <Select value={formData.parent_topic_id || 'none'} onValueChange={(value) => setFormData(prev => ({ ...prev, parent_topic_id: value === 'none' ? '' : value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Parent</SelectItem>
                    {parentTopics.map((topic) => (
                      <SelectItem key={topic._id} value={topic._id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="icon">Icon URL</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    placeholder="https://example.com/icon.svg"
                  />
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="is_featured">Featured Topic</Label>
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="text-blue-600 hover:text-blue-800">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <Label className="text-sm font-medium mb-2 block">SEO Settings</Label>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="seo_title" className="text-xs">SEO Title</Label>
                    <Input
                      id="seo_title"
                      value={formData.seo.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, seo: { ...prev.seo, title: e.target.value } }))}
                      placeholder="SEO optimized title"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="seo_description" className="text-xs">Meta Description</Label>
                    <Textarea
                      id="seo_description"
                      value={formData.seo.meta_description}
                      onChange={(e) => setFormData(prev => ({ ...prev, seo: { ...prev.seo, meta_description: e.target.value } }))}
                      placeholder="Meta description for search engines"
                      rows={2}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">SEO Keywords</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        placeholder="Add keyword"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                        className="text-sm"
                      />
                      <Button type="button" onClick={addKeyword} size="sm">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {formData.seo.keywords.map((keyword, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                          {keyword}
                          <button type="button" onClick={() => removeKeyword(keyword)} className="text-green-600 hover:text-green-800">
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button type="submit" className="flex-1">Create Topic</Button>
                <Button type="button" variant="outline" onClick={() => { setIsCreateOpen(false); resetForm(); }}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Card key={topic._id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {topic.icon ? (
                    <img src={topic.icon} alt="" className="w-5 h-5" />
                  ) : (
                    <div 
                      className="w-5 h-5 rounded" 
                      style={{ backgroundColor: topic.color || '#3B82F6' }}
                    />
                  )}
                  <CardTitle className="text-lg">{topic.name}</CardTitle>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteTopic(topic._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{topic.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Level:</span>
                  <span className="font-medium">{topic.level}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Resources:</span>
                  <span className="font-medium">{topic.resource_count}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Views:</span>
                  <span className="font-medium">{topic.views}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    topic.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {topic.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                {topic.is_featured && (
                  <div className="flex items-center justify-center">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      ⭐ Featured
                    </span>
                  </div>
                )}
                
                {topic.tags.length > 0 && (
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1">
                      {topic.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                      {topic.tags.length > 3 && (
                        <span className="text-xs text-gray-500">+{topic.tags.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {topics.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No topics yet</h3>
          <p className="text-gray-600 mb-4">Create your first topic to get started</p>
          <Button onClick={() => setIsCreateOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Topic
          </Button>
        </div>
      )}
    </div>
  );
}