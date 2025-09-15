import { Metadata } from 'next';
import CategoryGrid from '@/components/user/CategoryGrid';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Explore different categories of personal development content and find topics that interest you.',
  keywords: ['categories', 'topics', 'personal development', 'learning paths'],
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Categories</h1>
        <p className="text-muted-foreground">Discover topics that interest you and start learning</p>
      </div>
      
      <CategoryGrid />
    </div>
  );
}