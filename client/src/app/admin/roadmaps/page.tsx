import { Metadata } from 'next';
import RoadmapList from '@/components/admin/RoadmapList';

export const metadata: Metadata = {
  title: 'Admin - Roadmaps',
  description: 'Manage learning roadmaps for the Growth Tube platform.',
  keywords: ['admin', 'roadmaps', 'management', 'learning paths'],
};

export default function AdminRoadmapsPage() {
  return <RoadmapList />;
}