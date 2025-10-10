import { Metadata } from 'next';
import RoadmapGrid from '@/components/user/RoadmapGrid';

export const metadata: Metadata = {
  title: 'Roadmaps',
  description: 'Explore learning roadmaps to master any skill.',
  keywords: ['roadmaps', 'learning paths', 'skill development'],
};

export default function RoadmapsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Learning Roadmaps</h1>
        <p className="text-muted-foreground text-lg">Master any skill with structured learning paths</p>
      </div>
      
      <RoadmapGrid />
    </div>
  );
}