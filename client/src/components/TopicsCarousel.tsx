"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Topic {
  _id: string;
  name: string;
  slug: string;
  is_featured: boolean;
}

const TopicSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-10 bg-gray-200 rounded-full px-6 py-2 min-w-[120px]"></div>
  </div>
);

export default function TopicsCarousel() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topics`);
      setTopics(response.data.data);
    } catch (error) {
      console.error('Failed to fetch topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = (slug: string) => {
    router.push(`/learn/${slug}`);
  };

  const nextSlide = () => {
    if (topics.length > 6) {
      setCurrentIndex((prev) => Math.min(prev + 1, topics.length - 6));
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (loading) {
    return (
      <div className="w-full mb-8">
        <div className="flex items-center space-x-3 overflow-hidden">
          {[...Array(6)].map((_, index) => (
            <TopicSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (topics.length === 0) {
    return null;
  }

  return (
    <div className="w-full mb-8">
      <div className="flex items-center space-x-2">
        {topics.length > 6 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="h-8 w-8 shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        
        <div className="flex-1 overflow-hidden">
          <div 
            className="flex space-x-3 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 140}px)` }}
          >
            {topics.map((topic) => (
              <button
                key={topic._id}
                onClick={() => handleTopicClick(topic.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                  topic.is_featured
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {topic.name}
              </button>
            ))}
          </div>
        </div>
        
        {topics.length > 6 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex >= topics.length - 6}
            className="h-8 w-8 shrink-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}