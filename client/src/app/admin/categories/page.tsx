import { Metadata } from 'next';
import CategoryList from '@/components/admin/CategoryList';

export const metadata: Metadata = {
  title: 'Admin - Categories',
  description: 'Manage categories for the Growth Tube platform.',
  keywords: ['admin', 'categories', 'management'],
};

export default function AdminCategoriesPage() {
  return <CategoryList />;
}