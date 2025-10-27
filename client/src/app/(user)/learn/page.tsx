import { Metadata } from 'next';
import TopicsCarousel from '@/components/TopicsCarousel';

export const metadata: Metadata = {
  title: 'Learn',
  description: 'Access comprehensive learning materials, courses, and resources for your personal development journey.',
  keywords: ['learning', 'courses', 'education', 'tutorials', 'skill development'],
};

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learn & Grow</h1>
        <p className="text-gray-600">Discover topics and start your learning journey</p>
      </div>
      
      <TopicsCarousel />
    </div>
  );
}