"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BookOpen, Users, Eye, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import Image from 'next/image';

interface Topic {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  color?: string;
  is_featured: boolean;
  resource_count: number;
  level: number;
  tags: string[];
  views: number;
  parent_topic_id?: {
    _id: string;
    name: string;
  };
}

export default function TopicPage() {
  const params = useParams();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.topic) {
      fetchTopic(params.topic as string);
    }
  }, [params.topic]);

  const fetchTopic = async (slug: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topics`);
      const topics = response.data.data;
      const foundTopic = topics.find((t: Topic) => t.slug === slug);
      setTopic(foundTopic || null);
    } catch (error) {
      console.error('Failed to fetch topic:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Topic Not Found</h1>
        <p className="text-gray-600">The topic you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          {topic.icon ? (
            <p>{topic.icon}</p>
            // <Image width={100} height={100} src={topic.icon} alt="" className="w-12 h-12" />
          ) : (
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: topic.color || '#3B82F6' }}
            >
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{topic.name}</h1>
            {topic.is_featured && (
              <Badge className="mt-1 bg-yellow-100 text-yellow-800">⭐ Featured</Badge>
            )}
          </div>
        </div>
        
        {topic.description && (
          <p className="text-lg text-gray-600 mb-4">{topic.description}</p>
        )}

        {topic.parent_topic_id && (
          <p className="text-sm text-gray-500">
            Part of: <span className="font-medium">{topic.parent_topic_id.name}</span>
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{topic.resource_count}</p>
            <p className="text-sm text-gray-600">Resources</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{topic.level}</p>
            <p className="text-sm text-gray-600">Level</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">{topic.views}</p>
            <p className="text-sm text-gray-600">Views</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Tag className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">{topic.tags.length}</p>
            <p className="text-sm text-gray-600">Tags</p>
          </CardContent>
        </Card>
      </div>

      {/* Tags */}
      {topic.tags.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {topic.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Placeholder for future content */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Resources for this topic will be available soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}